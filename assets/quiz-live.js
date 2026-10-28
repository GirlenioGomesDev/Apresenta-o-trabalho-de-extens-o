(function(){
 'use strict';
 const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const params=new URLSearchParams(location.search),hostMode=params.get('modo')==='host',embedded=params.get('embutido')==='1';
 const local=['localhost','127.0.0.1','terminal.local'].includes(location.hostname);
 const api=(local?location.origin:'https://fabrica-software-grupo04-leno-2026.lenozika01.chatgpt.site')+'/api/quiz';
 const joinPage='https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/competicao.html';
 const memory={};
 function get(key){try{return localStorage.getItem(key);}catch{return memory[key]||null;}}
 function put(key,value){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value);}catch{if(value===null)delete memory[key];else memory[key]=value;}}
 function randomKey(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');}
 function parse(value){try{return JSON.parse(value);}catch{return null;}}
 let session=parse(get(hostMode?'quiz-host-current':'quiz-player-current')),current=null,pollTimer=0,busy=false,inFlight=false,lastRender='',clockOffset=0,draftQuestion='',draftOption=null;
 const requestedCode=(params.get('sala')||'').toUpperCase().replace(/\s/g,'');
 if(!hostMode&&requestedCode&&session?.code!==requestedCode)session=null;
 if(embedded)document.body.classList.add('quiz-embedded');
 function error(message){$('#quiz-error').hidden=!message;$('#quiz-error').textContent=message||'';resize();}
 function network(message){$('#quiz-network').hidden=!message;$('#quiz-network').textContent=message||'';document.querySelectorAll('.quiz-online').forEach(el=>{el.innerHTML=message?'<i></i>Reconectando':'<i></i>Conectado';});}
 function saveSession(){put(hostMode?'quiz-host-current':'quiz-player-current',session?JSON.stringify(session):null);}
 async function request(path,method='GET',payload=null,credential=session?.token){
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),10000);
   try{
     const response=await fetch(api+path,{method,credentials:'omit',cache:'no-store',headers:{...(payload?{'Content-Type':'application/json'}:{}),...(credential?{Authorization:'Bearer '+credential}:{})},body:payload?JSON.stringify(payload):undefined,signal:controller.signal});
     const data=await response.json();if(!response.ok){const e=new Error(data.error||'Não foi possível continuar.');e.status=response.status;throw e;}return data;
   }catch(e){if(e.name==='AbortError'||e instanceof TypeError)throw new Error('A conexão oscilou. Confira a internet e tente novamente.');throw e;}finally{clearTimeout(timeout);}
 }
 function resize(){if(embedded&&window.parent!==window)requestAnimationFrame(()=>parent.postMessage({kind:'workshop-quiz-size',height:Math.ceil(document.body.getBoundingClientRect().height)},location.origin));}
 function layout(html){$('#quiz-app').innerHTML=html;resize();}
 const letter=i=>String.fromCharCode(65+i);
 const isClosed=s=>s.answeringClosed||Date.now()+clockOffset>=s.deadline;
 function intro(){
   clearTimeout(pollTimer);current=null;lastRender='';draftQuestion='';draftOption=null;
   if(hostMode){
     layout('<section class="quiz-welcome"><div><span class="quiz-kicker">COMPETIÇÃO / 10 PERGUNTAS</span><h1>Agora, quem conecta<br>essas ideias?</h1><p>Crie a sala, projete o QR e convide a turma. Você revela a resposta e o placar quando estiver pronto.</p><div class="quiz-rule-pills"><span>100 pontos por acerto</span><span>Empates dividem a posição</span><span>Sem aplicativo</span></div></div><form id="quiz-create" class="quiz-entry-card"><span class="quiz-kicker">PAINEL DO APRESENTADOR</span><h2>Vamos começar?</h2><label>Tempo para cada pergunta<select id="quiz-duration"><option value="120">2 minutos</option><option value="150" selected>2 minutos e 30 segundos</option><option value="180">3 minutos</option></select></label><button class="quiz-button primary" type="submit">Criar sala e mostrar QR →</button><p>Ao acabar o tempo, novas respostas são bloqueadas. Só o botão Revelar resposta mostra a alternativa correta e a explicação.</p></form></section>');
     $('#quiz-create').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;busy=true;const b=e.submitter||e.target.querySelector('button[type="submit"]');b.disabled=true;error('');try{const value=await request('/rooms','POST',{duration:Number($('#quiz-duration').value)},'');session={code:value.code,token:value.hostToken};saveSession();accept(value);schedule();}catch(e){error(e.message);b.disabled=false;}finally{busy=false;}});
   }else{
     const roomField=requestedCode?'<p class="quiz-fixed-room">Sala <b>'+esc(requestedCode)+'</b> · definida pelo QR. Digite apenas seu nome.</p>':'<label>Código da sala<input id="quiz-room-code" name="sala" minlength="6" maxlength="6" autocapitalize="characters" autocomplete="off" spellcheck="false" required placeholder="ABC234"></label>';
     layout('<section class="quiz-player-entry"><span class="quiz-kicker">FÁBRICA DE SOFTWARE / QUIZ DA TURMA</span><h1>Sua próxima<br>descoberta começa aqui.</h1><p>'+(requestedCode?'O QR já escolheu a sala. Informe seu nome para participar.':'Informe o código mostrado pelo apresentador e seu nome.')+'</p><form id="quiz-join" class="quiz-entry-card">'+roomField+'<label>Seu nome<input id="quiz-nickname" name="apelido" minlength="2" maxlength="20" autocomplete="nickname" required placeholder="Como quer aparecer no ranking?"></label><button class="quiz-button primary" type="submit">Entrar na competição →</button><p>10 perguntas · 100 pontos por acerto. Escolha uma alternativa e toque em Confirmar resposta para enviá-la.</p></form><a class="quiz-quiet-link" href="competicao.html?modo=host">Sou o apresentador ↗</a></section>');
     $('#quiz-join').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;busy=true;const button=e.submitter||e.target.querySelector('button[type="submit"]');button.disabled=true;error('');const code=requestedCode||$('#quiz-room-code').value.toUpperCase().replace(/\s/g,'');let key=get('quiz-player-key-'+code);if(!key){key=randomKey();put('quiz-player-key-'+code,key);}try{const value=await request('/rooms/'+encodeURIComponent(code)+'/join','POST',{name:$('#quiz-nickname').value,clientKey:key},'');session={code,token:key,name:value.me.name};saveSession();accept(value);schedule();}catch(e){error(e.message);button.disabled=false;}finally{busy=false;}});
   }
 }
 function roomHeader(s){return '<div class="quiz-room-header"><span class="quiz-kicker">'+(hostMode?'APRESENTADOR':'OLÁ, '+esc(s.me?.name||session.name||'PARTICIPANTE'))+' / SALA <b>'+esc(s.code)+'</b></span><span class="quiz-online"><i></i>Conectado</span></div>';}
 function renderLobby(s){
   if(hostMode){
     const url=window.WorkshopQuizQR.joinURL(joinPage,s.code);
     layout(roomHeader(s)+'<section class="quiz-lobby"><div class="quiz-lobby-copy"><span class="quiz-kicker">ABRA A CÂMERA E APONTE PARA O QR</span><h1>Todo mundo<br>pronto para jogar?</h1><p>Android e iPhone: toque no link que aparecer e digite seu nome. A sala já vem definida pelo QR.</p><div class="quiz-room-code">'+esc(s.code)+'</div><div class="quiz-join-link"><a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(url.replace('https://',''))+'</a><button id="quiz-copy" aria-label="Copiar link da sala">Copiar link</button></div><p class="quiz-small">Cada aluno escolhe e confirma sua própria resposta. O apresentador decide quando revelar o resultado.</p></div><div class="quiz-qr-card">'+window.WorkshopQuizQR.svg(url,qrcodegen)+'<span>ESCANEIE PARA ENTRAR</span></div></section><section class="quiz-lobby-footer"><div><h2><strong>'+s.playerCount+'</strong> participante'+(s.playerCount===1?'':'s')+' na sala</h2><div class="quiz-player-list">'+(s.players||[]).map(p=>'<span>'+esc(p.name)+'</span>').join('')+(s.playerCount?'':'<p>Os nomes aparecem aqui assim que a turma entrar.</p>')+'</div></div><button id="quiz-start" class="quiz-button primary" '+(!s.playerCount?'disabled':'')+'>Começar a primeira pergunta →</button></section>');
     $('#quiz-start').addEventListener('click',()=>control('start'));
     $('#quiz-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(url);$('#quiz-copy').textContent='Link copiado ✓';}catch{$('#quiz-copy').textContent='Use o endereço ao lado';}});
   }else layout(roomHeader(s)+'<section class="quiz-waiting"><span class="quiz-waiting-icon" aria-hidden="true">✦</span><span class="quiz-kicker">VOCÊ ESTÁ NA SALA</span><h1>Boa, '+esc(s.me.name)+'!</h1><p>O apresentador vai liberar a primeira pergunta. Deixe esta tela aberta.</p><div class="quiz-rule-pills"><span>10 perguntas</span><span>100 pontos por acerto</span><span>'+s.playerCount+' participante'+(s.playerCount===1?'':'s')+'</span></div></section>');
 }
 function options(s,result=false){return '<div class="quiz-options" role="group" aria-label="Alternativas da pergunta">'+s.question.options.map((text,i)=>{
   const selected=s.myAnswer===i||(!hostMode&&!result&&s.myAnswer===null&&draftOption===i),correct=result&&s.question.correct===i;
   const incorrect=result&&selected&&!correct;
   const classes='quiz-answer option-'+i+(selected?' selected':'')+(correct?' correct':'')+(incorrect?' incorrect':'');
   const disabled=hostMode||result||s.myAnswer!==null||busy||isClosed(s);
   return '<button type="button" data-quiz-answer="'+i+'" class="'+classes+'" '+(disabled?'disabled':'')+' aria-pressed="'+selected+'"><span class="quiz-answer-letter">'+letter(i)+'</span><b>'+esc(text)+'</b>'+(result?'<small>'+s.distribution[i]+' resposta'+(s.distribution[i]===1?'':'s')+(correct?' · correta ✓':incorrect?' · sua resposta: errada ✕':'')+'</small>':'')+'</button>';
 }).join('')+'</div>';}
 function questionStatus(s){
   if(hostMode)return s.answeredCount+' de '+s.playerCount+' responderam. '+(isClosed(s)?'Tempo esgotado. Revele a resposta quando estiver pronto.':s.answeredCount===s.playerCount?'Todos responderam. Você pode revelar a resposta.':'Revele quando a turma estiver pronta.');
   if(s.myAnswer!==null)return 'Resposta '+letter(s.myAnswer)+' registrada ✓ Aguarde o apresentador revelar.';
   if(isClosed(s))return 'Tempo esgotado. Nenhuma resposta enviada. Aguarde o apresentador revelar.';
   return draftOption===null?'Escolha uma alternativa e depois confirme.': 'Alternativa '+letter(draftOption)+' selecionada. Você pode trocar antes de confirmar.';
 }
 function renderQuestion(s){
   const answered=!hostMode&&s.myAnswer!==null;
   layout(roomHeader(s)+'<section class="quiz-round"><div class="quiz-round-meta"><span class="quiz-kicker">PERGUNTA '+s.question.number+' DE '+s.total+' / '+esc(s.question.topic)+'</span><span class="quiz-countdown" id="quiz-countdown" aria-label="Tempo restante"></span></div><div class="quiz-time-track"><span id="quiz-time-progress"></span></div><h1 class="quiz-question">'+esc(s.question.question)+'</h1>'+options(s)+'<div class="quiz-round-footer"><p id="quiz-answer-status" role="status">'+questionStatus(s)+'</p>'+(hostMode?'<button class="quiz-button secondary" id="quiz-reveal">Revelar resposta e explicação →</button>':!answered?'<button class="quiz-button primary" id="quiz-confirm" '+(draftOption===null||busy||isClosed(s)?'disabled':'')+'>Confirmar resposta'+(draftOption===null?'':' '+letter(draftOption))+' →</button>':'')+'</div></section>');
   if(hostMode)$('#quiz-reveal').addEventListener('click',()=>control('reveal'));
   else{
     document.querySelectorAll('[data-quiz-answer]').forEach(b=>b.addEventListener('click',()=>{if(busy||current.myAnswer!==null||isClosed(current))return;draftOption=Number(b.dataset.quizAnswer);renderQuestion(current);}));
     $('#quiz-confirm')?.addEventListener('click',()=>submitAnswer(draftOption));
   }
   clock();
 }
 function ranking(s,final=false){
   const leaders=s.leaderboard||[],me=leaders.find(p=>p.id===s.me?.id),visible=final?leaders:leaders.slice(0,10);
   return '<section class="quiz-ranking"><div class="quiz-ranking-heading"><h2>'+(final?'Ranking final por acertos':'Placar da rodada')+'</h2><span>'+s.playerCount+' participante'+(s.playerCount===1?'':'s')+'</span></div><ol>'+visible.map(p=>'<li'+(p.id===s.me?.id?' class="is-me"':'')+'><span class="quiz-rank">'+(p.rank===1?'✦':p.rank)+'</span><b>'+esc(p.name)+(p.id===s.me?.id?' <small>você</small>':'')+'</b><strong>'+p.correct+'<small> acerto'+(p.correct===1?'':'s')+'<span>'+p.score+' pts</span></small></strong></li>').join('')+'</ol>'+(me&&!visible.some(p=>p.id===me.id)?'<p class="quiz-my-place">Sua posição: '+me.rank+'º · '+me.correct+' acertos · '+me.score+' pontos.</p>':'')+'<p class="quiz-small">Quem acerta mais fica à frente. 100 pontos por acerto; o tempo de resposta não desempata. Empates dividem a posição.</p></section>';
 }
 function renderResults(s){
   const mine=s.myAnswer===null?'Você não respondeu a tempo.':s.myAnswer===s.question.correct?'Você acertou! +100 pontos.':'Você errou. Sua resposta foi '+letter(s.myAnswer)+'.';
   const verdict=hostMode?'':s.myAnswer===null?' unanswered':s.myAnswer===s.question.correct?' is-correct':' is-incorrect';
   layout(roomHeader(s)+'<section class="quiz-round quiz-results"><span class="quiz-kicker">RESULTADO / PERGUNTA '+s.question.number+' DE '+s.total+'</span><h1 class="quiz-question">'+esc(s.question.question)+'</h1>'+options(s,true)+'<div class="quiz-explanation'+verdict+'">'+(!hostMode?'<p class="quiz-verdict">'+esc(mine)+'</p>':'')+'<h2>Resposta correta: '+letter(s.question.correct)+'</h2><span class="quiz-kicker">POR QUE ESSA RESPOSTA?</span><p>'+esc(s.question.explanation)+'</p></div><div class="quiz-round-footer"><p>'+s.answeredCount+' resposta'+(s.answeredCount===1?'':'s')+' · '+(s.playerCount-s.answeredCount)+' sem resposta nesta rodada.</p>'+(hostMode?'<button class="quiz-button primary" id="quiz-next">'+(s.question.number===s.total?'Ver ranking final':'Próxima pergunta')+' →</button>':'<p>Aguarde o apresentador avançar.</p>')+'</div></section>'+ranking(s));
   if(hostMode)$('#quiz-next').addEventListener('click',()=>control('next'));
 }
 function renderFinished(s){
   const best=s.leaderboard[0]?.correct||0,winners=s.leaderboard.filter(p=>p.correct===best),mine=s.leaderboard.find(p=>p.id===s.me?.id);
   layout(roomHeader(s)+'<section class="quiz-finished"><span class="quiz-kicker">10 PERGUNTAS / MUITAS IDEIAS CONECTADAS</span><div class="quiz-trophy" aria-hidden="true">✦</div><h1>Valeu, turma!</h1><p>'+(winners.length===1?esc(winners[0].name)+' terminou na primeira posição.':(winners.length>3?winners.length+' participantes':winners.map(p=>esc(p.name)).join(', '))+' dividiram a primeira posição.')+'</p><strong class="quiz-final-score">'+best+'<small> de '+s.total+' acertos</small></strong>'+(mine?'<p>Seu resultado: <b>'+mine.correct+' de '+s.total+' acertos · '+mine.score+' pontos</b>.</p>':'')+'</section>'+ranking(s,true)+(hostMode?'<button class="quiz-button primary" id="quiz-new">Criar uma nova competição ↺</button>':'<p class="quiz-small">Converse sobre as respostas com a turma. O importante é entender o processo.</p>'));
   if(hostMode)$('#quiz-new').addEventListener('click',()=>{session=null;saveSession();intro();});
 }
 function accept(s){
   if(current&&(s.version<current.version||(s.version===current.version&&s.serverTime<current.serverTime)))return;
   const questionKey=s.code+':'+s.questionIndex;
   if(questionKey!==draftQuestion||s.phase!=='question'||s.myAnswer!==null){draftOption=null;draftQuestion=questionKey;}
   current=s;clockOffset=s.serverTime-Date.now();network('');
   const key=JSON.stringify({...s,serverTime:0});if(key===lastRender){clock();return;}lastRender=key;
   if(s.phase==='lobby')renderLobby(s);else if(s.phase==='question')renderQuestion(s);else if(s.phase==='results')renderResults(s);else renderFinished(s);
 }
 function schedule(delay=1200){clearTimeout(pollTimer);if(session)pollTimer=setTimeout(refresh,document.hidden?5000:delay);}
 async function refresh(){
   if(!session)return;if(inFlight){schedule();return;}inFlight=true;
   try{const s=await request('/rooms/'+session.code+'/state');if(s.role!== (hostMode?'host':'player'))throw Object.assign(new Error('Entre novamente na sala.'),{status:401});accept(s);}catch(e){if([401,404,410].includes(e.status)){session=null;saveSession();intro();error(e.message);}else network('Reconectando… '+e.message);}finally{inFlight=false;schedule();}
 }
 async function control(action){if(busy)return;busy=true;error('');const index=current.questionIndex;document.querySelectorAll('.quiz-round-footer button,#quiz-start').forEach(b=>b.disabled=true);try{const value=await request('/rooms/'+session.code+'/control','POST',{action,questionIndex:index});busy=false;accept(value);}catch(e){busy=false;error(e.message);lastRender='';await refresh();}finally{busy=false;schedule();}}
 async function submitAnswer(option){
   if(busy||current.myAnswer!==null||isClosed(current)||!Number.isInteger(option))return;
   busy=true;error('');document.querySelectorAll('[data-quiz-answer],#quiz-confirm').forEach(b=>b.disabled=true);
   try{const value=await request('/rooms/'+session.code+'/answer','POST',{questionIndex:current.questionIndex,option});busy=false;accept(value);}catch(e){busy=false;error(e.message);lastRender='';await refresh();}finally{busy=false;schedule();}
 }
 function clock(){
   if(!current||current.phase!=='question')return;
   const left=Math.max(0,current.deadline-Date.now()-clockOffset),seconds=Math.ceil(left/1000),counter=$('#quiz-countdown'),bar=$('#quiz-time-progress');
   if(counter)counter.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
   if(bar)bar.style.width=Math.min(100,left/(current.duration*1000)*100)+'%';
   if(isClosed(current)){
     document.querySelectorAll('[data-quiz-answer],#quiz-confirm').forEach(b=>b.disabled=true);
     const status=$('#quiz-answer-status');if(status)status.textContent=questionStatus(current);
   }
 }
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&session)refresh();});window.addEventListener('online',()=>session&&refresh());setInterval(clock,200);
 if(typeof ResizeObserver==='function')new ResizeObserver(resize).observe(document.body);
 if(session){layout('<p class="quiz-loading">Reconectando à sala '+esc(session.code)+'…</p>');refresh();}else intro();
})();
