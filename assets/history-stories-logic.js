/* Modelos didáticos locais. Não reproduzem Enigma, Bombe ou protocolos reais. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.WorkshopHistoryLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const readings={H1:'ACA',H2:'BCA',H3:'CCB',H4:'BAC',H5:'ABC',H6:'BAB'},expected='BAC';
  const hypotheses=Object.keys(readings);
  function remainingHypotheses(count){
    if(!Number.isInteger(count)||count<0||count>expected.length)throw new RangeError('Quantidade de pistas inválida.');
    return hypotheses.filter(key=>readings[key].slice(0,count)===expected.slice(0,count));
  }
  function hypothesisReadings(){return Object.entries(readings).map(([name,text])=>({name,text}));}
  function tapeStep(state){
    if(!state||!Array.isArray(state.cells)||!state.cells.length||!state.cells.every(bit=>bit===0||bit===1)||!Number.isInteger(state.head)||state.head<0||state.head>state.cells.length)throw new TypeError('Fita inválida.');
    const next={cells:state.cells.slice(),head:state.head};
    if(next.head===next.cells.length)return next;
    next.cells[next.head]=1-next.cells[next.head];next.head++;
    return next;
  }
  return {remainingHypotheses,hypothesisReadings,tapeStep};
});
