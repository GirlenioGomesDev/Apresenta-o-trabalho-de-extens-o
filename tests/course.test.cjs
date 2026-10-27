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

test('os sete blocos somam 120 min e cada assunto ocupa uma sequência contínua',()=>{
  assert.equal(course.modules.length,7);assert.equal(course.scenes.length,26);
  assert.deepEqual(sections.map(match=>match[1]),Array.from(course.scenes,scene=>scene.id));
  assert.equal(course.scenes.reduce((sum,scene)=>sum+scene.minutes,0),120);
  const seen=new Set();let current;
  for(const scene of course.scenes){
    if(scene.module!==current){assert.ok(!seen.has(scene.module),'Bloco retomado fora de ordem: '+scene.module);seen.add(scene.module);current=scene.module;}
    assert.ok(data.notes[scene.id]?.text.length>50);assert.ok(scene.minutes>0);
  }
  assert.deepEqual(Array.from(seen),Array.from(course.modules,module=>module.id));
  for(const total of logic.totals(course))assert.equal(total.minutes,course.modules.find(module=>module.id===total.id).minutes);
});

test('carreiras reúne as quatro áreas sem os antigos laboratórios',()=>{
 const careers=sections.find(match=>match[1]==='carreiras')[0];
 for(const area of ['software','infra','dados','cyber'])assert.ok(careers.includes('data-clean-career="'+area+'"'));
 assert.doesNotMatch(careers,/<(?:textarea|pre|code)\b|data-course-lab=/);
 for(const id of ['lab-infra','lab-dados','lab-cyber','fabrica','missao-final'])assert.ok(!course.scenes.some(scene=>scene.id===id));
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

