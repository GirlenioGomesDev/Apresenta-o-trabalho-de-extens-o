const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const engine=require('../assets/lab-engine.js');
const logic=require('../assets/course-logic.js');
const root=path.resolve(__dirname,'..'),context={window:{}};
for(const file of ['content.js','course-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),context);
const course=context.window.WorkshopCourse,data=context.window.WorkshopData,html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sections=Array.from(html.matchAll(/<section class="scene[^>]*id="([^"]+)"[\s\S]*?<\/section>/g));
const plain=value=>JSON.parse(JSON.stringify(value));
function execute(code,input){
  const messages=[],sandbox={self:{postMessage:message=>messages.push(message)}};
  vm.runInNewContext('('+engine.workerMain.toString()+')()',sandbox);
  sandbox.self.onmessage({data:{code,input}});
  assert.equal(messages[0].ok,true,messages[0].error);
  return plain(messages[0].output);
}
function scriptValue(code,expression){return plain(vm.runInNewContext(code+'\n'+expression,{console:{log(){}}}));}

test('os dez blocos somam 140 min e cada assunto ocupa uma sequência contínua',()=>{
  assert.equal(course.modules.length,10);assert.equal(course.scenes.length,53);
  assert.deepEqual(sections.map(match=>match[1]),Array.from(course.scenes,scene=>scene.id));
  assert.equal(course.scenes.reduce((sum,scene)=>sum+scene.minutes,0),140);
  const seen=new Set();let current;
  for(const scene of course.scenes){
    if(scene.module!==current){assert.ok(!seen.has(scene.module),'Bloco retomado fora de ordem: '+scene.module);seen.add(scene.module);current=scene.module;}
    assert.ok(data.notes[scene.id]?.text.length>50);assert.ok(scene.minutes>0);
  }
  assert.deepEqual(Array.from(seen),Array.from(course.modules,module=>module.id));
  for(const total of logic.totals(course))assert.equal(total.minutes,course.modules.find(module=>module.id===total.id).minutes);
});

test('infraestrutura, dados e cibersegurança têm atividades visuais e nenhum editor de código',()=>{
  for(const match of sections){
    const module=course.scenes.find(scene=>scene.id===match[1]).module;
    if(['infra','dados','cyber'].includes(module))assert.doesNotMatch(match[0],/data-(?:live|course)-lab=|<(?:textarea|pre|code)\b/,'Código visível em '+match[1]);
  }
  for(const id of ['lab-infra','lab-dados','lab-cyber'])assert.match(sections.find(match=>match[1]===id)[0],/POR QUE EXISTE\?[\s\S]*O QUE FAZ NO DIA A DIA\?[\s\S]*UMA ENTREGA CONCRETA/);
  assert.match(html,/id="infra-cabo"/);assert.match(html,/id="quiz-question-picker"/);
  assert.equal(Object.keys(course.experiments).length,7);
});

test('seis laboratórios web mostram código da aula com recursos de apoio identificados',()=>{
  const lessons=Object.entries(course.experiments).filter(([,lesson])=>lesson.type==='web');assert.equal(lessons.length,6);
  for(const [id,lesson] of lessons){
    assert.match(html,new RegExp('data-course-lab="'+id+'"'));assert.ok(lesson.options[lesson.correct]);assert.ok(lesson.hints.length>=2);assert.equal(lesson.steps.length,3);assert.ok(lesson.supportNote.length>50);
    for(const files of [lesson.files,{...lesson.files,...lesson.solution}]){
      assert.doesNotThrow(()=>new vm.Script((files.js||'')+'\n'+(lesson.support.js||'')));
      assert.doesNotMatch(files.html,/<script[^>]+src="https?:/i);
    }
  }
  assert.equal(course.experiments['lab-html'].files.html.split('\n').length,8);
  assert.equal(course.experiments['lab-css-layout'].files.css.split('\n').length,5);
});

test('o programa do robô distingue uma ordem inválida da sequência que coleta a estrela',()=>{
  let robot={position:0,collected:false};robot=logic.programStep(robot,'pegar');assert.equal(robot.collected,false);assert.match(robot.message,/antes de chegar/);
  for(const command of ['andar','andar','andar','pegar'])robot=logic.programStep(robot,command);
  assert.equal(robot.position,3);assert.equal(robot.collected,true);robot=logic.programStep(robot,'andar');assert.equal(robot.position,3);
});

test('a função do robô usa o ganho editável e respeita o limite de energia',()=>{
  assert.deepEqual(scriptValue(data.example.js,'[darEnergia(), darEnergia()]'),[10,20]);
  assert.deepEqual(scriptValue(data.example.js.replace('ganho = 10','ganho = 50'),'[darEnergia(),darEnergia(),darEnergia()]'),[50,100,100]);
});

test('a busca compara cada título e a solução trata diferenças de maiúsculas',()=>{
  const lesson=course.experiments['lab-js-feed'];assert.deepEqual(scriptValue(lesson.files.js,'buscar("java")'),[]);assert.deepEqual(scriptValue(lesson.files.js,'buscar("Java")'),['JavaScript: interação']);
  for(const term of ['java','Java','JAVA'])assert.deepEqual(scriptValue(lesson.solution.js,'buscar('+JSON.stringify(term)+')'),['JavaScript: interação']);
  assert.equal(scriptValue(lesson.solution.js,'buscar("")').length,3);
});

test('o limite aceita uma soma exata, recusa excesso sem alterar o total e muda com a edição',()=>{
  const lesson=course.experiments['lab-js-carrinho'];
  assert.deepEqual(scriptValue(lesson.files.js,'[adicionar(30),adicionar(40),adicionar(20),adicionar(20),total]'),[true,true,true,false,90]);
  assert.deepEqual(scriptValue(lesson.solution.js,'[adicionar(30),adicionar(40),adicionar(20),adicionar(20),total]'),[true,true,true,true,110]);
});

test('os testes de estoque expõem falhas antes da solução e verificam os limites depois',()=>{
  const lesson=course.experiments['lab-software-testes'];assert.equal(execute(lesson.code,lesson.input).testes.filter(row=>row.passou).length,2);assert.equal(execute(lesson.solution.code,lesson.input).testes.filter(row=>row.passou).length,5);
  for(const pedido of [-1,0,1.5,4])assert.equal(execute(lesson.solution.code,{pedido}).restante,'recusado');assert.equal(execute(lesson.solution.code,{pedido:3}).restante,0);
  assert.doesNotThrow(()=>logic.validate('tests',execute(lesson.code,lesson.input)));assert.throws(()=>logic.validate('tests',{testes:[],restante:0}));
});

test('o mapa do cabo distingue oito ligações esperadas, interrupção e vias trocadas',()=>{
  assert.deepEqual(logic.wireMap('inteiro'),{destinations:[1,2,3,4,5,6,7,8],valid:true});
  const open=logic.wireMap('rompido');assert.equal(open.valid,false);assert.equal(open.destinations[4],null);assert.equal(open.destinations.filter(Boolean).length,7);
  const swapped=logic.wireMap('trocado');assert.equal(swapped.valid,false);assert.deepEqual(swapped.destinations.slice(0,2),[2,1]);
});

test('o diagnóstico visual começa pela primeira falha disponível e diferencia respostas HTTP',()=>{
  const base={connected:true,dns:true,http:200};assert.equal(logic.networkStatus(base).stage,'pronto');assert.equal(logic.networkStatus({...base,http:404}).stage,'http');assert.match(logic.networkStatus({...base,http:404}).evidence,/404/);assert.match(logic.networkStatus({...base,http:503}).evidence,/503/);
  assert.equal(logic.networkStatus({...base,dns:false,http:503}).stage,'dns');assert.equal(logic.networkStatus({...base,connected:false,dns:false,http:503}).stage,'rede');
});

test('a análise diferencia zero, vazio e valor fora do contexto, sem inventar medidas para amostra vazia',()=>{
  const records=[{topic:'Web',minutes:12},{topic:'Web',minutes:18},{topic:'Jogos',minutes:20},{topic:'Jogos',minutes:22},{topic:'Robótica',minutes:25},{topic:'Robótica',minutes:29}];
  const base=logic.summarizeRecords(records);assert.equal(base.mean,21);assert.equal(base.median,21);assert.deepEqual(base.totals,[30,42,54]);
  const zero=logic.summarizeRecords([{topic:'Web',minutes:0},{topic:'Web',minutes:null}]);assert.equal(zero.valid,1);assert.equal(zero.excluded,1);assert.equal(zero.mean,0);
  const noisy=records.concat({topic:'Jogos',minutes:null},{topic:'Web',minutes:300});const before=logic.summarizeRecords(noisy);assert.ok(before.mean>60);assert.equal(before.median,22);assert.equal(before.excluded,1);
  const after=logic.summarizeRecords(noisy,120);assert.equal(after.mean,21);assert.equal(after.median,21);assert.equal(after.excluded,2);
  const empty=logic.summarizeRecords([]);assert.equal(empty.mean,null);assert.equal(empty.median,null);assert.equal(empty.valid,0);
});

test('a matriz visual expõe a falta de conferência do dono e distingue identidade de autorização',()=>{
  const broken=logic.accessDecisions({role:'editor',confirmed:true,checkOwner:false});assert.equal(broken.filter(row=>row.allowed!==row.expected).length,2);
  for(const role of ['editor','leitor'])for(const confirmed of [false,true]){const fixed=logic.accessDecisions({role,confirmed,checkOwner:true});assert.ok(fixed.every(row=>row.allowed===row.expected));assert.equal(fixed.filter(row=>row.allowed).length,confirmed?(role==='editor'?2:1):0);}
  assert.ok(logic.accessDecisions({role:'desconhecido',confirmed:true,checkOwner:true}).every(row=>!row.allowed));
});

test('as histórias, os casos e a demonstração de cabo têm fontes; a revisão mantém doze perguntas',()=>{
  for(const key of ['web','css','hopper','radia','katherine','ariane','gitlab','wannacry','cable'])assert.ok(html.includes(course.sources[key].url));
  for(const id of ['origem-web','css-historia','grace-hopper','radia-perlman','katherine-johnson','caso-ariane','caso-gitlab','caso-wannacry'])assert.ok(course.scenes.some(scene=>scene.id===id));
  assert.equal(data.quiz.length,12);for(const review of ['logica-passos','logica-decisoes','infra-cabo'])assert.ok(data.quiz.some(question=>question.review===review));
});
