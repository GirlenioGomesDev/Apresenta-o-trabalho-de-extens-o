import test from 'node:test';
import assert from 'node:assert/strict';
import {openQuizDatabase} from '../server/quiz-local-db.mjs';
import {handleQuizRequest} from '../server/quiz-service.mjs';
import {questions} from '../server/quiz-questions.mjs';
function setup(t){
 const DB=openQuizDatabase();t.after(()=>DB.close());
 async function call(path,payload,credential,origin){const response=await handleQuizRequest(new Request('https://fabrica-software-grupo04-leno-2026.lenozika01.chatgpt.site/api/quiz'+path,{method:payload?'POST':'GET',headers:{...(payload?{'Content-Type':'application/json'}:{}),...(credential?{Authorization:'Bearer '+credential}:{}),...(origin?{Origin:origin}:{})},body:payload?JSON.stringify(payload):undefined}),{DB});return {status:response.status,headers:response.headers,data:await response.json()};}
 async function create(names=['Ana','Bia']){const h=(await call('/rooms',{duration:150})).data;const players=[];for(let i=0;i<names.length;i++){const token=(i+1).toString(16).padStart(64,'0'),p=await call('/rooms/'+h.code+'/join',{name:names[i],clientKey:token});assert.equal(p.status,200);players.push({token,...p.data.me});}return {host:h.hostToken,code:h.code,players};}
 return {DB,call,create};
}
test('o banco contém dez perguntas de quatro alternativas, uma correta e explicação',()=>{
 assert.equal(questions.length,10);for(const q of questions){assert.equal(q.options.length,4);assert.ok(q.options[q.correct]);assert.ok(q.explanation.length>30);}
});
test('alunos entram uma vez, recuperam a sessão e não controlam a sala',async t=>{
 const {call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 const retry=await call(path+'/join',{name:'Outro nome',clientKey:r.players[0].token});assert.equal(retry.data.me.name,'Ana');assert.equal(retry.data.playerCount,2);
 assert.equal((await call(path+'/control',{action:'start'},r.players[0].token)).status,403);
 assert.equal((await call(path+'/join',{name:'ana',clientKey:'a'.repeat(64)})).status,409);
 const guest=await call(path+'/state');assert.equal(guest.data.role,'guest');assert.ok(!guest.data.hostToken);assert.ok(!guest.data.players);
});
test('perguntas ativas não revelam gabarito e a primeira resposta fica bloqueada',async t=>{
 const {call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 const opened=await call(path+'/control',{action:'start'},r.host);assert.equal(opened.data.phase,'question');assert.ok(!('correct' in opened.data.question));assert.ok(!('explanation' in opened.data.question));
 const wrong=(questions[0].correct+1)%4;
 const first=await call(path+'/answer',{questionIndex:0,option:wrong},r.players[0].token);assert.equal(first.data.myAnswer,wrong);assert.equal(first.data.phase,'question');assert.ok(!first.data.leaderboard);
 const again=await call(path+'/answer',{questionIndex:0,option:questions[0].correct},r.players[0].token);assert.equal(again.data.myAnswer,wrong);assert.equal(again.data.answeredCount,1);
 const answered=await call(path+'/answer',{questionIndex:0,option:questions[0].correct},r.players[1].token);assert.equal(answered.data.phase,'question');assert.equal(answered.data.answeredCount,2);assert.ok(!('correct' in answered.data.question));assert.ok(!answered.data.leaderboard);
 const closed=await call(path+'/control',{action:'reveal',questionIndex:0},r.host);assert.equal(closed.data.phase,'results');assert.equal(closed.data.leaderboard.find(p=>p.name==='Ana').score,0);assert.equal(closed.data.leaderboard.find(p=>p.name==='Bia').score,100);
});
test('dez rodadas atualizam o placar do apresentador e terminam com pontuação correta',async t=>{
 const {call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 await call(path+'/control',{action:'start'},r.host);
 for(let i=0;i<10;i++){
  assert.equal((await call(path+'/answer',{questionIndex:i,option:questions[i].correct},r.players[0].token)).status,200);
  await call(path+'/answer',{questionIndex:i,option:(questions[i].correct+1)%4},r.players[1].token);
  const waiting=(await call(path+'/state',null,r.host)).data;assert.equal(waiting.phase,'question');assert.ok(!('correct' in waiting.question));
  const host=(await call(path+'/control',{action:'reveal',questionIndex:i},r.host)).data;assert.equal(host.phase,'results');assert.equal(host.question.number,i+1);assert.equal(host.answeredCount,2);assert.equal(host.leaderboard[0].score,(i+1)*100);assert.equal(host.distribution.reduce((a,b)=>a+b,0),2);
  const next=await call(path+'/control',{action:'next',questionIndex:i},r.host);assert.equal(next.data.phase,i===9?'finished':'question');
 }
 const final=(await call(path+'/state',null,r.players[0].token)).data;assert.equal(final.phase,'finished');assert.equal(final.leaderboard[0].score,1000);assert.equal(final.leaderboard[0].correct,10);assert.equal(final.leaderboard[1].score,0);
});
test('tempo esgotado fecha respostas; empates dividem a posição',async t=>{
 const {DB,call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 await call(path+'/control',{action:'start'},r.host);DB.sqlite.prepare('UPDATE quiz_rooms SET deadline = 0 WHERE code = ?').run(r.code);
 assert.equal((await call(path+'/answer',{questionIndex:0,option:0},r.players[0].token)).status,409);
 const waiting=(await call(path+'/state',null,r.host)).data;assert.equal(waiting.phase,'question');assert.equal(waiting.answeringClosed,true);assert.ok(!('correct' in waiting.question));assert.ok(!waiting.leaderboard);
 assert.equal((await call(path+'/control',{action:'next',questionIndex:0},r.host)).status,409);
 const result=(await call(path+'/control',{action:'reveal',questionIndex:0},r.host)).data;assert.equal(result.phase,'results');assert.equal(result.answeredCount,0);assert.deepEqual(result.leaderboard.map(p=>p.rank),[1,1]);
});
test('requisições simultâneas não duplicam respostas nem pulam perguntas',async t=>{
 const {call,create}=setup(t),r=await create(['A1','A2','A3','A4','A5','A6','A7','A8']),path='/rooms/'+r.code;
 await call(path+'/control',{action:'start'},r.host);
 const answers=await Promise.all(r.players.flatMap(p=>[call(path+'/answer',{questionIndex:0,option:0},p.token),call(path+'/answer',{questionIndex:0,option:0},p.token)]));
 assert.ok(answers.every(a=>a.status===200));const result=(await call(path+'/state',null,r.host)).data;assert.equal(result.answeredCount,8);assert.equal(result.phase,'question');assert.ok(!result.leaderboard);
 const revealed=(await call(path+'/control',{action:'reveal',questionIndex:0},r.host)).data;assert.ok(revealed.leaderboard.every(p=>p.score===100));
 await Promise.all([call(path+'/control',{action:'next',questionIndex:0},r.host),call(path+'/control',{action:'next',questionIndex:0},r.host)]);
 assert.equal((await call(path+'/state',null,r.host)).data.questionIndex,1);
});
test('origens externas, entradas inválidas e salas expiradas são tratadas',async t=>{
 const {DB,call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 const cors=await call('/health',null,null,'https://girleniogomesdev.github.io');assert.equal(cors.headers.get('Access-Control-Allow-Origin'),'https://girleniogomesdev.github.io');
 assert.equal((await call('/health',null,null,'https://outro.example')).status,403);
 assert.equal((await call(path+'/join',{name:'X',clientKey:'b'.repeat(64)})).status,400);
 assert.equal((await call(path+'/answer',{questionIndex:0,option:9},r.players[0].token)).status,400);
 DB.sqlite.prepare('UPDATE quiz_rooms SET expires_at = 0 WHERE code = ?').run(r.code);
 assert.equal((await call(path+'/state',null,r.host)).status,410);
 await call('/rooms',{duration:30});assert.equal(DB.sqlite.prepare('SELECT code FROM quiz_rooms WHERE code = ?').get(r.code),undefined);
});

test('a sala permite de dois a três minutos e usa dois e meio como padrão',async t=>{
 const {call}=setup(t);
 for(const duration of [120,150,180])assert.equal((await call('/rooms',{duration})).data.duration,duration);
 for(const duration of [30,45,60,0,181,'180'])assert.equal((await call('/rooms',{duration})).data.duration,150);
});
test('só o apresentador revela mesmo quando todos já responderam',async t=>{
 const {call,create}=setup(t),r=await create(),path='/rooms/'+r.code;
 await call(path+'/control',{action:'start'},r.host);
 for(const p of r.players)await call(path+'/answer',{questionIndex:0,option:0},p.token);
 for(const token of [r.host,...r.players.map(p=>p.token)]){
  const s=(await call(path+'/state',null,token)).data;
  assert.equal(s.phase,'question');assert.ok(!('correct' in s.question));assert.ok(!('explanation' in s.question));assert.ok(!s.leaderboard);
 }
 assert.equal((await call(path+'/control',{action:'reveal',questionIndex:0},r.players[0].token)).status,403);
 const reveal=(await call(path+'/control',{action:'reveal',questionIndex:0},r.host)).data;
 assert.equal(reveal.question.correct,questions[0].correct);assert.equal(reveal.question.explanation,questions[0].explanation);
 const player=(await call(path+'/state',null,r.players[1].token)).data;
 assert.equal(player.phase,'results');assert.equal(player.myAnswer,0);assert.equal(player.question.correct,questions[0].correct);
});
