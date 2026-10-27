/* Regras apenas das novas demonstrações. Os laboratórios anteriores são preservados. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.WorkshopExtensionLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function makePackets(message){
    const symbols=Array.from(String(message)).slice(0,24);
    if(!symbols.length)return [];
    const size=Math.ceil(symbols.length/3),packets=[];
    for(let i=0;i<symbols.length;i+=size)packets.push({id:packets.length+1,text:symbols.slice(i,i+size).join('')});
    return packets;
  }
  function assemblePackets(packets,expected){
    if(!Number.isInteger(expected)||expected<1||packets.length!==expected)return null;
    const sorted=packets.slice().sort((a,b)=>a.id-b.id);
    if(!sorted.every((packet,index)=>packet.id===index+1&&typeof packet.text==='string'))return null;
    return sorted.map(packet=>packet.text).join('');
  }
  function packetRoute(mode){return mode==='none'?null:mode==='alternate'?'Caminho B':'Caminho A';}
  function groupedChapters(course){
    return course.chapters.map(chapter=>{
      const scenes=course.scenes.filter(scene=>scene.chapter===chapter.id);
      return {...chapter,scenes,minutes:scenes.reduce((sum,scene)=>sum+scene.minutes,0),start:scenes[0]?.id||'inicio'};
    });
  }
  function salaryRange(sample){
    if(!Number.isFinite(sample.low)||!Number.isFinite(sample.high)||sample.low<0||sample.high<sample.low)throw new Error('Faixa salarial inválida.');
    return sample.low.toLocaleString('pt-BR')+'–'+sample.high.toLocaleString('pt-BR');
  }
  const demoAddresses={'escola.test':'192.0.2.10','biblioteca.test':'192.0.2.20','jogo.test':'192.0.2.30'};
  function lookupExample(name){return Object.prototype.hasOwnProperty.call(demoAddresses,name)?demoAddresses[name]:null;}
  return {makePackets,assemblePackets,packetRoute,groupedChapters,salaryRange,lookupExample};
});
