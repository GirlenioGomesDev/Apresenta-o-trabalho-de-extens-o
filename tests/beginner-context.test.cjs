const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {enigma}=require('../assets/beginner-context-logic.js');
const root=path.resolve(__dirname,'..');
test('o recorte da Enigma I calcula duas sequências conhecidas na configuração AAA',()=>{
  assert.equal(enigma('AAAAA').output,'BDZGO');
  assert.equal(enigma('HELLOWORLD').output,'ILBDAAMTAZ');
  assert.deepEqual(enigma('AA').steps.map(s=>s.position),['AAB','AAC']);
});
test('a mesma configuração recupera a mensagem e uma posição inicial diferente muda a leitura',()=>{
  for(const start of ['AAA','AAB','ADV','ZZZ']){
    const message='OLATURMA',encoded=enigma(message,start);
    assert.equal(enigma(encoded.output,start).output,message);
    assert.ok(encoded.steps.every(s=>s.input!==s.output));
  }
  assert.notEqual(enigma('BDZGO','AAB').output,'AAAAA');
});
test('o avanço dos rotores inclui o passo duplo e execuções independentes começam no estado pedido',()=>{
  assert.deepEqual(enigma('AA','ADV').steps.map(s=>s.position),['AEW','BFX']);
  const a=enigma('A');a.steps[0].position='ZZZ';assert.equal(enigma('A').position,'AAB');
  assert.deepEqual(enigma(''),{output:'',position:'AAA',steps:[]});
});
test('a demonstração recusa entradas fora do alfabeto e configurações malformadas',()=>{
  for(const value of [null,42,'a','OLÁ','A B','<script>','A'.repeat(81)])assert.throws(()=>enigma(value));
  for(const start of ['A','AAAA','123',null])assert.throws(()=>enigma('A',start));
});
test('os contextos comparam situações do mesmo exemplo e apontam o que observar nas páginas existentes',()=>{
  const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/beginner-context-data.js'),'utf8'),sandbox);
  const scenes=sandbox.window.BeginnerContext.scenes,html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.ok(Object.keys(scenes).length>=40);
  for(const [id,item] of Object.entries(scenes)){
    assert.ok(html.includes('id="'+id+'"'),id);assert.equal(item.length,7,id);
    for(const text of item)assert.ok(typeof text==='string'&&text.trim().length>3,id);
    for(const index of [1,3,5,6])assert.ok(item[index].length>20,id);
    assert.notEqual(item[2],item[4],id);
  }
  for(const id of ['katherine-johnson','internet-pacotes','internet-dns','lab-html','lab-css-layout','laboratorio','infra-cabo','lab-dados-coleta','codigo-seguro'])assert.ok(scenes[id]);
});
