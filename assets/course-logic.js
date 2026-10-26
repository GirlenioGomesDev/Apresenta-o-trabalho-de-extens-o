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
  function networkStatus(input){
    if(!input.connected)return {stage:'rede',evidence:'O dispositivo não alcança a rede. Comece pela conexão.'};
    if(!input.dns)return {stage:'dns',evidence:'A conexão está disponível, mas o nome não encontra um endereço neste cenário.'};
    if(input.http===404)return {stage:'http',evidence:'O serviço respondeu 404: o recurso pedido não foi encontrado.'};
    if(input.http!==200)return {stage:'http',evidence:'O serviço respondeu 503: está indisponível neste cenário.'};
    return {stage:'pronto',evidence:'O caminho representado está disponível e o pedido foi atendido.'};
  }
  function wireMap(scenario){
    const destinations=[1,2,3,4,5,6,7,8];
    if(scenario==='rompido')destinations[4]=null;
    if(scenario==='trocado'){destinations[0]=2;destinations[1]=1;}
    return {destinations,valid:destinations.every((destination,index)=>destination===index+1)};
  }
  function programStep(state,command){
    const next={position:state.position,collected:state.collected,message:''};
    if(command==='andar'){
      next.position=Math.min(3,state.position+1);
      next.message=state.position===3?'Chegamos ao fim do caminho. Agora falta pegar a estrela.':'O robô andou uma casa. Posição atual: '+next.position+'.';
    }else if(command==='pegar'){
      next.collected=state.position===3||state.collected;
      next.message=next.collected?'Estrela coletada! A ordem das instruções realizou a tarefa.':'O robô tentou pegar a estrela antes de chegar. A ordem precisa ser revista.';
    }
    return next;
  }
  function summarizeRecords(records,maxMinutes=Infinity){
    const isValid=record=>typeof record.minutes==='number'&&Number.isFinite(record.minutes)&&record.minutes>=0&&record.minutes<=maxMinutes;
    const valid=records.filter(isValid),values=valid.map(record=>record.minutes).sort((a,b)=>a-b);
    const totals=['Web','Jogos','Robótica'].map(topic=>valid.filter(record=>record.topic===topic).reduce((sum,record)=>sum+record.minutes,0));
    const middle=Math.floor(values.length/2);
    const median=!values.length?null:values.length%2?values[middle]:(values[middle-1]+values[middle])/2;
    const mean=values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
    return {valid:valid.length,excluded:records.length-valid.length,totals,mean,median,included:records.map(isValid)};
  }
  function accessDecisions(input){
    return [
      {name:'Ler meu arquivo',own:true,action:'ler'},
      {name:'Editar meu arquivo',own:true,action:'editar'},
      {name:'Ler arquivo de outra pessoa',own:false,action:'ler'},
      {name:'Editar arquivo de outra pessoa',own:false,action:'editar'}
    ].map(row=>{
      const actionAllowed=['editor','leitor'].includes(input.role)&&(row.action==='ler'||input.role==='editor');
      return {...row,allowed:Boolean(input.confirmed&&actionAllowed&&(!input.checkOwner||row.own)),expected:Boolean(input.confirmed&&row.own&&actionAllowed)};
    });
  }
  return {validate,moduleStart,totals,networkStatus,wireMap,programStep,summarizeRecords,accessDecisions};
});
