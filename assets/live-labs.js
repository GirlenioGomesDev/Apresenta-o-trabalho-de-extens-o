/* Código editável + resultado animado + console. Nenhum código roda no DOM principal. */
(function () {
  'use strict';
  const lessons = window.LiveLabLessons;
  const engine = window.LiveLabEngine;
  const escape = window.WorkshopLogic.escapeHTML;
  const labs = new Map();
  const person = '<span class="lab-person" aria-hidden="true"><i class="person-antenna"></i><i class="person-head"><b></b><b></b></i><i class="person-body"></i><i class="person-arm left"></i><i class="person-arm right"></i><i class="person-leg left"></i><i class="person-leg right"></i></span>';

  function visual(id) {
    if (id === 'software') return '<div class="game-visual"><div class="game-hud"><span>MINIJOGO / COLETAR ESTRELAS</span><b><span data-points>0</span><small> PONTOS</small></b></div><div class="game-world"><div class="game-cloud c1"></div><div class="game-cloud c2"></div><div class="game-avatar">' + person + '</div><div class="game-stars">' + [1,2,3,4,5].map(n => '<span data-star="' + n + '">★</span>').join('') + '</div><div class="game-ground"></div></div><div class="visual-control-row"><span>Estrelas: <b data-stars>1</b>/5</span><button data-collect>Coletar estrela +</button><button data-restart aria-label="Recomeçar coleta">↺</button></div><p class="visual-small-caption">A coleta é a entrada. O seu código calcula o placar.</p></div>';
    if (id === 'infra') return '<div class="infra-live-visual"><span class="mini-label">CAMINHO DE UM PACOTE FICTÍCIO</span><div class="packet-route"><div class="network-node device"><span>▱</span><b>Notebook</b><small>dispositivo</small></div><div class="packet-wire wire-1"><i></i><span class="packet">●</span></div><div class="network-node router"><span>⌁</span><b>Rede</b><small data-network-state>desligada</small></div><div class="packet-wire wire-2"><i></i><span class="packet">●</span></div><div class="network-node server"><span>▤</span><b>Servidor</b><small data-server-state>ativo</small></div></div><div class="network-switches"><label><input type="checkbox" data-network> Rede ativa</label><label><input type="checkbox" data-server checked> Servidor ativo</label><button data-send>Enviar pacote →</button></div><div class="network-diagnosis"><span>O código concluiu</span><strong data-diagnosis>Aguardando execução</strong></div><p class="visual-small-caption" data-evidence>Esta representação não consulta a internet nem a rede da escola.</p></div>';
    if (id === 'dados') return '<div class="data-live-visual"><div class="data-live-header"><span class="mini-label">PREFERÊNCIAS / DADOS FICTÍCIOS</span><span><b data-total>0</b> respostas</span></div><div class="live-chart" role="img" aria-label="Gráfico aguardando execução">' + ['Jogos','Vídeos','Música'].map((name,i) => '<div class="live-chart-column"><b data-bar-value="' + i + '">0</b><div class="live-bar-track"><div data-bar="' + i + '"></div></div><span>' + name + '</span></div>').join('') + '</div><div class="data-chart-foot"><span data-scale>Escala: 0 a 30</span><span>Quantidade de escolhas</span></div><p class="data-insight" data-insight>Edite os números e acompanhe as barras.</p></div>';
    return '<div class="cyber-live-visual"><div class="cyber-gate-scene"><span class="gate-zone-label">PEDIDO DE ACESSO</span><div class="cyber-avatar">' + person + '</div><div class="security-gate"><div class="gate-lamp"></div><span class="gate-frame"></span><span class="gate-door"><svg><use href="#i-lock"/></svg></span></div><span class="protected-zone">ÁREA<br>RESTRITA</span></div><div class="cyber-controls"><label>Papel <select data-cyber-role aria-label="Papel da pessoa na simulação"><option value="visitante">Visitante</option><option value="editor">Editor</option><option value="revisor">Revisor</option></select></label><label class="second-step-control"><input type="checkbox" data-second-step> Segunda etapa confirmada</label></div><div class="gate-result"><span data-access-icon>●</span><strong data-access-status>Aguardando execução</strong></div><p class="visual-small-caption">Simulação de autenticação e autorização. Nenhuma conta real é acessada.</p></div>';
  }

  function mount(host) {
    const id = host.dataset.liveLab;
    const lesson = lessons[id];
    host.innerHTML = '<div class="live-lab-toolbar"><span class="live-demo-label"><span class="status-dot"></span> LABORATÓRIO DE ' + escape(({software:'SOFTWARE',infra:'SUPORTE',dados:'DADOS',cyber:'CIBERSEGURANÇA'})[id]) + '</span><label class="auto-run-control"><input type="checkbox" data-auto checked> Atualizar ao digitar</label><button class="live-reset" data-reset>Restaurar ↺</button></div><div class="function-workspace"><div class="function-editor editor-pane"><div class="editor-toolbar"><span class="live-filename">' + lesson.file + '</span><span class="editor-corner">JAVASCRIPT / EDITÁVEL</span></div><div class="numbered-editor"><div class="code-line-numbers" aria-hidden="true"></div><textarea class="function-code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Código de ' + escape(lesson.file) + '"></textarea></div><div class="function-editor-actions"><button data-preset>' + escape(lesson.preset) + '</button><button data-run class="run-button"><svg><use href="#i-play"/></svg>Executar</button></div><div class="live-console"><div class="live-console-heading"><span>CONSOLE</span><span data-run-status role="status">Preparando ambiente…</span></div><div class="live-console-lines" role="log" aria-label="Console de ' + escape(lesson.file) + '"></div></div></div><div class="function-result"><div class="live-result-toolbar"><span class="window-dots"><i></i><i></i><i></i></span><span>RESULTADO AO VIVO</span><span class="result-state">SIMULAÇÃO</span></div><div class="function-visual">' + visual(id) + '</div><div class="last-valid-indicator" hidden>Último resultado válido · corrija o código para continuar</div></div></div><div class="live-challenge"><span>EXPERIMENTE</span><p>' + escape(lesson.challenge) + '</p></div><div class="code-walkthrough"><div class="code-walkthrough-tabs" role="group" aria-label="O que o código faz">' + lesson.steps.map((step,index) => '<button data-code-step="' + index + '" aria-pressed="' + (index===0) + '" class="' + (index===0?'active':'') + '"><span>0' + (index+1) + '</span>' + escape(step.label) + '</button>').join('') + '</div><p class="code-step-detail" aria-live="polite">' + escape(lesson.steps[0].text) + '</p></div>';
    const editor = host.querySelector('textarea');
    const token = id + '-' + Date.now() + '-' + Math.random();
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.setAttribute('title', 'Executor isolado de ' + lesson.file);
    frame.setAttribute('referrerpolicy', 'no-referrer');
    frame.className = 'lab-execution-frame';
    const state = { id, host, lesson, editor, frame, token, ready:false, requestId:0, input:JSON.parse(JSON.stringify(lesson.input)), timer:0, result:null };
    labs.set(id,state);
    editor.value = lesson.code;
    updateLines(state);
    editor.addEventListener('scroll', () => { host.querySelector('.code-line-numbers').scrollTop = editor.scrollTop; });
    editor.addEventListener('input', () => {
      updateLines(state);
      clearTimeout(state.timer);
      setStatus(state, host.querySelector('[data-auto]').checked ? 'Aplicando alteração…' : 'Alteração pendente · execute para aplicar');
      if (host.querySelector('[data-auto]').checked) state.timer = setTimeout(() => run(state), 350);
    });
    editor.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); run(state); }
      if (event.key === 'Tab') {
        event.preventDefault();
        const start = editor.selectionStart;
        editor.setRangeText('  ', start, editor.selectionEnd, 'end');
        editor.dispatchEvent(new Event('input', {bubbles:true}));
      }
    });
    host.querySelector('[data-auto]').addEventListener('change', event => {
      clearTimeout(state.timer);
      if (event.target.checked) run(state);
      else setStatus(state, 'Atualização pausada · execute quando quiser');
    });
    host.querySelector('[data-run]').addEventListener('click', () => run(state));
    host.querySelector('[data-reset]').addEventListener('click', () => {
      editor.value = lesson.code; state.input = JSON.parse(JSON.stringify(lesson.input));
      updateControls(state); updateLines(state); run(state);
    });
    host.querySelector('[data-preset]').addEventListener('click', () => { editor.value = lesson.alternate; updateLines(state); run(state); });
    host.querySelectorAll('[data-code-step]').forEach(button => button.addEventListener('click', () => {
      host.querySelectorAll('[data-code-step]').forEach(other => { other.classList.toggle('active',other===button); other.setAttribute('aria-pressed',String(other===button)); });
      host.querySelector('.code-step-detail').textContent = lesson.steps[Number(button.dataset.codeStep)].text;
    }));
    attachControls(state);
    frame.srcdoc = engine.buildRunnerDocument(token);
    host.appendChild(frame);
  }

  function updateLines(state) {
    state.host.querySelector('.code-line-numbers').textContent = state.editor.value.split('\n').map((_,i)=>i+1).join('\n');
  }
  function setStatus(state, text, error=false) {
    state.host.querySelector('[data-run-status]').textContent = text;
    state.host.classList.toggle('execution-error',error);
  }
  function run(state) {
    clearTimeout(state.timer);
    if (!state.ready) return;
    state.requestId += 1;
    setStatus(state, 'Executando…');
    state.frame.contentWindow.postMessage({ kind:'run-function-lab', token:state.token, requestId:state.requestId, code:state.editor.value, input:state.input }, '*');
  }
  function renderConsole(state, logs, error) {
    const consoleHost = state.host.querySelector('.live-console-lines');
    consoleHost.replaceChildren();
    const entries = (Array.isArray(logs) ? logs.slice(0,30) : []).concat(error ? [{level:'error',text:error}] : []);
    if (!entries.length) entries.push({level:'info',text:'Sem mensagens. Use console.log para observar um valor.'});
    entries.forEach(log => {
      const line = document.createElement('div');
      line.className = 'console-entry ' + (['error','warn'].includes(log.level) ? log.level : 'log');
      line.textContent = (log.level === 'error' ? '× ' : '› ') + String(log.text).slice(0,600);
      consoleHost.appendChild(line);
    });
    consoleHost.scrollTop = consoleHost.scrollHeight;
  }
  function animateNumber(element, value) {
    const previous = Number(element.dataset.value) || 0;
    element.dataset.value = String(value);
    if (element.animationFrame) cancelAnimationFrame(element.animationFrame);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { element.textContent = value.toLocaleString('pt-BR'); return; }
    const start = performance.now();
    function frame(now) {
      const fraction = Math.min(1, (now-start)/350);
      const number = previous + (value-previous) * (1-Math.pow(1-fraction,3));
      element.textContent = (Number.isInteger(value) ? Math.round(number) : Math.round(number*10)/10).toLocaleString('pt-BR');
      if (fraction<1) element.animationFrame = requestAnimationFrame(frame);
    }
    element.animationFrame = requestAnimationFrame(frame);
  }
  function replayPacket(state) {
    const route = state.host.querySelector('.packet-route');
    route.classList.remove('sending');
    void route.offsetWidth;
    route.classList.add('sending');
  }
  function updateControls(state) {
    const host = state.host;
    if (state.id==='software') {
      host.querySelector('[data-stars]').textContent = state.input.estrelas;
      host.querySelector('[data-collect]').disabled = state.input.estrelas >= 5;
      host.querySelector('.game-avatar').style.left = (9 + state.input.estrelas*13) + '%';
      host.querySelectorAll('[data-star]').forEach(star=>star.classList.toggle('picked',Number(star.dataset.star)<=state.input.estrelas));
    }
    if (state.id==='infra') {
      host.querySelector('[data-network]').checked = state.input.redeAtiva;
      host.querySelector('[data-server]').checked = state.input.servidorAtivo;
      host.querySelector('[data-network-state]').textContent = state.input.redeAtiva ? 'ativa' : 'desligada';
      host.querySelector('[data-server-state]').textContent = state.input.servidorAtivo ? 'ativo' : 'desligado';
      host.querySelector('.packet-route').dataset.routeNetwork = String(state.input.redeAtiva);
      host.querySelector('.packet-route').dataset.routeServer = String(state.input.servidorAtivo);
    }
    if (state.id==='cyber') {
      host.querySelector('[data-cyber-role]').value = state.input.papel;
      host.querySelector('[data-second-step]').checked = state.input.segundaEtapa;
    }
  }
  function attachControls(state) {
    const host = state.host;
    if (state.id==='software') {
      host.querySelector('[data-collect]').addEventListener('click', () => { state.input.estrelas=Math.min(5,state.input.estrelas+1); updateControls(state); run(state); });
      host.querySelector('[data-restart]').addEventListener('click', () => { state.input.estrelas=0; updateControls(state); run(state); });
    }
    if (state.id==='infra') {
      ['network','server'].forEach(key => host.querySelector('[data-'+key+']').addEventListener('change', event => {
        state.input[key==='network' ? 'redeAtiva' : 'servidorAtivo'] = event.target.checked;
        updateControls(state); run(state);
      }));
      host.querySelector('[data-send]').addEventListener('click', () => { replayPacket(state); run(state); });
    }
    if (state.id==='cyber') {
      host.querySelector('[data-cyber-role]').addEventListener('change', event => { state.input.papel=event.target.value; run(state); });
      host.querySelector('[data-second-step]').addEventListener('change', event => { state.input.segundaEtapa=event.target.checked; run(state); });
    }
    updateControls(state);
  }
  function renderResult(state, value) {
    const host = state.host;
    updateControls(state);
    if (state.id==='software') animateNumber(host.querySelector('[data-points]'), value.pontos);
    if (state.id==='infra') {
      const actual = !state.input.redeAtiva ? 'rede' : !state.input.servidorAtivo ? 'servidor' : 'online';
      const titles = {rede:'Falha na rede',servidor:'Servidor indisponível',online:'Caminho disponível'};
      host.querySelector('[data-diagnosis]').textContent = titles[value.status];
      host.querySelector('.network-diagnosis').dataset.status = value.status;
      host.querySelectorAll('.network-node').forEach(node=>node.classList.toggle('diagnosed',node.classList.contains(value.status==='rede'?'router':value.status==='servidor'?'server':'device')));
      const evidence = host.querySelector('[data-evidence]');
      evidence.textContent = actual===value.status ? 'Sinais e conclusão combinam. O pacote mostra o caminho simulado.' : 'Atenção: o código diz “' + titles[value.status] + '”, mas os sinais indicam “' + titles[actual] + '”. Qual verificação falta?';
      evidence.classList.toggle('mismatch',actual!==value.status);
      replayPacket(state);
    }
    if (state.id==='dados') {
      const labels=['Jogos','Vídeos','Música'];
      const max=Math.max(30,...value.valores);
      animateNumber(host.querySelector('[data-total]'),value.total);
      value.valores.forEach((number,index)=>{
        host.querySelector('[data-bar="'+index+'"]').style.height=(number/max*100)+'%';
        host.querySelector('[data-bar-value="'+index+'"]').textContent=number.toLocaleString('pt-BR');
      });
      host.querySelector('[data-scale]').textContent='Escala: 0 a '+max;
      host.querySelector('.live-chart').setAttribute('aria-label',labels.map((label,i)=>label+': '+value.valores[i]).join(', '));
      const largest=Math.max(...value.valores);
      const winners=labels.filter((_,i)=>value.valores[i]===largest);
      const sum=value.valores.reduce((a,b)=>a+b,0);
      host.querySelector('[data-insight]').textContent=(winners.length===1?winners[0]+' tem a maior quantidade.': 'Há um empate entre '+winners.join(', ')+'.')+(sum!==value.total?' Confira a função: o total calculado não confere com as barras.':' O gráfico muda porque os dados mudaram.');
    }
    if (state.id==='cyber') {
      host.querySelector('.cyber-live-visual').classList.toggle('access-allowed',value.permitido);
      host.querySelector('[data-access-status]').textContent=value.permitido?'Acesso liberado pelo código':'Acesso bloqueado pelo código';
      host.querySelector('[data-access-icon]').textContent=value.permitido?'✓':'×';
    }
  }

  window.addEventListener('message', event => {
    for (const state of labs.values()) {
      const message = event.data;
      if (event.source!==state.frame.contentWindow || !message || message.kind!=='function-lab' || message.token!==state.token) continue;
      if (message.ready) { state.ready=true; run(state); return; }
      if (message.requestId!==state.requestId) return;
      let error=message.ok ? null : String(message.error || 'Não foi possível executar.');
      if (!error) {
        try { state.result=engine.validateOutput(state.id,message.output); renderResult(state,state.result); }
        catch (validationError) { error=validationError.message; }
      }
      renderConsole(state,message.logs,error);
      setStatus(state,error?'Confira o código':'Executado · resultado atualizado',Boolean(error));
      state.host.querySelector('.last-valid-indicator').hidden=!error;
      state.host.querySelector('.function-result').classList.toggle('result-stale',Boolean(error));
      return;
    }
  });
  document.querySelectorAll('[data-live-lab]').forEach(mount);
  window.LiveLabs={ run:id=>{const state=labs.get(id);if(state)run(state);} };
})();
