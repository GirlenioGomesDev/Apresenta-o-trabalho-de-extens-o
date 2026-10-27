const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const logic=require('../assets/history-stories-logic.js');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/history-stories-data.js'),'utf8'),context);
const data=context.window.WorkshopHistory;

test('a linha do tempo tem ordem crescente, contexto curto e fontes de cada marco',()=>{
  assert.equal(data.timeline.length,9);
  assert.deepEqual(Array.from(data.timeline,item=>item.sort),[1964,1969,1974,1983,1986,1989,1993,1995,2026]);
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const item of data.timeline){
    for(const field of ['why','how','today','before','after'])assert.ok(item[field]?.length>10);
    assert.ok(item.source.startsWith('https://'));
    if(item.lab)assert.ok(html.includes('id="'+item.lab+'"'));
  }
  assert.match(data.timeline.find(item=>item.year==='1969').today,/desativada em 1990/);
  assert.match(data.timeline.find(item=>item.year==='1993').how,/software da Web/);
});

test('as pessoas anteriores têm necessidade, contribuição e aplicação sem perder os nomes',()=>{
  assert.deepEqual(Object.keys(data.people),['paul-baran','donald-davies','vint-cerf','bob-kahn','paul-mockapetris','tim-berners-lee','hakon-wium-lie','grace-hopper','radia-perlman','katherine-johnson','alan-turing']);
  for(const person of Object.values(data.people)){
    for(const field of ['why','how','today']){assert.ok(person[field].length>20);assert.ok(person[field].split(/\s+/).length<=40);}
    assert.ok(person.source.startsWith('https://'));
    assert.ok(data.assets[person.photo]||person.portraitLink==='https://www.npl.co.uk/about-us/history/famous/donald-davies');
  }
  assert.match(data.people['alan-turing'].extra,/poloneses/);
  assert.match(data.people['alan-turing'].extra,/não venceu a guerra sozinho/);
  assert.match(data.people['katherine-johnson'].today,/Seu exemplo/);
});

test('fotografias são locais, completas e vinculadas ao crédito e à licença',()=>{
  assert.equal(Object.keys(data.assets).length,15);
  for(const asset of Object.values(data.assets)){
    assert.match(asset.src,/^assets\/history-[\w-]+\.jpg$/);
    const bytes=fs.readFileSync(path.join(root,asset.src));
    assert.ok(bytes.length>1000);assert.equal(bytes[0],0xff);assert.equal(bytes[1],0xd8);
    assert.ok(asset.width>0&&asset.height>0);assert.ok(asset.artist);assert.ok(asset.page.startsWith('https://commons.wikimedia.org/'));
    assert.ok(asset.license==='Public domain'||asset.licenseUrl.startsWith('https://creativecommons.org/')||asset.licenseUrl.startsWith('http://creativecommons.org/'));
  }
});

test('a fita executa uma regra por passo, para no limite e não altera o estado anterior',()=>{
  const start={cells:[0,1,0,1],head:0};let next=start;
  for(let i=0;i<4;i++)next=logic.tapeStep(next);
  assert.deepEqual(start,{cells:[0,1,0,1],head:0});assert.deepEqual(next,{cells:[1,0,1,0],head:4});
  assert.deepEqual(logic.tapeStep(next),next);
  for(const bad of [null,{cells:[],head:0},{cells:[2],head:0},{cells:[0],head:-1},{cells:[0],head:2}])assert.throws(()=>logic.tapeStep(bad));
});

test('cada pista elimina hipóteses incompatíveis sem ressuscitar as descartadas',()=>{
  const expected=[['H1','H2','H3','H4','H5','H6'],['H2','H4','H6'],['H4','H6'],['H4']];
  for(let i=0;i<4;i++)assert.deepEqual(logic.remainingHypotheses(i),expected[i]);
  const copy=logic.remainingHypotheses(0);copy.pop();assert.equal(logic.remainingHypotheses(0).length,6);
  for(const invalid of [-1,4,1.5,'1'])assert.throws(()=>logic.remainingHypotheses(invalid));
});
