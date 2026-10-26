const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const engine=require('../assets/lab-engine.js');
const logic=require('../assets/course-logic.js');
const root=path.resolve(__dirname,'..'),context={window:{}};
for(const file of ['content.js','course-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),context);
const course=context.window.WorkshopCourse,html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function execute(code,input){
  const results=[],sandbox={self:{postMessage:result=>results.push(result)}};
  vm.runInNewContext('('+engine.workerMain.toString()+')()',sandbox);
  sandbox.self.onmessage({data:{code,input}});
  assert.equal(results[0].ok,true,results[0].error);
  return JSON.parse(JSON.stringify(results[0].output));
}
test('o roteiro tem mais de duas horas com nove módulos coerentes e 46 etapas',()=>{
  assert.equal(course.modules.length,9);assert.equal(course.scenes.length,46);
  const minutes=course.scenes.reduce((sum,scene)=>sum+scene.minutes,0);
  assert.equal(minutes,130);assert.ok(minutes>=120);
  const totals=logic.totals(course);
  for(const module of course.modules)assert.equal(totals.find(item=>item.id===module.id).minutes,module.minutes);
  for(const scene of course.scenes){
    assert.ok(context.window.WorkshopData.notes[scene.id]);
    assert.match(html,new RegExp('id="'+scene.id+'"'));
    assert.ok(scene.minutes>0);
  }
});
test('há dez práticas novas com previsão, desafio, dicas e solução; scripts web são válidos',()=>{
  assert.equal(Object.keys(course.experiments).length,10);
  assert.equal(Object.values(course.experiments).filter(item=>item.type==='web').length,6);
  for(const [id,lesson] of Object.entries(course.experiments)){
    assert.match(html,new RegExp('data-course-lab="'+id+'"'));
    assert.ok(lesson.options[lesson.correct]);assert.ok(lesson.feedback.length>50);
    assert.ok(lesson.challenge.length>50);assert.equal(lesson.steps.length,3);
    assert.ok(lesson.hints.length>=2);assert.ok(lesson.solution);
    if(lesson.type==='web'){
      assert.doesNotThrow(()=>new vm.Script(lesson.files.js));
      if(lesson.solution.js)assert.doesNotThrow(()=>new vm.Script(lesson.solution.js));
      assert.doesNotMatch(lesson.files.html,/<script[^>]+src="https?:/i);
    }
  }
});
test('a função de estoque mostra falhas reais antes da correção e passa nos limites depois',()=>{
  const lesson=course.experiments['lab-software-testes'];
  const original=execute(lesson.code,lesson.input);
  assert.equal(original.testes.filter(t=>t.passou).length,2);
  const solved=execute(lesson.solution.code,{pedido:5});
  assert.equal(solved.testes.filter(t=>t.passou).length,5);assert.equal(solved.restante,'recusado');
  for(const pedido of [-1,0,1.5,4])assert.equal(execute(lesson.solution.code,{pedido}).restante,'recusado');
  assert.equal(execute(lesson.solution.code,{pedido:3}).restante,0);
});
test('o diagnóstico combina sinais e a nova regra respeita as falhas anteriores',()=>{
  const lesson=course.experiments['lab-infra-missao'];
  const base={rede:true,dns:true,http:200,latencia:120};
  const cases=[{patch:{rede:false},etapa:'rede'},{patch:{dns:false},etapa:'dns'},{patch:{http:404},etapa:'http'},{patch:{http:503},etapa:'http'},{patch:{latencia:500},etapa:'pronto'},{patch:{latencia:501},etapa:'lento'},{patch:{rede:false,latencia:900},etapa:'rede'}];
  for(const item of cases)assert.equal(execute(lesson.solution.code,{...base,...item.patch}).etapa,item.etapa);
  assert.equal(execute(lesson.code,{...base,latencia:900}).etapa,'pronto');
});
test('limpeza, agrupamento, média e mediana respondem aos registros editados',()=>{
  const lesson=course.experiments['lab-dados-coleta'];
  const base=execute(lesson.code,{incompleto:false,atipico:false});
  assert.deepEqual(base,{valores:[30,42,54],media:21,mediana:21,validos:6,descartados:0});
  const missing=execute(lesson.code,{incompleto:true,atipico:false});
  assert.equal(missing.descartados,1);assert.equal(missing.media,21);
  const extreme=execute(lesson.code,{incompleto:false,atipico:true});
  assert.ok(extreme.media>60);assert.equal(extreme.mediana,22);assert.deepEqual(extreme.valores,[330,42,54]);
  const solved=execute(lesson.solution.code,{incompleto:true,atipico:true});
  assert.equal(solved.media,21);assert.equal(solved.mediana,21);assert.equal(solved.descartados,2);
});
test('autorização corrigida verifica sessão, dono e ação, preservando a política',()=>{
  const lesson=course.experiments['lab-cyber-regras'];
  assert.ok(execute(lesson.code,lesson.input).acessos.some(row=>row.permitido!==row.esperado));
  for(const papel of ['editor','leitor'])for(const mfa of [false,true]){
    const result=execute(lesson.solution.code,{id:1,papel,mfa});
    assert.ok(result.acessos.every(row=>row.permitido===row.esperado));
    assert.equal(result.acessos.filter(row=>row.permitido).length,mfa?(papel==='editor'?2:1):0);
  }
});
test('contratos do executor rejeitam resultados incompatíveis com os cenários',()=>{
  for(const lesson of Object.values(course.experiments).filter(item=>item.type==='function'))assert.doesNotThrow(()=>logic.validate(lesson.view,execute(lesson.code,lesson.input)));
  assert.throws(()=>logic.validate('analysis',{valores:[1,2,3],media:NaN,mediana:1,validos:0,descartados:0}));
  assert.throws(()=>logic.validate('access',{acessos:[{nome:'X',permitido:'true',esperado:true}]}));
  assert.throws(()=>logic.validate('network',{etapa:'qualquer',mensagem:'X'}));
});
test('pessoas e casos têm atribuições específicas e fontes primárias publicadas',()=>{
  for(const key of ['web','css','hopper','radia','katherine','ariane','gitlab','wannacry']){
    const source=course.sources[key];assert.ok(source.url.startsWith('https://'));assert.ok(html.includes(source.url));
  }
  for(const id of ['origem-web','css-historia','grace-hopper','radia-perlman','katherine-johnson','caso-ariane','caso-gitlab','caso-wannacry'])assert.ok(course.scenes.some(scene=>scene.id===id));
  assert.equal(context.window.WorkshopData.quiz.length,12);
});
