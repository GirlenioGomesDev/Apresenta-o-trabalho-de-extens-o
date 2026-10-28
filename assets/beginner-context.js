(function(){
  'use strict';
  const data=window.BeginnerContext,logic=window.BeginnerContextLogic;
  const $=(selector,root=document)=>root.querySelector(selector);
  const esc=window.WorkshopLogic.escapeHTML;
  function comparison(a,b,c,d){return '<div class="context-comparison"><article><span class="context-label">ANTES / SITUAÇÃO INICIAL</span><h4>'+esc(a)+'</h4><p>'+esc(b)+'</p></article><article><span class="context-label">DEPOIS / O QUE MUDA</span><h4>'+esc(c)+'</h4><p>'+esc(d)+'</p></article></div>';}
  for(const [id,item] of Object.entries(data.scenes)){
    const scene=$('#'+id);if(!scene)continue;
    const box=document.createElement('div');box.className='lesson-context';
    box.innerHTML='<span class="mini-label">CONTEXTO EM UM EXEMPLO</span><h3>'+esc(item[0])+'</h3><p>'+esc(item[1])+'</p>'+comparison(...item.slice(2,6))+'<p class="context-observe"><b>Na demonstração:</b> '+esc(item[6])+'</p>';
    const anchor=$(':scope>.chronology-stamp',scene)||$(':scope>.course-lead,:scope>.lead',scene)||$(':scope>.scene-title',scene)||$(':scope>.scene-heading-row',scene);
    if(anchor)anchor.after(box);
  }

  const enigma=document.createElement('div');enigma.className='enigma-context';
  enigma.innerHTML='<span class="mini-label">VEJA A ENIGMA FUNCIONAR</span><h3>A mesma tecla pode virar outra letra.</h3><p>A Enigma escondia mensagens trocando letras. Ao digitar, as rodas internas, chamadas <b>rotores</b>, se moviam e uma lâmpada indicava a letra cifrada para anotar.</p><div class="enigma-path"><article><span class="context-label">1 · TECLA</span><strong data-enigma-key>—</strong><p>Pressione A cinco vezes.</p></article><article><span class="context-label">2 · ROTORES</span><div class="enigma-wheels" data-enigma-wheels aria-label="Posição dos três rotores"><b>A</b><b>A</b><b>A</b></div><p>As rodas mudam o caminho elétrico.</p></article><article><span class="context-label">3 · LÂMPADA</span><strong class="enigma-lamp" data-enigma-lamp>—</strong><p>Anote a letra que acendeu.</p></article></div><div class="context-controls"><button type="button" class="button primary" id="enigma-step">Digitar A →</button><button type="button" class="button secondary" id="enigma-reset">Recomeçar ↺</button></div><div class="enigma-messages"><p><span>VOCÊ DIGITOU</span><output id="enigma-input">Nenhuma letra ainda.</output></p><p><span>MENSAGEM CIFRADA PARA ENVIAR</span><output id="enigma-output">Aguardando uma tecla.</output></p></div><p id="enigma-feedback" class="context-observe" role="status">Começamos em AAA. Digite A e observe as rodas e a lâmpada.</p><p>Uma pessoa transmitia as letras cifradas pelo rádio. Para recuperar a mensagem, a máquina receptora precisava das mesmas configurações e posição inicial.</p><div class="enigma-receiver"><label for="enigma-start">Posição inicial da receptora<select id="enigma-start"><option value="AAA">AAA · igual à usada no envio</option><option value="AAB">AAB · diferente da usada no envio</option></select></label><button type="button" class="button secondary" id="enigma-read" disabled>Reiniciar receptora e decifrar →</button><p id="enigma-readout" role="status">Envie pelo menos uma letra para comparar.</p></div><p class="context-observe"><b>E a equipe de Turing?</b> Usava pistas e a Bombe para descartar configurações. No laboratório abaixo, teste uma regra de 1936 ou uma analogia dessa investigação de 1940.</p><details class="context-details"><summary>Configuração do exemplo e fontes</summary><p>Fiação histórica dos rotores I–II–III, refletor B, anéis AAA e sem pares de cabos. A emissora começa em AAA. Este recorte não reproduz todos os procedimentos da Enigma.</p><p class="context-sources"><a href="https://enigma.virtualcolossus.co.uk/technical.html" target="_blank" rel="noopener noreferrer">Fiação e movimento · Virtual Enigma ↗</a><a href="https://www.asd.gov.au/about/history/asd-stories/2022-04-01-enigma-cipher-machine" target="_blank" rel="noopener noreferrer">Enigma e comunicação · ASD ↗</a><a href="https://www.tnmoc.org/bh-6-enter-turing-and-welchman" target="_blank" rel="noopener noreferrer">Turing, Welchman e a Bombe · TNMOC ↗</a><a href="https://www.tnmoc.org/bh-3-the-polish-connection" target="_blank" rel="noopener noreferrer">Contribuição polonesa · TNMOC ↗</a><a href="https://www.tnmoc.org/bh-16-menus-and-cribs" target="_blank" rel="noopener noreferrer">Pistas e conferência · TNMOC ↗</a></p></details>';
  $('#turing-machines').after(enigma);
  let presses=0,hasRead=false;
  function read(){
    const cipher=logic.enigma('A'.repeat(presses)).output,start=$('#enigma-start').value;
    const answer=logic.enigma(cipher,start).output;
    $('#enigma-readout').textContent='A receptora leu: '+answer+'. '+(start==='AAA'?'As configurações e a posição inicial combinaram: recuperamos as letras digitadas.':'A posição inicial foi diferente: a leitura não recupera as mesmas letras. Compare com AAA.');
    hasRead=true;
  }
  function show(){
    const result=logic.enigma('A'.repeat(presses)),last=result.steps.at(-1);
    $('[data-enigma-key]').textContent=presses?'A':'—';
    $('[data-enigma-lamp]').textContent=last?.output||'—';
    $('[data-enigma-wheels]').innerHTML=Array.from(result.position,c=>'<b>'+c+'</b>').join('');
    $('#enigma-input').textContent=presses?'A'.repeat(presses):'Nenhuma letra ainda.';
    $('#enigma-output').textContent=result.output||'Aguardando uma tecla.';
    $('#enigma-step').disabled=presses===5;$('#enigma-read').disabled=!presses;
    $('#enigma-feedback').textContent=presses?'Toque '+presses+' de 5: você pressionou A; a posição passou a '+result.position+' e acendeu '+last.output+'. '+(presses>1?'A mesma tecla pode produzir outra letra porque as rodas se movem.':'O movimento aconteceu antes da passagem da corrente.'):'A posição inicial é AAA. Clique em Digitar A e acompanhe a posição das rodas e a lâmpada.';
    if(hasRead&&presses)read();
  }
  $('#enigma-step').addEventListener('click',()=>{if(presses<5){presses++;show();}});
  $('#enigma-reset').addEventListener('click',()=>{presses=0;hasRead=false;$('#enigma-start').value='AAA';$('#enigma-readout').textContent='Envie pelo menos uma letra para comparar.';show();});
  $('#enigma-read').addEventListener('click',read);
  $('#enigma-start').addEventListener('change',()=>{if(hasRead&&presses)read();});

  const grace=$('#grace-hopper .reusable-process');
  grace.className='grace-context';
  grace.innerHTML='<h3>O pontapé inicial: evitar copiar tudo de novo.</h3>'+comparison('Montagem manual','A pessoa copiava trechos de cálculo e ajustava onde eles ficariam na memória.','A-0 ajuda na montagem','O computador busca trechos prontos na fita e organiza sua combinação.')+'<div class="context-routine"><span>Pedir trechos 01 e 02</span><i aria-hidden="true">→</i><span>A-0 busca na fita</span><i aria-hidden="true">→</i><span>Montagem dos trechos</span></div><p class="context-observe">01 e 02 são exemplos ilustrativos. A ideia é <b>reaproveitar instruções</b>, em vez de reescrever tudo. O A-0 foi um precursor dos compiladores: programas que traduzem instruções.</p>';
})();
