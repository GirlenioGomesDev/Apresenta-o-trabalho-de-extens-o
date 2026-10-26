const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const logic = require('../assets/logic.js');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/content.js'), 'utf8'), context);
const data = context.window.WorkshopData;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/<section class="scene[^>]* id="([^"]+)"/g)].map(match => match[1]);

test('links internos e notas cobrem todas as etapas, sem âncoras órfãs', () => {
  assert.equal(ids.length, 13);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(data.notes[id], 'Notas ausentes para ' + id);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (/^i-/.test(id) || id === 'conteudo') continue;
    assert.ok(ids.includes(id), 'Âncora inválida: ' + id);
  }
  for (const question of data.quiz) assert.ok(ids.includes(question.review));
});

test('navegação aceita links diretos e trata fragmentos inválidos', () => {
  assert.equal(logic.resolveIndex('#laboratorio', ids), ids.indexOf('laboratorio'));
  assert.equal(logic.resolveIndex('#inexistente', ids), 0);
  assert.equal(logic.resolveIndex('#%E0%A4%A', ids), 0);
  assert.equal(logic.clampIndex(-10, ids.length), 0);
  assert.equal(logic.clampIndex(1000, ids.length), ids.length - 1);
});

test('quiz bloqueia a primeira resposta e não duplica a pontuação', () => {
  const empty = Array(data.quiz.length).fill(null);
  const first = logic.recordAnswer(empty, 0, data.quiz[0].correct, data.quiz);
  const attempt = logic.recordAnswer(first, 0, (data.quiz[0].correct + 1) % 3, data.quiz);
  assert.equal(first, attempt);
  assert.equal(logic.scoreQuiz(data.quiz, attempt), 1);
  assert.equal(empty[0], null);
  assert.equal(logic.recordAnswer(empty, -1, 0, data.quiz), empty);
  assert.equal(logic.recordAnswer(empty, 0, 99, data.quiz), empty);
  const allCorrect = data.quiz.map(question => question.correct);
  assert.equal(logic.scoreQuiz(data.quiz, allCorrect), data.quiz.length);
});

test('toda pergunta tem uma resposta válida e uma explicação', () => {
  for (const question of data.quiz) {
    assert.ok(Number.isInteger(question.correct));
    assert.ok(question.options[question.correct]);
    assert.ok(question.explanation.length > 30);
  }
  assert.deepEqual(Array.from(data.careers, career => career.id), ['software', 'infra', 'dados', 'cyber']);
});

test('a sequência liga construção, funcionamento, proteção e profissões', () => {
  const flow = ['vida-digital', 'linguagens', 'laboratorio', 'por-tras-do-clique', 'codigo-seguro', 'detetive', 'carreiras', 'fabrica', 'quiz'];
  for (let index = 1; index < flow.length; index += 1) {
    assert.ok(ids.indexOf(flow[index - 1]) < ids.indexOf(flow[index]));
  }
  for (const section of html.matchAll(/<section class="scene[^>]*id="([^"]+)"[\s\S]*?<\/section>/g)) {
    if (section[1] !== 'laboratorio') assert.doesNotMatch(section[0], /<(?:pre|code|textarea)\b/);
  }
  assert.doesNotMatch(html, /feira|uber/i);
});

test('links do laboratório selecionam apenas camadas válidas e os dados são ilustrativos', () => {
  for (const [, stage] of html.matchAll(/data-lab-entry="([^"]+)"/g)) assert.ok([1, 2, 3].includes(Number(stage)));
  assert.equal(data.demand.reduce((sum, row) => sum + row.value, 0), 60);
  assert.ok(data.demand.every(row => Number.isInteger(row.value) && row.value >= 0));
  assert.deepEqual(Object.keys(data.starts), ['software', 'infra', 'dados', 'cyber']);
});

test('a regra ilustrativa de permissão nega papéis desconhecidos', () => {
  assert.equal(logic.canEdit('editor'), true);
  for (const role of ['visitante', 'admin', '', undefined]) assert.equal(logic.canEdit(role), false);
});

test('prévia inclui CSS e JavaScript somente nas etapas adequadas', () => {
  const common = { html: '<h1>Teste</h1>', css: 'h1{color:tomato}', js: 'window.demo = 42;', token: 'session-1' };
  const stage1 = logic.buildPreview({ ...common, stage: 1 });
  const stage2 = logic.buildPreview({ ...common, stage: 2 });
  const stage3 = logic.buildPreview({ ...common, stage: 3 });
  assert.ok(!stage1.includes(common.css));
  assert.ok(!stage1.includes(common.js));
  assert.ok(stage2.includes(common.css));
  assert.ok(!stage2.includes(common.js));
  assert.ok(stage3.includes(common.js));
  assert.ok(stage3.includes("connect-src 'none'"));
  assert.ok(stage3.includes("form-action 'none'"));
  assert.match(html, /sandbox="allow-scripts"/);
  assert.ok(!html.includes('allow-same-origin'));
});

test('texto do quiz é escapado e cronômetro suporta mais de uma hora', () => {
  assert.equal(logic.escapeHTML('<h1>"Olá"</h1>'), '&lt;h1&gt;&quot;Olá&quot;&lt;/h1&gt;');
  assert.equal(logic.formatTime(0), '00:00');
  assert.equal(logic.formatTime(59.9), '00:59');
  assert.equal(logic.formatTime(5400), '90:00');
  assert.equal(logic.formatTime(-2), '00:00');
});

test('a apresentação não depende de CDNs, fontes remotas ou bibliotecas externas', () => {
  assert.ok(!/<script[^>]+src="https?:/i.test(html));
  assert.ok(!/<link[^>]+href="https?:/i.test(html));
  for (const [, filename] of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) assert.ok(fs.existsSync(path.join(root, filename.split('?')[0])));
});
