import {questions} from './quiz-questions.mjs';

const LIFETIME=24*60*60*1000,MAX_PLAYERS=200;
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const presentation='https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/';
const productionOrigin='https://fabrica-software-grupo04-leno-2026.lenozika01.chatgpt.site';
class QuizError extends Error{constructor(message,status=400){super(message);this.status=status;}}
function randomCode(){const bytes=crypto.getRandomValues(new Uint8Array(6));return Array.from(bytes,b=>alphabet[b%alphabet.length]).join('');}
function secret(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');}
async function hash(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');}
function cleanCode(value){const code=String(value||'').toUpperCase().replace(/\s/g,'');if(!/^[A-HJ-NP-Z2-9]{6}$/.test(code))throw new QuizError('Confira o código de seis caracteres da sala.');return code;}
function token(request){const value=(request.headers.get('Authorization')||'').replace(/^Bearer /i,'');return /^[a-f0-9]{64}$/.test(value)?value:'';}
function publicQuestion(index,reveal=false){const q=questions[index];if(!q)return null;return {index,number:index+1,topic:q.topic,question:q.question,options:q.options,...(reveal?{correct:q.correct,explanation:q.explanation}:{})};}
function cors(request){
  const origin=request.headers.get('Origin'),url=new URL(request.url);
  const allowed=origin===new URL(presentation).origin||origin===productionOrigin||origin===url.origin;
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
  if(allowed){headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Headers']='Content-Type, Authorization';headers['Access-Control-Allow-Methods']='GET, POST, OPTIONS';headers['Access-Control-Max-Age']='600';}
  return {headers,allowed:!origin||allowed};
}
async function body(request){
  if(Number(request.headers.get('Content-Length')||0)>2048)throw new QuizError('Pedido muito grande.',413);
  const text=await request.text();if(text.length>2048)throw new QuizError('Pedido muito grande.',413);
  try{const value=JSON.parse(text||'{}');if(!value||Array.isArray(value)||typeof value!=='object')throw Error();return value;}catch{throw new QuizError('O pedido não pôde ser lido. Tente novamente.');}
}
async function room(db,code){const found=await db.prepare('SELECT * FROM quiz_rooms WHERE code = ?').bind(code).first();if(!found)throw new QuizError('Sala não encontrada. Confira o código.',404);if(found.expires_at<=Date.now())throw new QuizError('Essa sala expirou. Peça uma nova sala ao apresentador.',410);return found;}
async function identity(db,r,credential){
  if(!credential)return {role:'guest'};
  const digest=await hash(credential);
  if(digest===r.host_hash)return {role:'host'};
  const player=await db.prepare('SELECT id, name FROM quiz_players WHERE room_code = ? AND token_hash = ?').bind(r.code,digest).first();
  if(!player)throw new QuizError('Sua entrada não foi reconhecida. Entre novamente na sala.',401);
  return {role:'player',...player};
}
async function settle(db,r){
  if(r.phase!=='question')return r;
  const counts=await db.prepare('SELECT (SELECT COUNT(*) FROM quiz_players WHERE room_code = ?) AS players, (SELECT COUNT(*) FROM quiz_answers WHERE room_code = ? AND question_index = ?) AS answered').bind(r.code,r.code,r.question_index).first();
  if(Date.now()>=r.deadline||(counts.players>0&&counts.answered>=counts.players)){
    await db.prepare("UPDATE quiz_rooms SET phase = 'results', version = version + 1 WHERE code = ? AND phase = 'question' AND question_index = ?").bind(r.code,r.question_index).run();
    return room(db,r.code);
  }
  return r;
}
async function rankings(db,r){
  const revealed=r.phase==='question'?r.question_index-1:r.question_index;
  const {results}=await db.prepare('SELECT p.id, p.name, COALESCE(SUM(CASE WHEN a.question_index <= ? THEN a.points ELSE 0 END),0) AS score, COALESCE(SUM(CASE WHEN a.question_index <= ? AND a.points > 0 THEN 1 ELSE 0 END),0) AS correct FROM quiz_players p LEFT JOIN quiz_answers a ON a.player_id = p.id AND a.room_code = p.room_code WHERE p.room_code = ? GROUP BY p.id, p.name ORDER BY score DESC, p.joined_at ASC, p.id ASC').bind(revealed,revealed,r.code).all();
  let last=-1,lastRank=0;return results.map((p,index)=>{if(p.score!==last){last=p.score;lastRank=index+1;}return {...p,rank:lastRank};});
}
async function state(db,r,who){
  r=await settle(db,r);
  const counts=await db.prepare('SELECT (SELECT COUNT(*) FROM quiz_players WHERE room_code = ?) AS players, (SELECT COUNT(*) FROM quiz_answers WHERE room_code = ? AND question_index = ?) AS answered').bind(r.code,r.code,r.question_index).first();
  const result={code:r.code,phase:r.phase,version:r.version,serverTime:Date.now(),expiresAt:r.expires_at,deadline:r.deadline,duration:r.duration,total:questions.length,playerCount:counts.players,answeredCount:counts.answered,role:who.role,questionIndex:r.question_index};
  if(who.role==='guest')return result;
  if(r.question_index>=0)result.question=publicQuestion(r.question_index,r.phase==='results'||r.phase==='finished');
  if(who.role==='player'){
    result.me={id:who.id,name:who.name};
    const answer=await db.prepare('SELECT choice FROM quiz_answers WHERE room_code = ? AND player_id = ? AND question_index = ?').bind(r.code,who.id,r.question_index).first();
    result.myAnswer=answer?answer.choice:null;
  }
  if(r.phase==='lobby'&&who.role==='host')result.players=(await db.prepare('SELECT id, name FROM quiz_players WHERE room_code = ? ORDER BY joined_at, id').bind(r.code).all()).results;
  if(r.phase==='results'||r.phase==='finished'){
    result.leaderboard=await rankings(db,r);
    const rows=(await db.prepare('SELECT choice, COUNT(*) AS total FROM quiz_answers WHERE room_code = ? AND question_index = ? GROUP BY choice').bind(r.code,r.question_index).all()).results;
    result.distribution=Array.from({length:4},(_,i)=>rows.find(row=>row.choice===i)?.total||0);
  }
  return result;
}
async function create(db,input){
  const duration=[30,45,60].includes(input.duration)?input.duration:45;
  await db.prepare('DELETE FROM quiz_rooms WHERE expires_at < ?').bind(Date.now()).run();
  const active=await db.prepare('SELECT COUNT(*) AS total FROM quiz_rooms').first();if(active.total>=200)throw new QuizError('Há muitas salas ativas. Tente mais tarde.',429);
  const hostToken=secret(),digest=await hash(hostToken),now=Date.now();
  for(let attempt=0;attempt<6;attempt++){
    const code=randomCode();
    try{await db.prepare("INSERT INTO quiz_rooms (code, host_hash, phase, question_index, duration, deadline, created_at, expires_at, version) VALUES (?, ?, 'lobby', -1, ?, 0, ?, ?, 0)").bind(code,digest,duration,now,now+LIFETIME).run();return {...await state(db,await room(db,code),{role:'host'}),hostToken};}
    catch(error){if(!String(error.message).includes('UNIQUE'))throw error;}
  }
  throw new QuizError('Não foi possível criar uma sala agora. Tente novamente.',503);
}
async function join(db,r,input){
  const clientKey=String(input.clientKey||'');if(!/^[a-f0-9]{64}$/.test(clientKey))throw new QuizError('Atualize a página para preparar sua entrada.');
  const digest=await hash(clientKey);
  let player=await db.prepare('SELECT id, name FROM quiz_players WHERE room_code = ? AND token_hash = ?').bind(r.code,digest).first();
  if(player)return state(db,r,{role:'player',...player});
  if(r.phase!=='lobby')throw new QuizError('A competição já começou. Entre na próxima sala.',409);
  const name=String(input.name||'').normalize('NFKC').replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim();
  if(Array.from(name).length<2||Array.from(name).length>20)throw new QuizError('Use um apelido de 2 a 20 caracteres.');
  const count=await db.prepare('SELECT COUNT(*) AS total FROM quiz_players WHERE room_code = ?').bind(r.code).first();if(count.total>=MAX_PLAYERS)throw new QuizError('A sala atingiu o limite de participantes.',409);
  const id=crypto.randomUUID();
  try{
    const result=await db.prepare("INSERT INTO quiz_players (id, room_code, name, name_key, token_hash, joined_at) SELECT ?, code, ?, ?, ?, ? FROM quiz_rooms WHERE code = ? AND phase = 'lobby' AND (SELECT COUNT(*) FROM quiz_players WHERE room_code = ?) < ?").bind(id,name,name.toLocaleLowerCase('pt-BR'),digest,Date.now(),r.code,r.code,MAX_PLAYERS).run();
    if(!result.meta.changes)throw new QuizError('A sala começou ou atingiu o limite. Confira com o apresentador.',409);
  }catch(error){if(String(error.message).includes('UNIQUE'))throw new QuizError('Esse apelido já está na sala. Escolha outro.',409);throw error;}
  await db.prepare('UPDATE quiz_rooms SET version = version + 1 WHERE code = ?').bind(r.code).run();
  return state(db,await room(db,r.code),{role:'player',id,name});
}
async function control(db,r,who,input){
  if(who.role!=='host')throw new QuizError('Só o apresentador pode controlar a rodada.',403);
  if(input.action==='start'){
    const count=await db.prepare('SELECT COUNT(*) AS total FROM quiz_players WHERE room_code = ?').bind(r.code).first();if(!count.total)throw new QuizError('Espere pelo menos um participante entrar.',409);
    await db.prepare("UPDATE quiz_rooms SET phase = 'question', question_index = 0, deadline = ?, version = version + 1 WHERE code = ? AND phase = 'lobby'").bind(Date.now()+r.duration*1000,r.code).run();
  }else{
    if(input.questionIndex!==r.question_index)throw new QuizError('A rodada mudou. Aguarde a atualização.',409);
    if(input.action==='reveal')await db.prepare("UPDATE quiz_rooms SET phase = 'results', version = version + 1 WHERE code = ? AND phase = 'question' AND question_index = ?").bind(r.code,r.question_index).run();
    else if(input.action==='next'){
      if(r.phase!=='results')throw new QuizError('Mostre o resultado antes de avançar.',409);
      if(r.question_index===questions.length-1)await db.prepare("UPDATE quiz_rooms SET phase = 'finished', version = version + 1 WHERE code = ? AND phase = 'results' AND question_index = ?").bind(r.code,r.question_index).run();
      else await db.prepare("UPDATE quiz_rooms SET phase = 'question', question_index = question_index + 1, deadline = ?, version = version + 1 WHERE code = ? AND phase = 'results' AND question_index = ?").bind(Date.now()+r.duration*1000,r.code,r.question_index).run();
    }else throw new QuizError('Ação desconhecida.');
  }
  return state(db,await room(db,r.code),who);
}
async function answer(db,r,who,input){
  if(who.role!=='player')throw new QuizError('Entre na sala antes de responder.',403);
  if(!Number.isInteger(input.option)||input.option<0||input.option>3)throw new QuizError('Escolha uma das quatro alternativas.');
  if(input.questionIndex!==r.question_index)throw new QuizError('Essa pergunta já terminou.',409);
  const previous=await db.prepare('SELECT choice FROM quiz_answers WHERE room_code = ? AND player_id = ? AND question_index = ?').bind(r.code,who.id,r.question_index).first();
  if(!previous){
    const now=Date.now(),points=input.option===questions[r.question_index]?.correct?100:0;
    const result=await db.prepare("INSERT OR IGNORE INTO quiz_answers (room_code, player_id, question_index, choice, points, answered_at) SELECT code, ?, question_index, ?, ?, ? FROM quiz_rooms WHERE code = ? AND phase = 'question' AND question_index = ? AND deadline > ?").bind(who.id,input.option,points,now,r.code,input.questionIndex,now).run();
    if(!result.meta.changes){const saved=await db.prepare('SELECT choice FROM quiz_answers WHERE room_code = ? AND player_id = ? AND question_index = ?').bind(r.code,who.id,input.questionIndex).first();if(!saved)throw new QuizError('O tempo acabou ou o apresentador fechou a pergunta.',409);}
    await db.prepare('UPDATE quiz_rooms SET version = version + 1 WHERE code = ?').bind(r.code).run();
  }
  return state(db,await room(db,r.code),who);
}

export async function handleQuizRequest(request,env){
  const policy=cors(request),respond=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:policy.headers});
  if(!policy.allowed)return respond({error:'Origem não autorizada.'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:policy.headers});
  try{
    if(!env.DB)throw new QuizError('A sala está indisponível. Tente novamente em instantes.',503);
    const path=new URL(request.url).pathname.replace(/^\/api\/quiz/,'').replace(/\/$/,'');
    if(path==='/health'&&request.method==='GET'){await env.DB.prepare('SELECT 1 AS ok').first();return respond({ok:true,version:'2.4.0'});}
    if(path==='/rooms'&&request.method==='POST')return respond(await create(env.DB,await body(request)),201);
    const match=path.match(/^\/rooms\/([^/]+)\/(state|join|control|answer)$/);if(!match)throw new QuizError('Caminho não encontrado.',404);
    const code=cleanCode(decodeURIComponent(match[1])),action=match[2];let r=await room(env.DB,code);
    if(action==='join'&&request.method==='POST')return respond(await join(env.DB,r,await body(request)));
    const who=await identity(env.DB,r,token(request));
    if(action==='state'&&request.method==='GET')return respond(await state(env.DB,r,who));
    if(request.method!=='POST')throw new QuizError('Método não permitido.',405);
    r=await settle(env.DB,r);const input=await body(request);
    if(action==='control')return respond(await control(env.DB,r,who,input));
    if(action==='answer')return respond(await answer(env.DB,r,who,input));
    throw new QuizError('Caminho não encontrado.',404);
  }catch(error){if(!(error instanceof QuizError))console.error('Quiz:',error.message);return respond({error:error instanceof QuizError?error.message:'Não foi possível concluir. Tente novamente.'},error.status||500);}
}
