(function(){
  'use strict';
  const data=window.WorkshopHistory,logic=window.WorkshopHistoryLogic;
  const $=(selector,root=document)=>root.querySelector(selector),$$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const link=(url,text)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(text)+' ↗</a>';
  function photo(key,caption,portrait=false){
    const asset=data.assets[key];if(!asset)return '';
    return '<figure class="history-photo '+(portrait?'history-portrait':'history-machine')+'"><button type="button" data-history-photo="'+esc(key)+'" aria-label="Ampliar foto: '+esc(caption)+'"><img src="'+esc(asset.src)+'" alt="'+esc(caption)+'" width="'+asset.width+'" height="'+asset.height+'" loading="lazy" decoding="async"><span aria-hidden="true">↗</span></button><figcaption><span>'+esc(caption)+'</span><details><summary>Crédito da foto</summary><p>'+link(asset.page,asset.artist||'Acervo Wikimedia Commons')+' · '+(asset.licenseUrl?link(asset.licenseUrl,asset.license==='Public domain'?'Domínio público':asset.license):esc(asset.license==='Public domain'?'Domínio público':asset.license))+'. '+esc(asset.changes)+'</p></details></figcaption></figure>';
  }
  function context(person,small=false){
    return '<dl class="history-context '+(small?'history-person-context':'')+'">'+[['POR QUE FOI NECESSÁRIO?',person.why],['COMO SURGIU?',person.how],['ONDE APARECE HOJE?',person.today]].map(([label,text])=>'<div><dt>'+label+'</dt><dd>'+esc(text)+'</dd></div>').join('')+'</dl>';
  }
  Object.values(data.people).forEach(person=>{
    const scene=$('#'+person.scene);if(!scene)return;
    const host=$('.history-person',scene);
    if(host){
      $('.history-initials',host)?.remove();host.insertAdjacentHTML('afterbegin',photo(person.photo,person.name,true));
      const explanation=$('.history-explanation',scene),first=$(':scope > p',explanation);
      if(first)first.outerHTML=context(person);
      if(person.extra)explanation.insertAdjacentHTML('beforeend','<p class="history-brief-credit">'+esc(person.extra)+' '+link(person.extraSource,'Fonte')+'</p>');
    }else{
      const article=$$('.internet-people article',scene).find(article=>$('h3',article)?.textContent===person.name);if(!article)return;
      if(data.assets[person.photo]){$('.internet-person-initials',article)?.remove();article.insertAdjacentHTML('afterbegin',photo(person.photo,person.photoNote||person.name,true));}
      const paragraph=$('article > div > p',article);if(paragraph)paragraph.outerHTML=context(person,true);
      if(person.portraitLink)$('article > div',article).insertAdjacentHTML('beforeend','<span class="history-portrait-link">'+link(person.portraitLink,'Ver retrato de Davies no NPL')+'</span>');
      $('.internet-contribution',scene).classList.add('history-expanded');
    }
  });
  $('#origem-web .history-explanation').insertAdjacentHTML('beforeend',photo('next-web-server','NeXT usado como primeiro servidor da Web; fotografado em exposição.'));
  $('#grace-hopper .history-explanation').insertAdjacentHTML('beforeend',photo('univac-team','Grace Hopper e integrantes da equipe da UNIVAC.'));
  $('#radia-perlman .history-explanation').insertAdjacentHTML('beforeend','<p class="history-brief-credit">'+link(data.people['radia-perlman'].source,'Slides da própria Radia: redes e spanning tree')+'</p>');

  $('#internet-brief-credits').innerHTML=data.briefCredits.map(person=>'<p><b>'+esc(person.name)+'</b> '+esc(person.text)+' '+link(person.source,'Fonte')+'</p>').join('');
  let selected=1,after=false;
  function nodes(items,connected){return '<div class="evolution-nodes '+(connected?'is-connected':'')+'">'+items.map((item,index)=>'<span style="--node:'+index+'"><i aria-hidden="true">▱</i><b>'+esc(item)+'</b></span>').join('')+'</div>';}
  function diagram(item,phase=after){
    switch(item.kind){
      case 'packets':return phase?'<div class="evolution-packets"><span>1 · OLÁ</span><span>2 · TUR</span><span>3 · MA!</span></div>':'<div class="evolution-whole">OLÁ, TURMA!</div>';
      case 'arpanet':return nodes(['UCLA','SRI','UCSB','Utah'],phase);
      case 'protocol':return '<div class="evolution-protocol"><span>Rede por cabo</span><b>'+(phase?'TCP/IP ↔':'?')+'</b><span>Rede por rádio</span></div>';
      case 'dns':return phase?'<div class="evolution-dns"><span>escola.test</span><b>↓ raiz → .test → responsável</b><strong>192.0.2.10</strong></div>':'<div class="evolution-dns"><span>HOSTS.TXT</span><b>Uma lista central de nomes</b><strong>escola → endereço</strong></div>';
      case 'nsfnet':return nodes(phase?['Centro de pesquisa','Universidade A','Universidade B','Universidade C']:['Centro de pesquisa','Universidade A'],phase);
      case 'web':return '<div class="evolution-documents"><span>Documento A</span><b>'+(phase?'→':'·')+'</b><span>Documento B</span><b>'+(phase?'→':'·')+'</b><span>Documento C</span></div>';
      case 'openweb':return nodes(phase?['Publicar','Navegar','Criar']:['Software da Web'],phase);
      case 'providers':return nodes(phase?['Pesquisa','Provedor','Escola','Casa','Empresa']:['Pesquisa','Universidade'],phase);
      default:return nodes(phase?['Seu aparelho','Pacotes + IP','DNS','Serviço Web']:['Conectar','Localizar','Abrir','Interagir'],phase);
    }
  }
  function showMilestone(){
    const item=data.timeline[selected];
    $('#internet-milestone-date').textContent=item.year;$('#internet-milestone-title').textContent=item.title;
    $('#internet-milestone-context').innerHTML=context(item);
    $('#internet-milestone-source').innerHTML=link(item.source,'Fonte deste marco')+(item.lab?' · <a href="#'+item.lab+'">Explorar no laboratório ↗</a>':'');
    showDiagram();
  }
  function showDiagram(){
    const item=data.timeline[selected];
    $('#internet-milestone-visual').innerHTML=diagram(item);
    $('#internet-milestone-visual').dataset.phase=after?'after':'before';
    $('#internet-milestone-caption').textContent=(after?'DEPOIS · ':'ANTES · ')+(after?item.after:item.before);
    $('#internet-milestone-toggle').textContent=after?'Comparar com antes ↺':'Mostrar a mudança →';
    $('#internet-milestone-toggle').setAttribute('aria-pressed',String(after));
    const machine=selected===1?['arpanet-imp','IMP da ARPANET, preservado em museu. Encaminhava pacotes entre computadores.']:selected===5||selected===6?['next-web-server','NeXT usado como primeiro servidor da Web; em exposição.']:null;
    $('#internet-milestone-photo').innerHTML=machine?photo(...machine):'';
  }
  $('#internet-milestone-toggle').addEventListener('click',()=>{after=!after;showDiagram();});

  showMilestone();

  $$('[data-history-milestone]').forEach(host=>{
    const item=data.timeline[Number(host.dataset.historyMilestone)];
    host.innerHTML='<div class="historical-milestone-context">'+context(item)+'<p class="milestone-source">'+link(item.source,'Fonte deste marco')+'</p></div><div class="historical-comparison"><article><span class="mini-label">ANTES</span>'+diagram(item,false)+'<p>'+esc(item.before)+'</p></article><article><span class="mini-label">DEPOIS</span>'+diagram(item,true)+'<p>'+esc(item.after)+'</p></article></div>';
  });

  $('#turing-portrait').innerHTML=photo('alan-turing','Alan Turing, retratado em 1951.',true);
  $('#turing-context').innerHTML=context(data.people['alan-turing']);
  $('#turing-machines').innerHTML=photo('enigma','Enigma: máquina usada para cifrar mensagens.')+photo('bombe-reconstruction','Reconstrução da Bombe: máquina eletromecânica usada para investigar configurações da Enigma.');
  $('#turing-team').innerHTML=esc(data.people['alan-turing'].extra)+' '+link(data.people['alan-turing'].extraSource,'Contribuição polonesa');
  let tape={cells:[0,1,0,1],head:0},clueCount=0;
  function showTape(){
    $('#turing-tape').innerHTML=tape.cells.map((bit,index)=>'<span'+(index===tape.head?' class="tape-head" aria-label="Posição atual: '+bit+'"':'')+'>'+bit+'</span>').join('');
    $('#turing-tape-feedback').textContent=tape.head===tape.cells.length?'Fim da fita deste exemplo. A mesma regra transformou 0101 em 1010.':'Posição '+(tape.head+1)+': ler '+tape.cells[tape.head]+', escrever '+(1-tape.cells[tape.head])+', mover uma casa para a direita.';
    $('#turing-tape-next').disabled=tape.head===tape.cells.length;
  }
  $('#turing-tape-next').addEventListener('click',()=>{tape=logic.tapeStep(tape);showTape();});
  $('#turing-tape-reset').addEventListener('click',()=>{tape={cells:[0,1,0,1],head:0};showTape();});showTape();
  function showHypotheses(){
    const remaining=logic.remainingHypotheses(clueCount);
    $('#turing-hypotheses').innerHTML=logic.hypothesisReadings().map(({name,text})=>{const valid=remaining.includes(name);return '<span class="'+(valid?'candidate-remains':'candidate-rejected')+'"><b>'+name+'</b><em>'+Array.from(text,(letter,index)=>'<i'+(index<clueCount?' class="'+(letter==='BAC'[index]?'letter-match':'letter-mismatch')+'"':'')+'>'+letter+'</i>').join('')+'</em><small>'+(valid?'Compatível':'Eliminada')+'</small></span>';}).join('');
    $('#turing-expected-text').textContent='BAC'.slice(0,clueCount)+'?'.repeat(3-clueCount);
    const messages=['Cada hipótese produz uma leitura fictícia. A cada pista, compare a posição revelada com as letras abaixo.','Pista 1: a primeira letra esperada é B. H1, H3 e H5 não combinam.','Pista 2: a segunda letra é A. H2 tem C nessa posição e também sai.','Pista 3: a terceira letra é C. H6 tem B. Só H4 combina com o trecho BAC neste exemplo.'];
    $('#turing-hypotheses-feedback').textContent=messages[clueCount];$('#turing-clue-next').disabled=clueCount===3;
  }
  $('#turing-clue-next').addEventListener('click',()=>{if(clueCount<3){clueCount++;showHypotheses();}});
  $('#turing-clue-reset').addEventListener('click',()=>{clueCount=0;showHypotheses();});showHypotheses();
  $$('[data-turing-mode]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-turing-mode]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    $$('[data-turing-panel]').forEach(panel=>{panel.hidden=panel.dataset.turingPanel!==button.dataset.turingMode;});
  }));

  const dialog=$('#history-photo-dialog');
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-history-photo]');if(!button)return;
    const asset=data.assets[button.dataset.historyPhoto];if(!asset)return;
    $('#history-photo-title').textContent=button.querySelector('img').alt;
    $('#history-photo-large').src=asset.src;$('#history-photo-large').alt=button.querySelector('img').alt;
    $('#history-photo-credit').innerHTML=link(asset.page,asset.artist||'Acervo Wikimedia Commons')+' · '+(asset.licenseUrl?link(asset.licenseUrl,asset.license==='Public domain'?'Domínio público':asset.license):esc(asset.license==='Public domain'?'Domínio público':asset.license))+'. '+esc(asset.changes);
    dialog.showModal();
  });
})();
