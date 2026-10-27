const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),context={window:{}};
for(const file of ['content.js','course-data.js','history-stories-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),context);
const course=context.window.WorkshopCourse;
test('as histórias, pessoas, casos reais e demonstrações retornam à apresentação ativa',()=>{
 for(const id of ['internet-evolucao','internet-pacotes','internet-protocolos','internet-dns','origem-web','css-historia','grace-hopper','radia-perlman','katherine-johnson','alan-turing','caso-ariane','caso-gitlab','caso-wannacry','lab-software','lab-software-testes','infra-cabo','infra-caminho','lab-infra-missao','lab-dados','dados-pergunta','lab-dados-coleta','dados-vies','lab-cyber','codigo-seguro','lab-cyber-regras','detetive','cyber-investiga'])assert.ok(course.scenes.some(s=>s.id===id),'Conteúdo ausente: '+id);
 assert.equal(Object.keys(context.window.WorkshopHistory.people).length,11);assert.equal(Object.keys(context.window.WorkshopHistory.assets).length,15);
 for(const script of ['extension.js','history-stories-data.js','history-stories-logic.js','history-stories.js','reading-guide.js'])assert.ok(html.includes('assets/'+script));
});
test('o quiz com QR substitui o seletor antigo sem retirar as práticas das áreas',()=>{
 assert.doesNotMatch(html,/quiz-question-picker|data-choice-answer|id="(?:fabrica|missao-final)"/);
 assert.match(html,/quiz-competition-frame/);assert.match(html,/href="#quiz" data-chapter-link="desafio"/);
 const labs=fs.readFileSync(path.join(root,'assets/course-labs.js'),'utf8');assert.match(labs,/experiment-orientation/);assert.doesNotMatch(labs,/class="predict-ribbon"/);
 for(const id of ['cable-test','network-connected','data-extreme','axis-toggle','cyber-gate-try','access-owner-rule','turing-tape-next','turing-clue-next'])assert.ok(html.includes('id="'+id+'"'),'Prática ausente: '+id);
});
