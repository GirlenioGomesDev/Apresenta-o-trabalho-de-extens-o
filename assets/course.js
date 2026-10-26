/* Interações visuais de apoio e orientação do roteiro. */
(function(){
  'use strict';
  const course=window.WorkshopCourse, esc=window.WorkshopLogic.escapeHTML;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  $('#course-agenda').innerHTML=course.modules.map((module,index)=>'<a href="#'+window.CourseLogic.moduleStart(course.scenes,module.id)+'"><span>'+String(index+1).padStart(2,'0')+'</span><b>'+esc(module.title)+'</b><small>'+module.minutes+' min</small></a>').join('');
  const structures={
    cabecalho:{title:'Cabeçalho: o começo da leitura.',text:'Elementos bem escolhidos ajudam pessoas, navegadores e tecnologias assistivas a entender a organização.'},
    principal:{title:'Conteúdo principal: o assunto da página.',text:'A estrutura indica qual conteúdo é central. Títulos também ajudam a percorrer e compreender esse conteúdo.'},
    acao:{title:'Ação: o controle comunica sua função.',text:'Um botão representa uma ação. Um link leva a um destino. Aparência parecida não torna os dois equivalentes.'}
  };
  $$('[data-structure]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-structure]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});
    $$('[data-semantic-region]').forEach(region=>region.classList.toggle('active',region.dataset.semanticRegion===button.dataset.structure));
    const item=structures[button.dataset.structure];$('#structure-title').textContent=item.title;$('#structure-text').textContent=item.text;
  }));
  $('#semantic-action').addEventListener('click',()=>{$('#semantic-feedback').textContent='Uma ação com nome e resultado perceptível.';});
  $('[data-fake-control]').addEventListener('click',()=>{$('#accessibility-feedback').textContent='A caixa respondeu ao mouse. Agora tente encontrá-la usando apenas Tab.';});
  $('#native-control').addEventListener('click',()=>{$('#accessibility-feedback').textContent='O controle nativo funciona com mouse, Enter ou Espaço quando está em foco.';});
  $('#switch-theme').addEventListener('click',()=>$('#theme-comparison').classList.toggle('alternate'));
  function updateBox(){
    const padding=Number($('#box-padding').value),border=Number($('#box-border').value);
    $('#box-padding-value').textContent=padding+' px';$('#box-border-value').textContent=border+' px';
    $('#box-demo').style.padding=padding+'px';$('#box-demo').style.borderWidth=border+'px';
    $('#box-equation').textContent='180 + 2 × '+padding+' + 2 × '+border+' = '+(180+2*padding+2*border)+' px até a borda.';
  }
  ['#box-padding','#box-border'].forEach(selector=>$(selector).addEventListener('input',updateBox));updateBox();
  let state=0;
  $('#state-event').addEventListener('click',()=>{
    state++;$('#state-value').textContent=state;$('#state-render').textContent=state===1?'Uma escolha recebida.':state+' escolhas recebidas.';
    $('#state-feedback').textContent='O evento aconteceu. O valor virou '+state+'. A interface foi atualizada com esse valor.';
    $('.state-cycle').classList.remove('pulse-flow');void $('.state-cycle').offsetWidth;$('.state-cycle').classList.add('pulse-flow');
  });
  $$('[data-choice]').forEach(host=>host.querySelectorAll('[data-choice-answer]').forEach(button=>button.addEventListener('click',()=>{
    const item=course.choices[host.dataset.choice];host.querySelectorAll('[data-choice-answer]').forEach(other=>{other.classList.toggle('selected',other===button);other.setAttribute('aria-pressed',String(other===button));});
    host.querySelector('.choice-feedback').textContent=(Number(button.dataset.choiceAnswer)===item.correct?'Isso mesmo. ':'Vamos comparar. ')+item.feedback;
  })));
  const layers={
    rede:['Conexão: o caminho começa no dispositivo.','O dispositivo precisa conseguir se comunicar com a rede. Estar conectado ao Wi-Fi, por si só, não prova que todo serviço está acessível.'],
    dns:['DNS: nomes precisam de um endereço.','Nesse modelo, DNS resolve o nome para um endereço. Um problema nessa etapa pode impedir o acesso mesmo quando outras conexões funcionam.'],
    http:['HTTP: a resposta também é uma pista.','Um código de resposta ajuda a distinguir um recurso ausente de um serviço indisponível. É uma evidência dentro da investigação, não toda a explicação.']
  };
  $$('[data-layer-info]').forEach(button=>button.addEventListener('click',()=>{
    const item=layers[button.dataset.layerInfo];$('#network-layer-title').textContent=item[0];$('#network-layer-text').textContent=item[1];
    $$('[data-layer-info]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});
  }));
  $('#loop-toggle').addEventListener('click',()=>{
    const organized=$('#network-loop').classList.toggle('organized');$('#loop-toggle').textContent=organized?'Voltar à representação em loop ↻':'Representar um caminho sem loop →';
  });
  const records=['A','B','C','D','E'];
  function showRecords(values){$('#backup-records').innerHTML=records.map(id=>'<span class="'+(values.includes(id)?'record-present':'record-missing')+'">'+id+'</span>').join('');}
  showRecords(records);
  $$('[data-backup]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.backup;const values=key==='perda'?[]:key==='antigo'?['A','B','C']:records;showRecords(values);
    $('#backup-feedback').textContent=key==='perda'?'A lista fictícia ficou vazia. Qual cópia permitiria recuperá-la?':key==='antigo'?'A cópia antiga devolveu A, B e C. Os registros D e E foram criados depois dela.':'A cópia recente contém os cinco registros deste exemplo. Testar a restauração confirma o que é recuperável.';
  }));
  let fullAxis=false;
  function updateAxis(){
    const base=fullAxis?0:14,max=20;
    $('#axis-one').style.height=((15-base)/(max-base)*100)+'%';$('#axis-two').style.height=((18-base)/(max-base)*100)+'%';
    $('#axis-label').textContent='Eixo começa em '+base+' · topo em '+max;
    $('#axis-toggle').textContent=fullAxis?'Comparar com o eixo recortado →':'Mostrar eixo a partir de zero →';
  }
  $('#axis-toggle').addEventListener('click',()=>{fullAxis=!fullAxis;updateAxis();});updateAxis();
  $('#mission-board').innerHTML=course.missions.map((mission,index)=>'<article><span class="mini-label">TICKET 0'+(index+1)+' / '+esc(mission.area.toUpperCase())+'</span><h3>'+esc(mission.title)+'</h3><p>'+esc(mission.question)+'</p><details><summary>Revelar uma pista</summary><p>'+esc(mission.hint)+'</p></details><a class="text-link" href="'+mission.href+'">Investigar no laboratório ↗</a></article>').join('');
  function orient(){
    const scene=document.querySelector('.scene:not([hidden])');if(!scene)return;
    const meta=course.scenes.find(item=>item.id===scene.id);if(!meta)return;
    const module=course.modules.find(item=>item.id===meta.module),index=course.modules.indexOf(module);
    if($('#course-current-block'))$('#course-current-block').textContent=String(index+1).padStart(2,'0')+' / '+module.title.split(' · ')[0]+' / '+module.minutes+' min';
  }
  window.addEventListener('workshop-scene-change',orient);orient();
})();
