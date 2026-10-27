const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const logic = require('../assets/logic.js');
const engine = require('../assets/lab-engine.js');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/content.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/lab-content.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/course-data.js'), 'utf8'), context);
const data = context.window.WorkshopData;
const lessons = context.window.LiveLabLessons;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/<section class="scene[^>]* id="([^"]+)"/g)].map(match => match[1]);

test('links internos e notas cobrem todas as etapas, sem âncoras órfãs', () => {
  assert.equal(ids.length, 55);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(data.notes[id], 'Notas ausentes para ' + id);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (/^i-/.test(id) || id === 'conteudo') continue;
    assert.ok(ids.includes(id), 'Âncora inválida: ' + id);
  }

});

test('navegação aceita links diretos e trata fragmentos inválidos', () => {
  assert.equal(logic.resolveIndex('#laboratorio', ids), ids.indexOf('laboratorio'));
  assert.equal(logic.resolveIndex('#inexistente', ids), 0);
  assert.equal(logic.resolveIndex('#%E0%A4%A', ids), 0);
  assert.equal(logic.clampIndex(-10, ids.length), 0);
  assert.equal(logic.clampIndex(1000, ids.length), ids.length - 1);
});

test('as quatro áreas continuam identificadas no conteúdo de apoio',()=>{
 assert.deepEqual(Array.from(data.careers,career=>career.id),['software','infra','dados','cyber']);
});

test('a sequência liga construção, funcionamento, proteção e profissões', () => {
  const flow = ['vida-digital','alan-turing','grace-hopper','katherine-johnson','internet-pacotes','internet-evolucao','internet-protocolos','internet-dns','radia-perlman','historia-nsfnet','origem-web','css-historia','historia-expansao','caso-ariane','caso-gitlab','caso-wannacry','web-na-tela','por-tras-do-clique','linguagens','html-estrutura','lab-html','css-caixa','lab-css-layout','logica-passos','logica-decisoes','laboratorio','carreiras','lab-software','infra-cabo','lab-dados','lab-cyber','quiz'];
  for (let index = 1; index < flow.length; index += 1) {
    assert.ok(ids.indexOf(flow[index - 1]) < ids.indexOf(flow[index]));
  }
  for (const section of html.matchAll(/<section class="scene[^>]*id="([^"]+)"[\s\S]*?<\/section>/g)) {
    if (section[1] !== 'laboratorio' && !section[1].startsWith('lab-')) assert.doesNotMatch(section[0], /<(?:pre|code|textarea)\b/);
  }
  assert.doesNotMatch(html, /feira|uber/i);
});

test('links do laboratório selecionam apenas camadas válidas e os dados são ilustrativos', () => {
  for (const [, stage] of html.matchAll(/data-lab-entry="([^"]+)"/g)) assert.ok([1, 2, 3].includes(Number(stage)));
  assert.deepEqual(Object.keys(lessons), ['software']);

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
  assert.ok(stage3.includes('workshop-console'));
  assert.match(html, /sandbox="allow-scripts"/);
  assert.ok(!html.includes('allow-same-origin'));
});

function execute(code, input) {
  const results = [];
  const sandbox = { self: { postMessage: result => results.push(result) } };
  vm.runInNewContext('(' + engine.workerMain.toString() + ')()', sandbox);
  sandbox.self.onmessage({ data: { code, input } });
  return JSON.parse(JSON.stringify(results[0]));
}

test('o código editável de software recalcula o placar e emite console.log', () => {
  const original = execute(lessons.software.code, { estrelas: 3 });
  assert.equal(original.output.pontos, 30);
  assert.equal(original.logs[0].text, 'Placar: 30');
  const edited = execute(lessons.software.code.replace('* 10', '* 50'), { estrelas: 3 });
  assert.equal(edited.output.pontos, 150);
});

test('erros de edição são devolvidos, e o visual só aceita o contrato esperado', () => {
  assert.equal(execute('const quebrado = ;',{}).ok,false);
  assert.match(execute('console.log("olá")',{}).error,/mostrar/);
  assert.equal(execute('console.log(undefined); mostrar({pontos:1})',{}).logs[0].text,'undefined');
  for (const id of Object.keys(lessons)) assert.doesNotThrow(()=>engine.validateOutput(id,execute(lessons[id].code,lessons[id].input).output));
  assert.throws(()=>engine.validateOutput('software',{pontos:Infinity}));
  assert.throws(()=>engine.validateOutput('dados',{valores:[1,-1,2],total:2}));
  assert.throws(()=>engine.validateOutput('cyber',{permitido:'true'}));
  assert.throws(()=>engine.validateOutput('infra',{status:'<script>'}));
  const runner=engine.buildRunnerDocument('</script><script>alert(1)</script>');
  assert.ok(runner.includes("worker-src blob:"));
  assert.ok(runner.includes("connect-src 'none'"));
  assert.ok(!runner.includes('allow-same-origin'));
  assert.equal((runner.match(/<\/script>/g)||[]).length,1);
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
