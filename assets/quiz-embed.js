(function(){
 'use strict';
 const frame=document.querySelector('#quiz-competition-frame');
 function show(){if(document.querySelector('#quiz').hidden)return;if(!frame.getAttribute('src'))frame.src=frame.dataset.quizSrc;}
 window.addEventListener('workshop-scene-change',show);
 window.addEventListener('message',event=>{if(event.source!==frame.contentWindow||event.origin!==location.origin||event.data?.kind!=='workshop-quiz-size')return;const height=Number(event.data.height);if(Number.isFinite(height))frame.style.height=Math.max(500,Math.min(2600,height+12))+'px';});
 show();
})();
