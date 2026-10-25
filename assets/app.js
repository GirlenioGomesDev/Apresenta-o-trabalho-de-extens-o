/* Interface da apresentação. Arquivo clássico para funcionar também via file://. */
(function () {
  'use strict';
  const data = window.WorkshopData;
  const logic = window.WorkshopLogic;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const scenes = $$('.scene');
  const ids = scenes.map(scene => scene.id);
  let current = -1;
  let toastTimeout;

  function toast(message) {
    clearTimeout(toastTimeout);
    $('#toast').textContent = message;
    $('#toast').hidden = false;
    toastTimeout = setTimeout(() => { $('#toast').hidden = true; }, 4200);
  }

  function updateNotes() {
    const scene = scenes[current];
    const note = data.notes[scene.id];
    $('#notes-title').textContent = scene.dataset.title;
    $('#notes-time').textContent = note ? note.time : '';
    $('#notes-text').textContent = note ? note.text : '';
  }

  function renderScene(index, focus) {
    const safeIndex = logic.clampIndex(index, scenes.length);
    if (current === safeIndex) return;
    current = safeIndex;
    scenes.forEach((scene, sceneIndex) => { scene.hidden = sceneIndex !== current; });
    const scene = scenes[current];
    document.body.dataset.theme = scene.dataset.theme || 'light';
    document.title = scene.dataset.title + ' · Fábrica de Software';
    $('#scene-number').textContent = String(current + 1).padStart(2, '0');
    $('#scene-total').textContent = String(scenes.length).padStart(2, '0');
    $('#footer-title').textContent = scene.dataset.title;
    $('#previous-scene').disabled = current === 0;
    $('#next-scene').innerHTML = (current === scenes.length - 1 ? 'Início' : 'Próximo') + ' <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    $('.progress-track').setAttribute('aria-valuemax', String(scenes.length));
    $('.progress-track').setAttribute('aria-valuenow', String(current + 1));
    $('#presentation-progress').style.width = ((current + 1) / scenes.length * 100) + '%';
    $$('[data-chapter-link]').forEach(link => {
      const active = link.dataset.chapterLink === scene.dataset.chapter;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    $$('#overview-list a').forEach(link => {
      const active = link.hash === '#' + scene.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    updateNotes();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) (scene.querySelector('h1, h2') || $('#conteudo')).focus({ preventScroll: true });
  }

  function go(index, focus = true) {
    const safeIndex = logic.clampIndex(index, scenes.length);
    if (safeIndex === current) return;
    const hash = '#' + ids[safeIndex];
    // pushState preserva o comportamento de voltar/avançar sem rolar para a âncora.
    try { history.pushState(null, '', hash); }
    catch (_) { location.hash = hash; }
    renderScene(safeIndex, focus);
  }

  $('#previous-scene').addEventListener('click', () => go(current - 1));
  $('#next-scene').addEventListener('click', () => go(current === scenes.length - 1 ? 0 : current + 1));
  window.addEventListener('popstate', () => renderScene(logic.resolveIndex(location.hash, ids), true));
  window.addEventListener('hashchange', () => renderScene(logic.resolveIndex(location.hash, ids), true));

  const overview = $('#overview-dialog');
  const help = $('#help-dialog');
  $('#overview-list').innerHTML = scenes.map((scene, index) => '<a href="#' + scene.id + '"><span>' + String(index + 1).padStart(2, '0') + '</span>' + logic.escapeHTML(scene.dataset.title) + '</a>').join('');

  function openDialog(dialog) {
    if (dialog.open) { dialog.close(); return; }
    document.querySelectorAll('dialog[open]').forEach(other => other.close());
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else toast('Atualize o navegador para abrir o roteiro e os atalhos.');
  }

  $('#overview-open').addEventListener('click', () => openDialog(overview));
  $('#help-open').addEventListener('click', () => openDialog(help));
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }));

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip-link')) return;
    const index = ids.indexOf(link.getAttribute('href').slice(1));
    if (index < 0) return;
    event.preventDefault();
    const dialog = link.closest('dialog');
    if (dialog && dialog.open) dialog.close();
    go(index);
  });

  function setNotes(open) {
    $('#presenter-notes').hidden = !open;
    $('#notes-toggle').setAttribute('aria-expanded', String(open));
  }
  $('#notes-toggle').addEventListener('click', () => setNotes($('#presenter-notes').hidden));
  $('#notes-close').addEventListener('click', () => { setNotes(false); $('#notes-toggle').focus(); });

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast('Este navegador não oferece tela cheia. Use o modo de apresentação do navegador.');
    } catch (_) { toast('A tela cheia não está disponível neste ambiente. Tente abrir a apresentação diretamente no navegador.'); }
  }
  $('#fullscreen').addEventListener('click', fullscreen);
  document.addEventListener('fullscreenchange', () => $('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Sair da tela cheia' : 'Entrar em tela cheia'));

  let timerAccumulated = 0;
  let timerStartedAt = 0;
  let timerRunning = false;
  function elapsedSeconds() { return (timerAccumulated + (timerRunning ? Date.now() - timerStartedAt : 0)) / 1000; }
  function renderTimer() { $('#timer-value').textContent = logic.formatTime(elapsedSeconds()); }
  $('#timer-toggle').addEventListener('click', () => {
    if (timerRunning) timerAccumulated += Date.now() - timerStartedAt;
    else timerStartedAt = Date.now();
    timerRunning = !timerRunning;
    $('#timer-toggle').classList.toggle('running', timerRunning);
    $('#timer-toggle').setAttribute('aria-label', timerRunning ? 'Pausar cronômetro' : 'Continuar cronômetro');
    renderTimer();
  });
  $('#timer-reset').addEventListener('click', () => {
    timerAccumulated = 0;
    timerStartedAt = Date.now();
    renderTimer();
    toast('Cronômetro zerado.');
  });
  setInterval(renderTimer, 1000);

  document.addEventListener('keydown', event => {
    const editing = event.target.closest('input, textarea, select, [contenteditable="true"]');
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && scenes[current].id === 'laboratorio') {
      event.preventDefault(); runLab(); return;
    }
    if (event.key === 'Escape' && !$('#presenter-notes').hidden) { setNotes(false); return; }
    if (editing || event.ctrlKey || event.metaKey || event.altKey || document.querySelector('dialog[open]')) return;
    const interactive = event.target.closest('button, a, summary, [role="tab"]');
    const key = event.key.toLowerCase();
    if (key === 'f') { event.preventDefault(); fullscreen(); }
    else if (key === 'm') { event.preventDefault(); openDialog(overview); }
    else if (key === 'n') { event.preventDefault(); setNotes($('#presenter-notes').hidden); }
    else if (key === '?') { event.preventDefault(); openDialog(help); }
    else {
      if (['ArrowRight', 'PageDown'].includes(event.key) || (event.key === ' ' && !interactive)) { event.preventDefault(); go(current + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(current - 1); }
      else if (event.key === 'Home') { event.preventDefault(); go(0); }
      else if (event.key === 'End') { event.preventDefault(); go(scenes.length - 1); }
    }
  });

  let heroClicks = 0;
  $('#hero-try').addEventListener('click', () => {
    heroClicks += 1;
    $('#hero-message').textContent = heroClicks === 1 ? 'Você acabou de interagir com JavaScript.' : 'A sua ideia já respondeu a ' + heroClicks + ' cliques.';
  });

  $$('[data-audience]').forEach(button => button.addEventListener('click', () => {
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    const count = $$('[data-audience][aria-pressed="true"]').length;
    $('#audience-count').textContent = count + ' de 4 situações exploradas';
  }));

  function selectButtons(selector, attribute, value) {
    $$(selector).forEach(button => {
      const active = button.getAttribute(attribute) === String(value);
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  let requestStep = 0;
  function setRequestStep(index) {
    requestStep = index;
    selectButtons('[data-request-step]', 'data-request-step', index);
    $('#request-label').textContent = 'PASSO ' + String(index + 1).padStart(2, '0');
    $('#request-title').textContent = data.request[index].title;
    $('#request-text').textContent = data.request[index].text;
    $('#request-next').innerHTML = (index === data.request.length - 1 ? 'Recomeçar' : 'Próximo passo') + ' <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  }
  $$('[data-request-step]').forEach(button => button.addEventListener('click', () => setRequestStep(Number(button.dataset.requestStep))));
  $('#request-next').addEventListener('click', () => setRequestStep((requestStep + 1) % data.request.length));

  $$('[data-language]').forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    selectButtons('[data-language]', 'data-language', language);
    const content = data.languages[language];
    $('#language-analogy').textContent = content.analogy;
    $('#language-heading').textContent = content.heading;
    $('#language-text').textContent = content.text;
    $('#language-code').textContent = content.code;
    $('#language-hint').textContent = content.hint;
  }));

  let labStage = 1;
  let labToken = '';
  const editors = { html: $('#editor-html'), css: $('#editor-css'), js: $('#editor-js') };
  const stageDescriptions = [
    'Só HTML: o conteúdo já existe, ainda sem estilo ou interação.',
    'HTML + CSS: a mesma estrutura agora tem cores, tamanhos e organização.',
    'HTML + CSS + JavaScript: clique em “Quero participar” na prévia.'
  ];

  function setEditor(language, focus = false) {
    Object.entries(editors).forEach(([key, editor]) => {
      editor.hidden = key !== language;
      editor.parentElement.hidden = key !== language;
    });
    $$('[data-editor]').forEach(button => {
      const active = button.dataset.editor === language;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
  }

  $$('[data-editor]').forEach((button, index, buttons) => {
    button.addEventListener('click', () => setEditor(button.dataset.editor));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
      setEditor(buttons[next].dataset.editor, true);
    });
  });

  function runLab() {
    labToken = String(Date.now()) + '-' + String(Math.random());
    $('#lab-status').classList.remove('has-error');
    $('#lab-status').textContent = 'Código aplicado. Etapa ' + labStage + ' de 3.';
    $('#lab-preview').srcdoc = logic.buildPreview({ html: editors.html.value, css: editors.css.value, js: editors.js.value, stage: labStage, token: labToken });
  }
  function setLabStage(stage) {
    labStage = stage;
    selectButtons('[data-lab-stage]', 'data-lab-stage', stage);
    setEditor(stage === 1 ? 'html' : stage === 2 ? 'css' : 'js');
    $('#lab-description').textContent = stageDescriptions[stage - 1];
    runLab();
  }
  function resetLab() {
    Object.entries(editors).forEach(([key, editor]) => { editor.value = data.example[key]; });
    setLabStage(1);
  }
  $$('[data-lab-stage]').forEach(button => button.addEventListener('click', () => setLabStage(Number(button.dataset.labStage))));
  $('#lab-run').addEventListener('click', runLab);
  $('#lab-reset').addEventListener('click', () => { resetLab(); toast('Exemplo original restaurado.'); });
  Object.values(editors).forEach(editor => editor.addEventListener('input', () => {
    $('#lab-status').classList.remove('has-error');
    $('#lab-status').textContent = 'Alterações pendentes. Clique em Executar.';
  }));
  window.addEventListener('message', event => {
    if (event.source !== $('#lab-preview').contentWindow || !event.data || event.data.kind !== 'workshop-error' || event.data.token !== labToken) return;
    $('#lab-status').textContent = 'Erro no exemplo: ' + String(event.data.message).slice(0, 230);
    $('#lab-status').classList.add('has-error');
  });
  resetLab();

  $$('[data-factory]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.factory);
    selectButtons('[data-factory]', 'data-factory', index);
    $('#factory-deliverable').textContent = 'ENTREGA: ' + data.factory[index].deliverable;
    $('#factory-text').textContent = data.factory[index].text;
  }));
  $$('[data-incident]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.incident);
    selectButtons('[data-incident]', 'data-incident', index);
    $('#incident-number').textContent = String(index + 1).padStart(2, '0');
    $('#incident-heading').textContent = data.incident[index].heading;
    $('#incident-text').textContent = data.incident[index].text;
  }));
  $$('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.scenario;
    selectButtons('[data-scenario]', 'data-scenario', value);
    $('#phishing-scenario').hidden = value !== 'phishing';
    $('#mfa-scenario').hidden = value !== 'mfa';
  }));
  const decisionFeedback = {
    'phishing-open': { target: 'phishing', good: false, text: 'A pressa aumenta o risco. A mensagem pede senha e código, usa um número desconhecido e ameaça bloquear a matrícula. Confirme com a escola por um canal oficial, sem abrir o link.' },
    'phishing-check': { target: 'phishing', good: true, text: 'Boa decisão. Procure a escola por um canal oficial conhecido. Urgência, pedido de senha e código e origem desconhecida são sinais de alerta. Um logotipo não comprova autenticidade.' },
    'mfa-approve': { target: 'mfa', good: false, text: 'Aprovar pode liberar o acesso de outra pessoa. Se você não iniciou o login, negue e revise a atividade da conta pelo serviço oficial. Foi uma lição central do caso da Uber.' },
    'mfa-deny': { target: 'mfa', good: true, text: 'Boa decisão. Negue a solicitação inesperada. Revise as sessões e a atividade da conta pelo canal oficial e proteja as credenciais se houver indícios de comprometimento.' }
  };
  $$('[data-decision]').forEach(button => button.addEventListener('click', () => {
    const feedback = decisionFeedback[button.dataset.decision];
    const target = $('#' + feedback.target + '-feedback');
    target.textContent = feedback.text;
    target.classList.toggle('good', feedback.good);
    target.classList.toggle('warning', !feedback.good);
    button.closest('.detective-actions').querySelectorAll('.decision-button').forEach(option => option.classList.toggle('selected', option === button));
  }));

  let selectedRole = 'visitante';
  $$('[data-role]').forEach(button => button.addEventListener('click', () => {
    selectedRole = button.dataset.role;
    selectButtons('[data-role]', 'data-role', selectedRole);
    $('#permission-status').textContent = 'Papel selecionado: ' + (selectedRole === 'editor' ? 'editor autorizado.' : 'visitante.') + ' Tente editar.';
  }));
  $('#permission-try').addEventListener('click', () => {
    $('#permission-status').textContent = logic.canEdit(selectedRole)
      ? 'Permitido nesta simulação: o papel de editor tem autorização. Em um sistema real, o servidor deve verificar essa permissão.'
      : 'Acesso negado nesta simulação: visitantes podem consultar, mas não alterar a programação.';
  });

  function setCareer(id) {
    const career = data.careers.find(item => item.id === id) || data.careers[0];
    selectButtons('[data-career]', 'data-career', career.id);
    const esc = logic.escapeHTML;
    $('#career-detail').innerHTML = '<span class="mini-label">' + esc(career.label.toUpperCase()) + '</span><h3>' + esc(career.question) + '</h3><p class="career-description">' + esc(career.description) + '</p><div class="career-example">' + esc(career.example) + '</div><div class="career-basics"><div><span class="mini-label">O QUE ESTUDAR</span><p>' + esc(career.skills) + '</p></div><div><span class="mini-label">UMA PRIMEIRA PRÁTICA</span><p>' + esc(career.start) + '</p></div></div>';
  }
  $('#career-menu').innerHTML = data.careers.map(career => '<button data-career="' + career.id + '" aria-pressed="false"><span>' + logic.escapeHTML(career.symbol) + '</span>' + logic.escapeHTML(career.label) + '</button>').join('');
  $$('[data-career]').forEach(button => button.addEventListener('click', () => setCareer(button.dataset.career)));
  setCareer(data.careers[0].id);

  let quizIndex = 0;
  let quizAnswers = Array(data.quiz.length).fill(null);
  let quizFinished = false;
  const quizHost = $('#quiz-content');
  const esc = logic.escapeHTML;

  function renderQuiz(focusQuestion = false) {
    if (quizFinished) { renderQuizResult(); return; }
    const question = data.quiz[quizIndex];
    const answer = quizAnswers[quizIndex];
    const answered = answer != null;
    const progress = data.quiz.map((_, index) => '<span class="' + (index <= quizIndex ? 'filled' : '') + '"></span>').join('');
    quizHost.innerHTML = '<div class="quiz-meta"><span>PERGUNTA ' + String(quizIndex + 1).padStart(2, '0') + ' / ' + String(data.quiz.length).padStart(2, '0') + '</span><span class="quiz-mini-progress" aria-hidden="true">' + progress + '</span></div><h3 class="quiz-question" tabindex="-1">' + esc(question.question) + '</h3><div class="quiz-options">' + question.options.map((option, index) => {
      const correct = answered && index === question.correct;
      const wrong = answered && index === answer && index !== question.correct;
      const state = correct ? ' <span class="answer-state">CORRETA ✓</span>' : wrong ? ' <span class="answer-state">SUA RESPOSTA</span>' : '';
      return '<button class="quiz-option' + (correct ? ' correct' : '') + (wrong ? ' wrong' : '') + '" data-answer="' + index + '"' + (answered ? ' disabled' : '') + '><span class="answer-letter">' + String.fromCharCode(65 + index) + '</span><span>' + esc(option) + '</span>' + state + '</button>';
    }).join('') + '</div><div class="quiz-feedback' + (!answered ? ' waiting' : '') + '" role="status">' + (answered ? '<strong>' + (answer === question.correct ? 'Isso mesmo. ' : 'Vamos entender. ') + '</strong>' + esc(question.explanation) : 'Conversem antes de escolher. A explicação aparece depois da resposta.') + '</div><div class="quiz-controls"><button class="text-link" data-quiz-previous' + (quizIndex === 0 ? ' disabled' : '') + '>← Pergunta anterior</button><button class="button primary" data-quiz-next' + (!answered ? ' disabled' : '') + '>' + (quizIndex === data.quiz.length - 1 ? 'Ver resultado' : 'Próxima pergunta') + ' <svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div>';
    $$('[data-answer]').forEach(button => button.addEventListener('click', () => {
      quizAnswers = logic.recordAnswer(quizAnswers, quizIndex, Number(button.dataset.answer), data.quiz);
      renderQuiz();
      $('[data-quiz-next]').focus({ preventScroll: true });
    }));
    $('[data-quiz-previous]').addEventListener('click', () => { quizIndex = Math.max(0, quizIndex - 1); renderQuiz(true); });
    $('[data-quiz-next]').addEventListener('click', () => {
      if (quizAnswers[quizIndex] == null) return;
      if (quizIndex === data.quiz.length - 1) quizFinished = true;
      else quizIndex += 1;
      renderQuiz(true);
    });
    if (focusQuestion) $('.quiz-question').focus({ preventScroll: true });
  }

  function renderQuizResult() {
    const score = logic.scoreQuiz(data.quiz, quizAnswers);
    quizHost.innerHTML = '<div class="quiz-result"><div class="quiz-score"><span class="mini-label">RESULTADO DA TURMA</span><strong>' + score + '<small> / ' + data.quiz.length + '</small></strong><h3>' + (score === data.quiz.length ? 'Conceitos conectados!' : 'Vamos continuar aprendendo.') + '</h3><p>O resultado ajuda a retomar a conversa. Usem as referências para praticar o que ficou mais difícil.</p></div><div><span class="mini-label">REVISÃO DAS RESPOSTAS</span><ol class="quiz-review">' + data.quiz.map((question, index) => '<li><span>' + (quizAnswers[index] === question.correct ? '✓' : '↺') + '</span><div>' + esc(question.question) + '<br><strong>' + esc(question.options[question.correct]) + '</strong>' + (quizAnswers[index] !== question.correct ? ' <a href="#' + question.review + '">Rever assunto</a>' : '') + '</div></li>').join('') + '</ol></div></div><div class="quiz-controls"><button class="text-link" data-quiz-restart>Recomeçar o quiz ↺</button><button class="button primary" data-quiz-review>Revisar explicações <svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div>';
    $('[data-quiz-restart]').addEventListener('click', () => { quizAnswers = Array(data.quiz.length).fill(null); quizIndex = 0; quizFinished = false; renderQuiz(true); });
    $('[data-quiz-review]').addEventListener('click', () => { quizFinished = false; quizIndex = 0; renderQuiz(true); });
  }
  renderQuiz();
  renderScene(logic.resolveIndex(location.hash, ids), false);
})();
