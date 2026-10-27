const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const logic=require('../assets/extension-logic.js'),qr=require('../assets/quiz-qr.js');
const root=path.resolve(__dirname,'..'),context={window:{}};
for(const f of ['content.js','course-data.js','extension-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',f),'utf8'),context);
const course=context.window.WorkshopCourse,data=context.window.WorkshopExtension,html=fs.readFileSync(path.join(root,'index.html'),'utf8');
test('os cinco capítulos seguem Web, carreiras e participação direta no quiz',()=>{
 const chapters=logic.groupedChapters(course);
 assert.deepEqual(Array.from(chapters,ch=>ch.number),['00','01','02','03','04']);
 assert.deepEqual(Array.from(chapters,ch=>ch.minutes),[4,69,24,22,1]);
 assert.equal(chapters.find(ch=>ch.id==='desafio').start,'quiz');
 assert.doesNotMatch(html,/data-chapter(?:-link)?="historia"|id="(?:fabrica|missao-final|internet-evolucao)"/);
 assert.match(html,/href="#quiz" data-chapter-link="desafio"/);
});
test('as faixas de quatro áreas continuam ligadas a cargos e fontes',()=>{
 const source=fs.readFileSync(path.join(root,'assets/career-clean.js'),'utf8');
 for(const [id,career] of Object.entries(data.careers)){
  assert.ok(html.includes('data-clean-career="'+id+'"'));
  for(const sample of career.salaries){assert.match(sample.job,/Júnior/);assert.ok(sample.high>=sample.low);assert.ok(sample.source.startsWith('https://www.roberthalf.com/'));}
 }
 assert.match(source,/O QUE É A ÁREA/);assert.match(source,/O QUE FAZ NO DIA A DIA/);assert.match(source,/ALGUNS CARGOS/);
 assert.equal(logic.salaryRange({low:6050,high:8750}),'6.050–8.750');assert.throws(()=>logic.salaryRange({low:10,high:1}));
});
test('a trajetória de Web mantém front-end e back-end antes de HTML, CSS e JavaScript',()=>{
 const ids=Array.from(course.scenes,s=>s.id);
 for(const [a,b] of [['web-na-tela','por-tras-do-clique'],['por-tras-do-clique','linguagens'],['lab-html-form','css-aparencia'],['lab-css-motion','logica-passos']])assert.ok(ids.indexOf(a)<ids.indexOf(b));
 assert.match(html,/Front-end[\s\S]*Back-end/);assert.match(html,/web-learning-trail/);
 assert.match(html,/data-quiz-src="competicao.html\?modo=host&amp;embutido=1"/);
});
test('o QR leva apenas à entrada da sala e não carrega credencial do apresentador',()=>{
 const url=qr.joinURL('https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/competicao.html?modo=host&token=segredo#velho','ABC234');
 assert.equal(url,'https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/competicao.html?sala=ABC234');
 for(const code of ['123','ABC000','<script>'])assert.throws(()=>qr.joinURL('https://example.test/',code));
 const ctx={};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/quiz-qr-vendor.js'),'utf8'),ctx);
 const svg=qr.svg(url,ctx.qrcodegen);assert.match(svg,/shape-rendering="crispEdges"/);assert.match(svg,/M4,4/);assert.match(svg,/fill="#fff"/);
});
