/* Contratos de saída dos experimentos progressivos. Sem dependência de DOM. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.CourseLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const finite=(n,min=0,max=100000)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
  const text=value=>typeof value==='string'&&value.length<=350;
  function validate(view,value){
    if(!value||typeof value!=='object') throw new Error('Envie um objeto para mostrar({ ... }).');
    if(view==='tests'){
      if(!Array.isArray(value.testes)||!value.testes.length||value.testes.length>20||!value.testes.every(t=>text(t.nome)&&typeof t.passou==='boolean'&&(text(t.obtido)||finite(t.obtido,-10000))&&(text(t.esperado)||finite(t.esperado,-10000)))) throw new Error('Envie testes com nome, esperado, obtido e passou.');
      if(!(text(value.restante)||finite(value.restante,-10000))) throw new Error('O resultado restante deve ser texto ou número.');
      return value;
    }
    if(view==='network'){
      if(!['rede','dns','http','lento','pronto'].includes(value.etapa)||!text(value.mensagem)) throw new Error('Envie etapa (rede, dns, http, lento ou pronto) e mensagem.');
      return value;
    }
    if(view==='analysis'){
      if(!Array.isArray(value.valores)||value.valores.length!==3||!value.valores.every(n=>finite(n))) throw new Error('valores deve conter três números não negativos.');
      if(!finite(value.media)||!finite(value.mediana)||!Number.isInteger(value.validos)||!finite(value.validos,1,1000)||!Number.isInteger(value.descartados)||!finite(value.descartados,0,1000)) throw new Error('Confira média, mediana e contagens; a análise precisa de pelo menos um registro válido.');
      return value;
    }
    if(view==='access'){
      if(!Array.isArray(value.acessos)||!value.acessos.length||value.acessos.length>20||!value.acessos.every(a=>text(a.nome)&&typeof a.permitido==='boolean'&&typeof a.esperado==='boolean')) throw new Error('Envie acessos com nome, permitido e esperado.');
      return value;
    }
    throw new Error('Visualização desconhecida.');
  }
  function moduleStart(scenes,id){return scenes.find(scene=>scene.module===id)?.id||scenes[0]?.id||'inicio';}
  function totals(course){return course.modules.map(module=>({id:module.id,minutes:course.scenes.filter(scene=>scene.module===module.id).reduce((sum,scene)=>sum+scene.minutes,0)}));}
  return {validate,moduleStart,totals};
});
