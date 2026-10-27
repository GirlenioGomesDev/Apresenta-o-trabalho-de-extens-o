(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.WorkshopQuizQR=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function joinURL(base,code){if(!/^[A-HJ-NP-Z2-9]{6}$/.test(code))throw new Error('Código inválido.');const url=new URL(base);if(!['https:','http:'].includes(url.protocol))throw new Error('Endereço inválido.');url.search='';url.hash='';url.searchParams.set('sala',code);return url.href;}
 function svg(url,library){const code=library.QrCode.encodeText(url,library.QrCode.Ecc.MEDIUM),border=4,size=code.size+border*2,parts=[];for(let y=0;y<code.size;y++)for(let x=0;x<code.size;x++)if(code.getModule(x,y))parts.push('M'+(x+border)+','+(y+border)+'h1v1h-1z');return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+size+' '+size+'" width="320" height="320" role="img" aria-label="QR Code para entrar na sala" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="'+parts.join(' ')+'" fill="#10261c"/></svg>';}
 return {joinURL,svg};
});
