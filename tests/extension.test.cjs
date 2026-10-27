const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const logic=require('../assets/extension-logic.js');
const root=path.resolve(__dirname,'..'),context={window:{}};
for(const file of ['content.js','course-data.js','extension-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),context);
const course=context.window.WorkshopCourse,data=context.window.WorkshopExtension,html=fs.readFileSync(path.join(root,'index.html'),'utf8');

test('a navegação reúne cyber em Carreiras 03 e mantém os seis capítulos',()=>{
  const chapters=logic.groupedChapters(course);
  assert.deepEqual(Array.from(chapters,chapter=>chapter.number),['00','01','02','03','04','05']);
  assert.equal(chapters.reduce((sum,chapter)=>sum+chapter.minutes,0),140);
  assert.deepEqual(Array.from(chapters,chapter=>chapter.minutes),[7,13,52,54,13,1]);
  const careers=chapters.find(chapter=>chapter.id==='carreiras');
  assert.equal(careers.number,'03');assert.ok(careers.scenes.some(scene=>scene.id==='lab-cyber'));
  assert.ok(careers.scenes.some(scene=>scene.id==='detetive'));
  assert.ok(course.scenes.filter(scene=>scene.module==='cyber').every(scene=>scene.chapter==='carreiras'));
  assert.doesNotMatch(html,/data-chapter(?:-link)?="seguranca"/);
  assert.match(html,/data-chapter-link="carreiras"><span class="rail-number">03<\/span>/);
});

test('a cronologia dos novos assuntos antecede a Web e todos os laboratórios anteriores',()=>{
  const sequence=['internet-pacotes','internet-protocolos','internet-dns','origem-web','linguagens'];
  for(let i=1;i<sequence.length;i++)assert.ok(course.scenes.findIndex(scene=>scene.id===sequence[i-1])<course.scenes.findIndex(scene=>scene.id===sequence[i]));
  assert.deepEqual(Array.from(data.history,item=>item.id),sequence.slice(0,-1));
  for(const item of data.history.slice(0,3)){
    assert.ok(item.people.length);assert.ok(item.before);assert.ok(item.after);
    for(const source of item.sources)assert.ok(source.url.startsWith('https://'));
  }
  assert.match(data.history[2].milestone,/nomes já existiam/i);
});

test('pacotes numerados reconstroem texto e Unicode mesmo chegando em outra ordem',()=>{
  for(const message of ['OLÁ, TURMA!','INTERNET','🙂é🚀','a','ab','texto com espaços']){
    const packets=logic.makePackets(message);
    assert.ok(packets.length>=1&&packets.length<=3);
    assert.equal(logic.assemblePackets(packets.slice().reverse(),packets.length),message);
    assert.equal(logic.assemblePackets(packets.slice(0,-1),packets.length),null);
  }
  const limited=logic.makePackets('x'.repeat(40));assert.equal(logic.assemblePackets(limited,limited.length),'x'.repeat(24));
  assert.deepEqual(logic.makePackets(''),[]);assert.equal(logic.assemblePackets([],0),null);
});

test('mensagem incompleta, número duplicado ou ausência de caminho não produz uma falsa entrega',()=>{
  assert.equal(logic.assemblePackets([{id:1,text:'a'},{id:1,text:'b'}],2),null);
  assert.equal(logic.assemblePackets([{id:2,text:'a'}],1),null);
  assert.equal(logic.packetRoute('normal'),'Caminho A');assert.equal(logic.packetRoute('alternate'),'Caminho B');assert.equal(logic.packetRoute('none'),null);
});

test('nomes fictícios retornam somente os endereços de documentação conhecidos',()=>{
  assert.equal(logic.lookupExample('escola.test'),'192.0.2.10');assert.equal(logic.lookupExample('biblioteca.test'),'192.0.2.20');assert.equal(logic.lookupExample('jogo.test'),'192.0.2.30');
  for(const name of ['desconhecido.test','toString','constructor','<script>'])assert.equal(logic.lookupExample(name),null);
});

test('as quatro áreas têm exemplo concreto e faixa vinculada a cargo júnior e fonte',()=>{
  assert.deepEqual(Object.keys(data.careers),['software','infra','dados','cyber']);
  for(const [area,career] of Object.entries(data.careers)){
    assert.equal(career.example.length,3);assert.equal(career.skills.length,3);
    assert.match(html,new RegExp('data-career-context="'+area+'"'));
    for(const sample of career.salaries){assert.match(sample.job,/Júnior/);assert.ok(sample.source.startsWith('https://www.roberthalf.com/'));assert.ok(sample.high>=sample.low);}
  }
  assert.match(data.careers.dados.salaryContext,/não representa todos os cargos/);
  assert.equal(logic.salaryRange({low:6050,high:8750}),'6.050–8.750');
  assert.throws(()=>logic.salaryRange({low:9000,high:100}));assert.throws(()=>logic.salaryRange({low:-1,high:100}));
});

test('os conceitos web adicionais abrem os laboratórios que já existiam',()=>{
  const software=html.match(/<section\b[^>]*id="por-tras-do-clique"[\s\S]*?<\/section>/)[0];
  assert.match(software,/Front-end[\s\S]*Back-end[\s\S]*career-web-foundations[\s\S]*HTML[\s\S]*CSS[\s\S]*JavaScript/);
  for(const id of ['lab-html','lab-css-layout','laboratorio'])assert.ok(software.includes('href="#'+id+'"'));
});
