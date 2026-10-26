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
    const previousId = current >= 0 ? scenes[current].id : null;
    current = safeIndex;
    scenes.forEach((scene, sceneIndex) => { scene.hidden = sceneIndex !== current; });
    const scene = scenes[current];
    if (scene.id === 'laboratorio') $('#lab-return').setAttribute('href', '#' + (previousId || 'linguagens'));
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
    window.dispatchEvent(new Event('workshop-scene-change'));
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
  $('#overview-list').innerHTML = window.WorkshopCourse.modules.map(module => '<section class="overview-module"><h3>' + logic.escapeHTML(module.title) + '<small>' + module.minutes + ' min</small></h3><div class="overview-module-links">' + scenes.filter(scene => scene.dataset.module === module.id).map(scene => '<a href="#' + scene.id + '"><span>' + String(ids.indexOf(scene.id) + 1).padStart(2, '0') + '</span>' + logic.escapeHTML(scene.dataset.title) + '<small>' + scene.dataset.minutes + ' min</small></a>').join('') + '</div></section>').join('');

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
    if (link.dataset.labEntry) setLabStage(Number(link.dataset.labEntry));
    if (link.dataset.careerEntry) setCareer(link.dataset.careerEntry);
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
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      if (scenes[current].id === 'laboratorio') { event.preventDefault(); runLab(); return; }
      const courseHost = scenes[current].querySelector('[data-course-lab]');
      if (courseHost && window.CourseLabs) { event.preventDefault(); window.CourseLabs.run(courseHost.dataset.courseLab); return; }
      const liveHost = scenes[current].querySelector('[data-live-lab]');
      if (liveHost && window.LiveLabs) { event.preventDefault(); window.LiveLabs.run(liveHost.dataset.liveLab); return; }
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
    $('#hero-message').textContent = heroClicks === 1 ? 'A página respondeu ao seu clique.' : 'Você já experimentou ' + heroClicks + ' interações.';
  });

  function setExperience(id) {
    const experience = data.experiences[id];
    selectButtons('[data-experience]', 'data-experience', id);
    $('#experience-title').textContent = experience.title;
    $('#experience-explanation').textContent = experience.text;
    $$('[data-experience-layer]').forEach(layer => layer.classList.toggle('active', experience.focus.includes(layer.dataset.experienceLayer)));
  }
  $$('[data-experience]').forEach(button => button.addEventListener('click', () => setExperience(button.dataset.experience)));
  setExperience('site');

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

  let layerClicks = 0;
  function setLanguage(language) {
    const content = data.languages[language];
    selectButtons('[data-language]', 'data-language', language);
    $('#language-heading').textContent = content.heading;
    $('#language-text').textContent = content.text;
    $('#layer-browser').dataset.layer = language;
    $('#layer-action').disabled = language !== 'js';
    $('#layer-message').textContent = '';
    const labLink = $('#language-lab-link');
    labLink.setAttribute('href', {html:'#lab-html',css:'#lab-css-layout',js:'#laboratorio'}[language]);
    if (language === 'js') labLink.dataset.labEntry = '3';
    else delete labLink.dataset.labEntry;
    layerClicks = 0;
    $('.layer-robot').style.setProperty('--energia', '0%');
  }
  $$('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  $('#layer-action').addEventListener('click', () => {
    layerClicks += 1;
    const energia = Math.min(100, layerClicks * 10);
    $('#layer-message').textContent = 'Energia: ' + energia + '%';
    $('.layer-robot').style.setProperty('--energia', energia + '%');
  });

  $$('[data-route-mode]').forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.routeMode;
    selectButtons('[data-route-mode]', 'data-route-mode', mode);
    $('#local-route').hidden = mode !== 'local';
    $('#server-route').hidden = mode !== 'servidor';
  }));

  $$('[data-safety]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.safety;
    const content = data.safety[value];
    selectButtons('[data-safety]', 'data-safety', value);
    $('#safety-symbol').textContent = content.symbol;
    $('#safety-heading').textContent = content.heading;
    $('#safety-text').textContent = content.text;
  }));

  let labStage = 1;
  let labToken = '';
  let labInputTimer;
  const editors = { html: $('#editor-html'), css: $('#editor-css'), js: $('#editor-js') };
  const stageDescriptions = [
    'Só HTML: o conteúdo já existe, ainda sem estilo ou interação.',
    'HTML + CSS: a mesma estrutura agora tem cores, tamanhos e organização.',
    'HTML + CSS + JavaScript: clique em “Dar energia” e acompanhe o console.'
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
    button.addEventListener('click', () => setLabStage({html:1, css:2, js:3}[button.dataset.editor]));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
      setLabStage({html:1, css:2, js:3}[buttons[next].dataset.editor]);
      setEditor(buttons[next].dataset.editor, true);
    });
  });

  function runLab() {
    clearTimeout(labInputTimer);
    labToken = String(Date.now()) + '-' + String(Math.random());
    $('#lab-status').classList.remove('has-error');
    $('#lab-status').textContent = 'Código aplicado. Etapa ' + labStage + ' de 3.';
    $('#web-console').replaceChildren();
    $('#lab-preview').srcdoc = logic.buildPreview({ html: editors.html.value, css: (data.exampleSupport.css || '') + '\n' + editors.css.value, js: editors.js.value + '\n' + (data.exampleSupport.js || ''), stage: labStage, token: labToken });
  }
  function setLabStage(stage) {
    labStage = stage;
    selectButtons('[data-lab-stage]', 'data-lab-stage', stage);
    setEditor(stage === 1 ? 'html' : stage === 2 ? 'css' : 'js');
    $('#lab-description').textContent = stageDescriptions[stage - 1];
    const lesson = data.webLessons[stage - 1];
    $('#web-lesson-label').textContent = lesson.label;
    $('#web-lesson-description').textContent = lesson.text;
    $('#web-change-button').textContent = lesson.preset;
    runLab();
  }
  function resetLab() {
    Object.entries(editors).forEach(([key, editor]) => { editor.value = data.example[key]; });
    setLabStage(1);
  }
  $$('[data-lab-stage]').forEach(button => button.addEventListener('click', () => setLabStage(Number(button.dataset.labStage))));
  $('#lab-run').addEventListener('click', runLab);
  $('#lab-reset').addEventListener('click', () => { resetLab(); toast('Exemplo original restaurado.'); });
  $('#lab-auto').addEventListener('change', event => {
    clearTimeout(labInputTimer);
    if (event.target.checked) runLab();
    else $('#lab-status').textContent = 'Atualização pausada. Execute quando quiser aplicar as mudanças.';
  });
  $('#web-change-button').addEventListener('click', () => {
    if (labStage === 1) editors.html.value = editors.html.value.replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/i, '$1Vocês já criam tecnologia!$2');
    if (labStage === 2) editors.css.value = editors.css.value.replace(/--cor\s*:\s*[^;\n}]+/, '--cor: #c5adff');
    if (labStage === 3) editors.js.value = editors.js.value.replace(/const ganho\s*=\s*[^;\n]+/, 'const ganho = 50');
    runLab();
  });
  Object.values(editors).forEach(editor => editor.addEventListener('input', () => {
    clearTimeout(labInputTimer);
    $('#lab-status').classList.remove('has-error');
    $('#lab-status').textContent = $('#lab-auto').checked ? 'Aplicando alteração…' : 'Alterações pendentes. Clique em Executar.';
    if ($('#lab-auto').checked) labInputTimer = setTimeout(runLab, 350);
  }));
  window.addEventListener('message', event => {
    if (event.source !== $('#lab-preview').contentWindow || !event.data || event.data.token !== labToken) return;
    const error = event.data.kind === 'workshop-error';
    if (!error && event.data.kind !== 'workshop-console') return;
    const line = document.createElement('div');
    line.className = 'console-entry ' + (error ? 'error' : ['error','warn'].includes(event.data.level) ? event.data.level : 'log');
    line.textContent = (error ? '× ' : '› ') + String(event.data.message).slice(0, 600);
    const consoleHost = $('#web-console');
    consoleHost.appendChild(line);
    while (consoleHost.children.length > 30) consoleHost.firstElementChild.remove();
    consoleHost.scrollTop = consoleHost.scrollHeight;
    if (error) {
      $('#lab-status').textContent = 'Erro no exemplo: ' + String(event.data.message).slice(0, 230);
      $('#lab-status').classList.add('has-error');
    }
  });
  resetLab();

  $$('[data-factory]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.factory);
    const item = data.factory[index];
    selectButtons('[data-factory]', 'data-factory', index);
    $('#factory-deliverable').textContent = item.deliverable;
    $('#factory-text').textContent = item.text;
    $('#factory-career-link').dataset.careerEntry = item.career;
    $('#factory-career-link').setAttribute('href', '#lab-' + item.career);
    $$('[data-team]').forEach(label => label.classList.toggle('active', label.dataset.team === item.career));
  }));
  $$('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.scenario;
    selectButtons('[data-scenario]', 'data-scenario', value);
    $('#phishing-scenario').hidden = value !== 'phishing';
    $('#mfa-scenario').hidden = value !== 'mfa';
  }));
  const decisionFeedback = {
    'phishing-open': { target: 'phishing', good: false, text: 'A pressa aumenta o risco. A mensagem pede senha e código, usa um número desconhecido e ameaça suspender a conta. Confirme pelo aplicativo ou site oficial, sem abrir o link.' },
    'phishing-check': { target: 'phishing', good: true, text: 'Boa decisão. Procure o serviço pelo aplicativo ou site oficial. Urgência, pedido de senha e código e origem desconhecida são sinais de alerta. Um logotipo não comprova autenticidade.' },
    'mfa-approve': { target: 'mfa', good: false, text: 'Aprovar pode liberar o acesso de outra pessoa. Se você não iniciou o login, negue e revise a atividade da conta pelo serviço oficial.' },
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
    $('#permission-status').textContent = 'Papel selecionado: ' + (selectedRole === 'editor' ? 'editor autorizado.' : 'visitante.') + ' Tente editar o conteúdo.';
  }));
  $('#permission-try').addEventListener('click', () => {
    $('#permission-status').textContent = logic.canEdit(selectedRole)
      ? 'Permitido nesta simulação: o papel de editor tem autorização. Em um sistema real, o servidor deve verificar essa permissão.'
      : 'Acesso negado nesta simulação: visitantes podem consultar, mas não alterar o conteúdo.';
  });

  function setCareer(id) {
    $$('[data-career-card]').forEach(card => card.classList.toggle('active', card.dataset.careerCard === id));
  }

  function setStart(id) {
    const item = data.starts[id];
    selectButtons('[data-start]', 'data-start', id);
    $('#start-area').textContent = item.area;
    $('#start-heading').textContent = item.heading;
    $('#start-text').textContent = item.text;
    const action = $('#start-action');
    action.setAttribute('href', item.href);
    action.innerHTML = logic.escapeHTML(item.action) + ' <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    delete action.dataset.labEntry;
    delete action.dataset.careerEntry;
    if (id === 'software') action.dataset.labEntry = '3';
    else if (item.href === '#carreiras') action.dataset.careerEntry = id;
  }
  $$('[data-start]').forEach(button => button.addEventListener('click', () => setStart(button.dataset.start)));

  let quizIndex = 0;
  let quizAnswers = Array(data.quiz.length).fill(null);
  let quizFinished = false;
  const quizHost = $('#quiz-content');
  const esc = logic.escapeHTML;
  const quizPicker = $('#quiz-question-picker');
  quizPicker.innerHTML = data.quiz.map((question,index) => '<option value="' + index + '">' + String(index + 1).padStart(2,'0') + '. ' + esc(question.question) + '</option>').join('');
  quizPicker.addEventListener('change', () => { quizIndex = Number(quizPicker.value); quizFinished = false; renderQuiz(true); });
  const participationPrompts = {
    voluntario: 'Alguém quer responder? O que fez você escolher essa alternativa?',
    convite: 'Posso convidar você para responder? Pode passar a vez. Qual pista ajudou na sua escolha?',
    dupla: 'Conversem em dupla por alguns instantes. Quem quer compartilhar a resposta e o motivo?'
  };
  $$('[data-participation]').forEach(button => button.addEventListener('click', () => {
    selectButtons('[data-participation]','data-participation',button.dataset.participation);
    $('#participation-prompt').textContent = participationPrompts[button.dataset.participation];
  }));

  function renderQuiz(focusQuestion = false) {
    if (quizFinished) { renderQuizResult(); return; }
    quizPicker.value = String(quizIndex);
    const question = data.quiz[quizIndex];
    const answer = quizAnswers[quizIndex];
    const answered = answer != null;
    const allAnswered = quizAnswers.every(answer => answer != null);
    const progress = data.quiz.map((_, index) => '<span class="' + (quizAnswers[index] != null ? 'filled' : '') + '"></span>').join('');
    quizHost.innerHTML = '<div class="quiz-meta"><span>PERGUNTA ' + String(quizIndex + 1).padStart(2, '0') + ' / ' + String(data.quiz.length).padStart(2, '0') + '</span><span class="quiz-mini-progress" aria-hidden="true">' + progress + '</span></div><h3 class="quiz-question" tabindex="-1">' + esc(question.question) + '</h3><div class="quiz-options">' + question.options.map((option, index) => {
      const correct = answered && index === question.correct;
      const wrong = answered && index === answer && index !== question.correct;
      const state = correct ? ' <span class="answer-state">CORRETA ✓</span>' : wrong ? ' <span class="answer-state">SUA RESPOSTA</span>' : '';
      return '<button class="quiz-option' + (correct ? ' correct' : '') + (wrong ? ' wrong' : '') + '" data-answer="' + index + '"' + (answered ? ' disabled' : '') + '><span class="answer-letter">' + String.fromCharCode(65 + index) + '</span><span>' + esc(option) + '</span>' + state + '</button>';
    }).join('') + '</div><div class="quiz-feedback' + (!answered ? ' waiting' : '') + '" role="status">' + (answered ? '<strong>' + (answer === question.correct ? 'Isso mesmo. ' : 'Vamos entender. ') + '</strong>' + esc(question.explanation) : 'Conversem antes de escolher. A explicação aparece depois da resposta.') + '</div><div class="quiz-controls"><button class="text-link" data-quiz-previous' + (quizIndex === 0 ? ' disabled' : '') + '>← Pergunta anterior</button><button class="button primary" data-quiz-next' + (!answered ? ' disabled' : '') + '>' + (allAnswered ? 'Ver resultado' : 'Próxima pergunta') + ' <svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div>';
    $$('[data-answer]').forEach(button => button.addEventListener('click', () => {
      quizAnswers = logic.recordAnswer(quizAnswers, quizIndex, Number(button.dataset.answer), data.quiz);
      renderQuiz();
      $('[data-quiz-next]').focus({ preventScroll: true });
    }));
    $('[data-quiz-previous]').addEventListener('click', () => { quizIndex = Math.max(0, quizIndex - 1); renderQuiz(true); });
    $('[data-quiz-next]').addEventListener('click', () => {
      if (quizAnswers[quizIndex] == null) return;
      if (quizAnswers.every(answer => answer != null)) quizFinished = true;
      else if (quizIndex === data.quiz.length - 1) quizIndex = quizAnswers.findIndex(answer => answer == null);
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
