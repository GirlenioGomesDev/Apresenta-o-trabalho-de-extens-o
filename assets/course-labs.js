/* Documentação interativa: preveja, edite, observe e investigue. */
(function(){
  'use strict';
  const course=window.WorkshopCourse, logic=window.WorkshopLogic;
  const labs=new Map(), esc=logic.escapeHTML;
  function syntax(code){
    const token=/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|function|return|if|else|true|false|null|new|for|of)\b|\b\d+(?:\.\d+)?\b/g;
    let result='',from=0;
    for(const match of code.matchAll(token)){
      result+=esc(code.slice(from,match.index));
      const raw=match[0], cls=raw.startsWith('//')||raw.startsWith('/*')?'comment':/^["'`]/.test(raw)?'string':/^\d/.test(raw)?'number':'keyword';
      result+='<span class="token-'+cls+'">'+esc(raw)+'</span>';
      from=match.index+raw.length;
    }
    return result+esc(code.slice(from))+'\n';
  }
  function resultMarkup(view){
    if(view==='tests')return '<div class="test-lab-view"><span class="mini-label">REGRA: RECUSAR PEDIDOS INVÁLIDOS</span><div class="test-summary"><strong data-tests-count>0/5</strong><span>testes aprovados</span></div><div class="test-results" aria-label="Resultados dos testes"></div><label class="course-control">Pedido ao estoque de 3 <input data-test-order type="number" value="2" min="-5" max="10" step="1"></label><p class="live-reservation" role="status"></p></div>';
    if(view==='network')return '<div class="network-mission-view"><div class="diagnostic-path"><span data-hop="rede">Dispositivo</span><i>→</i><span data-hop="dns">DNS</span><i>→</i><span data-hop="http">Serviço</span><i>→</i><span data-hop="pronto">Resposta</span></div><div class="diagnostic-controls"><label><input type="checkbox" data-net="rede" checked> Rede ativa</label><label><input type="checkbox" data-net="dns" checked> DNS responde</label><label>HTTP <select data-net="http"><option value="200">200 / OK</option><option value="404" selected>404 / Não encontrado</option><option value="503">503 / Indisponível</option></select></label><label>Latência <select data-net="latencia"><option value="120">120 ms</option><option value="500">500 ms</option><option value="501">501 ms</option><option value="900">900 ms</option></select></label></div><div class="diagnostic-conclusion" role="status"><span>PISTA DO CÓDIGO</span><strong data-network-conclusion></strong></div><p class="course-small">Modelo simplificado; os controles são sinais fictícios. Nenhuma conexão real é testada.</p></div>';
    if(view==='analysis')return '<div class="analysis-lab-view"><span class="mini-label">MINUTOS ACUMULADOS / AMOSTRA FICTÍCIA</span><div class="analysis-bars">'+['Web','Dados','Segurança'].map((name,i)=>'<div><span>'+name+'</span><div><i data-analysis-bar="'+i+'"></i></div><b data-analysis-value="'+i+'">0</b></div>').join('')+'</div><div class="analysis-measures"><div><span>Média</span><b data-mean>0</b><small>min / registro</small></div><div><span>Mediana</span><b data-median>0</b><small>min / registro</small></div></div><div class="analysis-switches"><label><input type="checkbox" data-analysis="incompleto"> Registro incompleto</label><label><input type="checkbox" data-analysis="atipico"> Valor atípico: 300 min</label></div><p class="analysis-quality" role="status"></p></div>';
    return '<div class="access-lab-view"><span class="mini-label">USUÁRIO FICTÍCIO / ID 1</span><div class="access-policy-controls"><label>Papel <select data-access="papel"><option value="editor">Editor</option><option value="leitor">Leitor</option></select></label><label><input type="checkbox" data-access="mfa"> Sessão confirmada</label></div><div class="access-matrix" aria-label="Decisões de autorização"></div><p class="access-policy-summary" role="status"></p><p class="course-small">A política desta atividade exige confirmação, dono correto e ação permitida. O quadro representa uma decisão; não impõe segurança real.</p></div>';
  }
  function mount(host){
    const id=host.dataset.courseLab, lesson=course.experiments[id];
    const files=lesson.type==='web'?{...lesson.files}:{js:lesson.code};
    const languages=Object.keys(files).filter(key=>files[key].length>0||key==='html'||lesson.type==='function');
    host.innerHTML='<div class="experiment-orientation"><span class="mini-label">ANTES DE EXECUTAR / O QUE OBSERVAR</span><h3>'+esc(lesson.steps[0].label)+'</h3><p>'+esc(lesson.steps[0].text)+'</p><details><summary>O que este experimento demonstra?</summary><p>'+esc(lesson.feedback)+'</p></details></div><div class="course-lab-tools"><span><i class="status-dot"></i> EXPERIMENTO AO VIVO</span><label><input type="checkbox" data-course-auto checked> Atualizar ao digitar</label><button data-course-reset>Restaurar ↺</button></div><div class="course-workspace"><div class="course-editor"><div class="course-file-tabs" role="tablist" aria-label="Arquivos do experimento">'+languages.map(lang=>'<button data-course-file="'+lang+'" role="tab" aria-selected="false">'+(lang==='html'?'index.html':lang==='css'?'style.css':lesson.type==='function'?'regra.js':'script.js')+'</button>').join('')+'</div><div class="course-editor-view"><div class="course-line-gutter" aria-hidden="true"></div><div class="course-code-stack"><pre class="course-code-highlight" aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Código do experimento: '+esc(id)+'"></textarea></div></div><div class="course-run-row"><span data-course-status role="status">Pronto para investigar.</span><button class="run-button" data-course-run><svg><use href="#i-play"/></svg> Executar</button></div><div class="course-console"><span>CONSOLE</span><div role="log" aria-label="Console do experimento: '+esc(id)+'"></div></div></div><div class="course-result"><div class="course-result-toolbar"><span class="window-dots"><i></i><i></i><i></i></span><b>RESULTADO</b>'+(lesson.type==='web'?'<div class="preview-width-switch" aria-label="Largura da prévia"><button data-preview-width="wide" aria-pressed="true">Ampla</button><button data-preview-width="narrow" aria-pressed="false">Estreita</button></div>':'<span>SIMULAÇÃO CONTROLADA</span>')+'</div><div class="course-result-body">'+(lesson.type==='web'?'<div class="course-frame-width"><iframe title="Resultado do experimento: '+esc(id)+'" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div>':resultMarkup(lesson.view))+'</div><p class="course-output-warning" hidden>Último resultado válido. Corrija o código para atualizar.</p></div></div><div class="course-challenge"><span>DESAFIO DA TURMA</span><p>'+esc(lesson.challenge)+'</p><div><button data-course-hint>Mostrar dica</button><button data-course-solution>Ver uma solução</button><button data-course-attempt hidden>Voltar à minha tentativa</button></div><p class="course-hint" role="status" hidden></p></div><div class="course-code-steps" role="group" aria-label="Como o código funciona">'+lesson.steps.map((step,i)=>'<button data-course-step="'+i+'" aria-pressed="'+(i===0)+'" class="'+(i===0?'active':'')+'"><span>0'+(i+1)+'</span>'+esc(step.label)+'</button>').join('')+'</div><p class="course-step-explanation" aria-live="polite">'+esc(lesson.steps[0].text)+'</p>';
    if(lesson.supportNote){
      const note=document.createElement('p');note.className='course-support-note';note.textContent=lesson.supportNote;
      host.querySelector('.course-lab-tools').before(note);
    }
    const frame=lesson.type==='web'?host.querySelector('iframe'):document.createElement('iframe');
    if(lesson.type==='function'){
      frame.className='lab-execution-frame';frame.setAttribute('sandbox','allow-scripts');frame.title='Executor isolado de '+id;frame.setAttribute('referrerpolicy','no-referrer');host.appendChild(frame);
    }
    const state={id,host,lesson,files,language:lesson.focus||'js',editor:host.querySelector('textarea'),frame,input:JSON.parse(JSON.stringify(lesson.input||{})),token:'course-'+id+'-'+Math.random(),requestId:0,ready:false,started:false,timer:0,hint:0,attempt:null};
    labs.set(id,state);setFile(state,state.language);attach(state);
  }
  function repaint(state){
    const pre=state.host.querySelector('.course-code-highlight'),gutter=state.host.querySelector('.course-line-gutter');
    pre.innerHTML=syntax(state.editor.value);
    gutter.textContent=state.editor.value.split('\n').map((_,i)=>i+1).join('\n');
    pre.scrollTop=state.editor.scrollTop;pre.scrollLeft=state.editor.scrollLeft;gutter.scrollTop=state.editor.scrollTop;
  }
  function setFile(state,language,focus=false){
    state.language=language;state.editor.value=state.files[language]||'';state.editor.scrollTop=0;state.editor.scrollLeft=0;
    state.host.querySelectorAll('[data-course-file]').forEach(button=>{
      const active=button.dataset.courseFile===language;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus();
    });repaint(state);
  }
  function status(state,text,error=false){state.host.querySelector('[data-course-status]').textContent=text;state.host.classList.toggle('course-has-error',error);}
  function log(state,message,level='log',clear=false){
    const host=state.host.querySelector('.course-console [role=log]');if(clear)host.replaceChildren();
    if(message!==undefined){const row=document.createElement('div');row.className='console-entry '+(level==='error'?'error':'log');row.textContent=(level==='error'?'× ':'› ')+String(message).slice(0,600);host.appendChild(row);}
    while(host.children.length>30)host.firstElementChild.remove();host.scrollTop=host.scrollHeight;
  }
  function activate(state){
    if(state.started)return;state.started=true;
    if(state.lesson.type==='web'){state.ready=true;run(state);}
    else state.frame.srcdoc=window.LiveLabEngine.buildRunnerDocument(state.token);
  }
  function run(state){
    clearTimeout(state.timer);if(!state.started){activate(state);return;}if(!state.ready)return;
    status(state,'Executando…');log(state,undefined,'log',true);
    if(state.lesson.type==='web'){
      state.token='web-'+state.id+'-'+Math.random();
      // A altura acompanha a quebra de linhas ao alternar Ampla/Estreita.
      // O token e a janela emissora são conferidos no receptor abaixo.
      const reportSize=`\n(function(){
        let pending=false,lastHeight=0;
        function measure(){
          if(pending)return;pending=true;
          requestAnimationFrame(()=>{
            pending=false;
            const height=Math.ceil(document.body.getBoundingClientRect().height);
            if(height===lastHeight)return;lastHeight=height;
            parent.postMessage({kind:'workshop-preview-size',token:${JSON.stringify(state.token)},height},'*');
          });
        }
        if(typeof ResizeObserver==='function')new ResizeObserver(measure).observe(document.body);
        window.addEventListener('resize',measure);window.addEventListener('load',measure);
        if(document.fonts)document.fonts.ready.then(measure);
        measure();
      })();`;
      state.frame.srcdoc=logic.buildPreview({html:state.files.html||'',css:(state.lesson.support?.css||'')+'\n'+(state.files.css||''),js:(state.files.js||'')+'\n'+(state.lesson.support?.js||'')+reportSize,stage:3,token:state.token});
      status(state,'Prévia atualizada · editar reinicia o exemplo');
    }else{
      state.requestId++;
      state.frame.contentWindow.postMessage({kind:'run-function-lab',token:state.token,requestId:state.requestId,code:state.files.js,input:state.input},'*');
    }
  }
  function attach(state){
    const host=state.host,editor=state.editor;
    const buttons=Array.from(host.querySelectorAll('[data-course-file]'));
    buttons.forEach((button,index)=>{
      button.addEventListener('click',()=>setFile(state,button.dataset.courseFile));
      button.addEventListener('keydown',event=>{
        if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
        event.preventDefault();event.stopPropagation();
        const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length;
        setFile(state,buttons[next].dataset.courseFile,true);
      });
    });
    editor.addEventListener('input',()=>{
      state.files[state.language]=editor.value;repaint(state);clearTimeout(state.timer);
      status(state,host.querySelector('[data-course-auto]').checked?'Aplicando alteração…':'Alteração pendente · execute para aplicar');
      if(host.querySelector('[data-course-auto]').checked)state.timer=setTimeout(()=>run(state),350);
    });
    editor.addEventListener('scroll',()=>{const pre=host.querySelector('pre');pre.scrollTop=editor.scrollTop;pre.scrollLeft=editor.scrollLeft;host.querySelector('.course-line-gutter').scrollTop=editor.scrollTop;});
    editor.addEventListener('keydown',event=>{
      if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();event.stopPropagation();run(state);}
      if(event.key==='Tab'){event.preventDefault();editor.setRangeText('  ',editor.selectionStart,editor.selectionEnd,'end');editor.dispatchEvent(new Event('input',{bubbles:true}));}
    });
    host.querySelector('[data-course-run]').addEventListener('click',()=>run(state));
    host.querySelector('[data-course-auto]').addEventListener('change',event=>{clearTimeout(state.timer);if(event.target.checked)run(state);else status(state,'Atualização pausada');});
    host.querySelector('[data-course-reset]').addEventListener('click',()=>{
      state.files=state.lesson.type==='web'?{...state.lesson.files}:{js:state.lesson.code};state.input=JSON.parse(JSON.stringify(state.lesson.input||{}));state.attempt=null;state.hint=0;
      host.querySelector('[data-course-attempt]').hidden=true;host.querySelector('.course-hint').hidden=true;setFile(state,state.lesson.focus||'js');syncControls(state);run(state);
    });
    host.querySelectorAll('[data-predict]').forEach(button=>button.addEventListener('click',()=>{
      host.querySelectorAll('[data-predict]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
      const feedback=host.querySelector('.predict-feedback');feedback.hidden=false;feedback.textContent=(Number(button.dataset.predict)===state.lesson.correct?'Boa previsão. ':'Vamos investigar. ')+state.lesson.feedback;
    }));
    host.querySelector('[data-course-hint]').addEventListener('click',()=>{
      const hint=host.querySelector('.course-hint');hint.hidden=false;hint.textContent='Dica '+(Math.min(state.hint,state.lesson.hints.length-1)+1)+' / '+state.lesson.hints.length+': '+state.lesson.hints[Math.min(state.hint,state.lesson.hints.length-1)];state.hint++;
    });
    host.querySelector('[data-course-solution]').addEventListener('click',()=>{
      if(!state.attempt)state.attempt={...state.files};
      const solution=state.lesson.solution;Object.assign(state.files,solution.code?{js:solution.code}:solution);
      const language=Object.keys(solution)[0]==='code'?'js':Object.keys(solution)[0];setFile(state,language);host.querySelector('[data-course-attempt]').hidden=false;run(state);
    });
    host.querySelector('[data-course-attempt]').addEventListener('click',()=>{if(state.attempt){state.files={...state.attempt};setFile(state,state.language);run(state);}});
    host.querySelectorAll('[data-course-step]').forEach(button=>button.addEventListener('click',()=>{
      host.querySelectorAll('[data-course-step]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});host.querySelector('.course-step-explanation').textContent=state.lesson.steps[Number(button.dataset.courseStep)].text;
    }));
    host.querySelectorAll('[data-preview-width]').forEach(button=>button.addEventListener('click',()=>{
      host.querySelectorAll('[data-preview-width]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
      host.querySelector('.course-frame-width').classList.toggle('narrow',button.dataset.previewWidth==='narrow');
    }));
    host.querySelectorAll('[data-net],[data-analysis],[data-access],[data-test-order]').forEach(input=>input.addEventListener('change',()=>{
      if(input.dataset.net)state.input[input.dataset.net]=input.type==='checkbox'?input.checked:Number(input.value);
      if(input.dataset.analysis)state.input[input.dataset.analysis]=input.checked;
      if(input.dataset.access)state.input[input.dataset.access]=input.type==='checkbox'?input.checked:input.value;
      if(input.hasAttribute('data-test-order'))state.input.pedido=Number(input.value);
      run(state);
    }));
  }
  function syncControls(state){
    state.host.querySelectorAll('[data-net],[data-analysis],[data-access],[data-test-order]').forEach(input=>{
      const key=input.dataset.net||input.dataset.analysis||input.dataset.access||(input.hasAttribute('data-test-order')?'pedido':'');
      if(input.type==='checkbox')input.checked=Boolean(state.input[key]);else input.value=String(state.input[key]);
    });
  }
  function render(state,result){
    const host=state.host;
    if(state.lesson.view==='tests'){
      host.querySelector('[data-tests-count]').textContent=result.testes.filter(t=>t.passou).length+'/'+result.testes.length;
      host.querySelector('.test-results').innerHTML=result.testes.map(t=>'<div class="'+(t.passou?'test-pass':'test-fail')+'"><span>'+(t.passou?'✓':'×')+'</span><b>'+esc(t.nome)+'</b><small>Esperado: '+esc(t.esperado)+' · obtido: '+esc(t.obtido)+'</small></div>').join('');
      host.querySelector('.live-reservation').textContent='Pedido atual: '+state.input.pedido+' · resultado do código: '+result.restante;
    }
    if(state.lesson.view==='network'){
      host.querySelectorAll('[data-hop]').forEach(hop=>hop.classList.toggle('current',hop.dataset.hop===result.etapa||(result.etapa==='lento'&&hop.dataset.hop==='pronto')));
      host.querySelector('.diagnostic-path').dataset.result=result.etapa;
      host.querySelector('[data-network-conclusion]').textContent=result.mensagem;
    }
    if(state.lesson.view==='analysis'){
      const max=Math.max(...result.valores,1);
      result.valores.forEach((n,i)=>{host.querySelector('[data-analysis-bar="'+i+'"]').style.width=(n/max*100)+'%';host.querySelector('[data-analysis-value="'+i+'"]').textContent=n;});
      const number=n=>Number(n.toFixed(1)).toLocaleString('pt-BR');host.querySelector('[data-mean]').textContent=number(result.media);host.querySelector('[data-median]').textContent=number(result.mediana);
      host.querySelector('.analysis-quality').textContent=result.validos+' registros válidos · '+result.descartados+' descartados. Compare o cálculo com a pergunta da análise.';
    }
    if(state.lesson.view==='access'){
      host.querySelector('.access-matrix').innerHTML=result.acessos.map(row=>'<div class="'+(row.permitido===row.esperado?'policy-match':'policy-mismatch')+'"><span>'+esc(row.nome)+'</span><b>'+(row.permitido?'✓ Permite':'× Bloqueia')+'</b><small>Política: '+(row.esperado?'permitir':'bloquear')+'</small></div>').join('');
      const count=result.acessos.filter(row=>row.permitido!==row.esperado).length;
      host.querySelector('.access-policy-summary').textContent=count?count+' decisão(ões) não seguem a política da atividade. Investigue a função.':'Todas as decisões seguem a política desta atividade.';
    }
  }
  window.addEventListener('message',event=>{
    for(const state of labs.values()){
      const message=event.data;if(event.source!==state.frame.contentWindow||!message||message.token!==state.token)continue;
      if(state.lesson.type==='web'){
        if(message.kind==='workshop-preview-size'){
          const height=Number(message.height);
          if(Number.isFinite(height)&&height>0)state.frame.style.height=Math.max(410,Math.min(1800,height+8))+'px';
          return;
        }
        if(!['workshop-console','workshop-error'].includes(message.kind))return;
        log(state,message.message,message.kind==='workshop-error'?'error':message.level);
        if(message.kind==='workshop-error')status(state,'Erro no exemplo · confira o console',true);return;
      }
      if(message.kind!=='function-lab')return;if(message.ready){state.ready=true;run(state);return;}if(message.requestId!==state.requestId)return;
      let error=message.ok?null:message.error;
      if(!error){try{render(state,window.CourseLogic.validate(state.lesson.view,message.output));}catch(e){error=e.message;}}
      log(state,undefined,'log',true);(message.logs||[]).slice(0,30).forEach(row=>log(state,row.text,row.level));if(error)log(state,error,'error');
      hostWarning(state,Boolean(error));status(state,error?'Confira o código':'Resultado atualizado',Boolean(error));return;
    }
  });
  function hostWarning(state,show){state.host.querySelector('.course-output-warning').hidden=!show;}
  function activateCurrent(){const scene=document.querySelector('.scene:not([hidden])');const host=scene?.querySelector('[data-course-lab]');if(host)activate(labs.get(host.dataset.courseLab));}
  document.querySelectorAll('[data-course-lab]').forEach(mount);
  window.addEventListener('workshop-scene-change',activateCurrent);activateCurrent();
  window.CourseLabs={run:id=>{const state=labs.get(id);if(state)run(state);}};
})();
