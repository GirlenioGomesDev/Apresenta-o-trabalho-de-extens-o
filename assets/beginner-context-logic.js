/* Recorte da Enigma I: I–II–III, refletor B, anéis AAA, sem cabos no painel. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.BeginnerContextLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rotors=['EKMFLGDQVZNTOWYHXUSPAIBRCJ','AJDKSIRUXBLHWTMCQGZNPYFVOE','BDFHJLCPRTXVZNYEIWGAKMUSQO'];
  const reflector='YRUHQSLDPXNGOKMIEBFZCWVJAT';
  const mod=n=>(n+26)%26;
  function enigma(text,start='AAA'){
    if(typeof text!=='string'||text.length>80||!/^[A-Z]*$/.test(text))throw new TypeError('Use até 80 letras de A a Z.');
    if(typeof start!=='string'||!/^[A-Z]{3}$/.test(start))throw new TypeError('A posição inicial usa três letras.');
    const positions=Array.from(start,c=>alphabet.indexOf(c)),steps=[];
    let output='';
    for(const input of text){
      const middleNotch=positions[1]===4,rightNotch=positions[2]===21;
      if(middleNotch)positions[0]=mod(positions[0]+1);
      if(middleNotch||rightNotch)positions[1]=mod(positions[1]+1);
      positions[2]=mod(positions[2]+1);
      let n=alphabet.indexOf(input);
      for(let i=2;i>=0;i--)n=mod(alphabet.indexOf(rotors[i][mod(n+positions[i])])-positions[i]);
      n=alphabet.indexOf(reflector[n]);
      for(let i=0;i<3;i++)n=mod(rotors[i].indexOf(alphabet[mod(n+positions[i])])-positions[i]);
      const letter=alphabet[n];output+=letter;
      steps.push({input,output:letter,position:positions.map(p=>alphabet[p]).join('')});
    }
    return {output,position:positions.map(p=>alphabet[p]).join(''),steps};
  }
  return {enigma};
});
