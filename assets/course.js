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
  $('#mission-board').innerHTML=course.missions.map((mission,index)=>'<article><span class="mini-label">SITUAÇÃO 0'+(index+1)+' / '+esc(mission.area.toUpperCase())+'</span><h3>'+esc(mission.title)+'</h3><p>'+esc(mission.question)+'</p><details><summary>Revelar uma pista</summary><p>'+esc(mission.hint)+'</p></details><a class="text-link" href="'+mission.href+'">Rever a atividade ↗</a></article>').join('');

  // The introductory animation illustrates a page, not the school network.
  const webPhases=[
    ['O navegador pede os arquivos.','Digitamos um endereço ou abrimos um link. O navegador solicita os recursos da página.'],
    ['O conteúdo ganha significado.','HTML identifica o título, o parágrafo e o botão. Eles já aparecem, ainda sem o visual preparado.'],
    ['O mesmo conteúdo ganha forma.','CSS organiza cores, tamanhos e espaços. O assunto é o mesmo; a apresentação muda.'],
    ['O botão responde à pessoa.','JavaScript pode programar uma resposta ao clique. Agora você pode experimentar o botão abaixo.']
  ];
  $$('[data-web-step]').forEach(button=>button.addEventListener('click',()=>{
    const phase=Number(button.dataset.webStep),item=webPhases[phase];
    $$('[data-web-step]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    $('.web-example').dataset.webPhase=String(phase);
    $('#web-example-title').textContent=item[0];$('#web-example-text').textContent=item[1];
    $('#web-example-button').disabled=phase!==3;$('#web-example-response').textContent='';
  }));
  $('#web-example-button').addEventListener('click',()=>{$('#web-example-response').textContent='A página recebeu seu clique e mudou esta mensagem.';});

  let program=[],programIndex=0,robot={position:0,collected:false};
  function showProgram(){
    $('#command-list').innerHTML=program.length?program.map((command,index)=>'<li class="'+(index<programIndex?'executed':'')+'"'+(index===programIndex?' aria-current="step"':'')+'><b>'+String(index+1).padStart(2,'0')+'</b><span>'+(command==='andar'?'Andar uma casa':'Pegar a estrela')+'</span>'+(index<programIndex?'<small>executado ✓</small>':'')+'</li>').join(''):'<li class="empty-program">Ainda não há instruções. Escolham a primeira.</li>';
    $('#command-step').disabled=programIndex>=program.length;
    $$('[data-command]').forEach(button=>button.disabled=program.length>=8||programIndex>0);
    $('#logic-position').textContent=robot.position;
    $('#logic-collected').textContent=robot.collected?'coletada ✓':'não coletada';
    $('#logic-robot').style.left='calc('+robot.position+' * 25% + 4%)';
    $('#logic-robot').setAttribute('aria-label','Robô na casa '+robot.position);
    $('[data-goal]').classList.toggle('collected',robot.collected);
  }
  function resetProgram(commands=[]){program=commands;programIndex=0;robot={position:0,collected:false};showProgram();$('#command-feedback').textContent='Programa pronto para começar. Façam uma previsão e executem um passo.';}
  $$('[data-command]').forEach(button=>button.addEventListener('click',()=>{if(program.length<8&&programIndex===0){program.push(button.dataset.command);showProgram();}}));
  $('#command-reset').addEventListener('click',()=>resetProgram());
  $('#command-example').addEventListener('click',()=>resetProgram(['andar','andar','andar','pegar']));
  $('#command-step').addEventListener('click',()=>{
    if(programIndex>=program.length)return;
    robot=window.CourseLogic.programStep(robot,program[programIndex]);programIndex++;
    $('#command-feedback').textContent=robot.message+(programIndex===program.length&&!robot.collected?' O programa terminou. Vamos limpar e tentar outra ordem?':'');showProgram();
  });showProgram();
  function showLogic(){
    const count=Number($('#logic-steps').value);$('#logic-steps-value').textContent=count;
    $('[data-step-copy]').textContent=count;
    $('#logic-condition').textContent=count>=3?'Sim: tem pelo menos 3.':'Ainda não: tem menos de 3.';
    $('#logic-condition').classList.toggle('condition-true',count>=3);
    $('#logic-condition-text').textContent=count>=3?'Há passos suficientes para chegar à casa 3.':'Faltam '+(3-count)+' passo(s) para chegar à casa 3.';
    $('#logic-repeat').innerHTML=count?Array.from({length:count},(_,i)=>'<span>Andar <b>'+(i+1)+'</b></span>').join(''):'<span>Nenhuma repetição: 0 passos.</span>';
  }
  $('#logic-steps').addEventListener('input',showLogic);showLogic();

  // Physical cable continuity model. It does not measure real cable performance.
  let cableTimer=0,cableStep=0;
  function showCable(){
    const map=window.CourseLogic.wireMap($('#cable-scenario').value);
    for(const side of ['a','b'])$('#cable-pins-'+side).innerHTML=Array.from({length:8},(_,i)=>'<span data-cable-pin="'+side+(i+1)+'"><i></i><b>'+(i+1)+'</b></span>').join('');
    $('#cable-lines').innerHTML=map.destinations.map((destination,index)=>{
      const y=15+index*30,end=destination?15+(destination-1)*30:y;
      return '<path data-cable-line="'+(index+1)+'" d="M 5 '+y+' C 90 '+y+', 190 '+end+', '+(destination?'275':'135')+' '+end+'" class="'+(destination===index+1?'wire-expected':'wire-issue')+'"/>';
    }).join('');
    $('#cable-lines').setAttribute('aria-label','Mapa do cabo: '+(map.valid?'ligações esperadas de 1 a 8.':$('#cable-scenario').selectedOptions[0].textContent+'.'));
  }
  function stopCable(){clearInterval(cableTimer);cableTimer=0;cableStep=0;$('#cable-test').disabled=false;}
  $('#cable-scenario').addEventListener('change',()=>{stopCable();showCable();$('#cable-feedback').textContent='Qual indicador deve mudar? Façam uma previsão antes de iniciar o teste.';});
  $('#cable-test').addEventListener('click',()=>{
    stopCable();showCable();$('#cable-test').disabled=true;
    const map=window.CourseLogic.wireMap($('#cable-scenario').value);
    function tick(){
      cableStep++;const destination=map.destinations[cableStep-1];
      $('[data-cable-pin="a'+cableStep+'"]').classList.add('tested');
      if(destination)$('[data-cable-pin="b'+destination+'"]').classList.add('tested');
      $('[data-cable-line="'+cableStep+'"]').classList.add('tested');
      $('#cable-feedback').textContent='Contato '+cableStep+' da ponta A → '+(destination?'contato '+destination+' da ponta B.':'sem continuidade na ponta B.');
      if(cableStep===8){
        clearInterval(cableTimer);cableTimer=0;$('#cable-test').disabled=false;
        $('#cable-feedback').textContent=map.valid?'Os oito contatos chegaram ao destino esperado neste mapa. O que ainda precisaríamos testar além da continuidade?':$('#cable-scenario').value==='rompido'?'O contato 5 não chegou à outra ponta. Investigue o fio e os encaixes antes de concluir o que aconteceu.':'A via 1 chegou em 2, e a via 2 chegou em 1. Para o cabo direto deste exemplo, a ordem não corresponde ao esperado.';
      }
    }
    tick();cableTimer=setInterval(tick,230);
  });showCable();
  function networkInput(){return {connected:$('#network-connected').checked,dns:$('#network-dns').checked,http:Number($('#network-http').value)};}
  function showNetwork(){
    const result=window.CourseLogic.networkStatus(networkInput());$('#network-evidence').textContent=result.evidence;
    $$('[data-network-hop]').forEach(hop=>hop.classList.toggle('current',hop.dataset.networkHop===result.stage));
    $$('[data-network-guess]').forEach(button=>{button.setAttribute('aria-pressed','false');button.classList.remove('selected');});
    $('#network-feedback').textContent='Qual etapa você investigaria primeiro? Escolha uma hipótese e explique a pista.';
  }
  ['#network-connected','#network-dns','#network-http'].forEach(selector=>$(selector).addEventListener('change',showNetwork));
  $$('[data-network-guess]').forEach(button=>button.addEventListener('click',()=>{
    const result=window.CourseLogic.networkStatus(networkInput());
    $$('[data-network-guess]').forEach(other=>{other.setAttribute('aria-pressed',String(other===button));other.classList.toggle('selected',other===button);});
    $('#network-feedback').textContent=button.dataset.networkGuess===result.stage?'A hipótese combina com a primeira pista deste cenário. '+result.evidence:'Vamos comparar as pistas: '+result.evidence;
  }));showNetwork();

  function showPoll(){
    const values=$$('[data-poll-value]').map(input=>{
      const value=Math.min(50,Math.max(0,Math.floor(Number(input.value)||0)));
      if(input.value!==''&&Number(input.value)!==value)input.value=String(value);
      return value;
    });
    const names=['Jogos','Vídeos','Música'],total=values.reduce((sum,value)=>sum+value,0),max=Math.max(...values),leaders=names.filter((_,i)=>values[i]===max);
    values.forEach((value,i)=>{$('[data-poll-bar="'+i+'"]').style.width=value/50*100+'%';$('[data-poll-count="'+i+'"]').textContent=value;});
    $('#poll-summary').textContent=total===0?'A amostra está vazia. Ainda não há uma preferência a comparar.':total+' escolhas fictícias. '+(leaders.length===1?leaders[0]+' tem a maior quantidade nesta amostra.':'Há empate entre '+leaders.join(', ')+'.')+' Isso não representa automaticamente todos os alunos.';
  }
  $$('[data-poll-value]').forEach(input=>input.addEventListener('input',showPoll));
  $('#poll-reset').addEventListener('click',()=>{$$('[data-poll-value]').forEach((input,i)=>input.value=[12,8,5][i]);showPoll();});showPoll();
  const sampleRecords=[{topic:'Web',minutes:12},{topic:'Web',minutes:18},{topic:'Jogos',minutes:20},{topic:'Jogos',minutes:22},{topic:'Robótica',minutes:25},{topic:'Robótica',minutes:29}];
  function showRecordsAnalysis(){
    const records=sampleRecords.slice();
    if($('#data-incomplete').checked)records.push({topic:'Jogos',minutes:null});
    if($('#data-extreme').checked)records.push({topic:'Web',minutes:300});
    const result=window.CourseLogic.summarizeRecords(records,$('#data-context-rule').checked?120:Infinity);
    $('#data-records').innerHTML=records.map((record,i)=>'<tr class="'+(!result.included[i]?'record-excluded':'')+'"><th scope="row">'+String(i+1).padStart(2,'0')+'</th><td>'+esc(record.topic)+'</td><td>'+(record.minutes===null?'<span class="missing-value">vazio</span>':record.minutes)+'</td><td>'+(result.included[i]?'incluído':'conferir')+'</td></tr>').join('');
    const number=value=>value===null?'—':Number(value.toFixed(1)).toLocaleString('pt-BR');
    $('#data-mean').textContent=number(result.mean)+' min';$('#data-median').textContent=number(result.median)+' min';
    result.totals.forEach((value,i)=>{$('[data-data-bar="'+i+'"]').style.width=Math.min(100,value/400*100)+'%';$('[data-data-total="'+i+'"]').textContent=value;});
    $('#data-quality').textContent=result.valid+' registros no cálculo · '+result.excluded+' para conferir. '+($('#data-extreme').checked&&!$('#data-context-rule').checked?'O registro de 300 min está elevando a média. Compare com a mediana e com a duração da atividade.':'Explique a regra usada antes de apresentar a conclusão.');
  }
  ['#data-incomplete','#data-extreme','#data-context-rule'].forEach(selector=>$(selector).addEventListener('change',showRecordsAnalysis));
  $('#data-reset').addEventListener('click',()=>{['#data-incomplete','#data-extreme','#data-context-rule'].forEach(selector=>$(selector).checked=false);showRecordsAnalysis();});showRecordsAnalysis();

  function resetGate(){
    $('.cyber-visual-workspace').classList.remove('access-allowed');
    $('#cyber-gate-feedback').textContent='A combinação mudou. Façam uma previsão e cliquem em Testar acesso.';
  }
  ['#cyber-gate-role','#cyber-gate-confirmed'].forEach(selector=>$(selector).addEventListener('change',resetGate));
  $('#cyber-gate-try').addEventListener('click',()=>{
    const confirmed=$('#cyber-gate-confirmed').checked,editor=$('#cyber-gate-role').value==='editor',allowed=confirmed&&editor;
    $('.cyber-visual-workspace').classList.toggle('access-allowed',allowed);
    $('#cyber-gate-feedback').textContent=allowed?'Acesso permitido neste cenário: confirmação e papel autorizado estão presentes.':!confirmed?'Acesso bloqueado: falta confirmar a segunda etapa nesta atividade.':'Identidade confirmada, mas visitante não tem permissão de edição. Confirmar quem é não autoriza tudo.';
  });
  function showAccess(){
    const rows=window.CourseLogic.accessDecisions({role:$('#access-role').value,confirmed:$('#access-confirmed').checked,checkOwner:$('#access-owner-rule').checked});
    $('#visual-access-matrix').innerHTML=rows.map(row=>'<div class="'+(row.allowed===row.expected?'policy-match':'policy-mismatch')+'"><span>'+esc(row.name)+'</span><b>'+(row.allowed?'✓ Permite':'× Bloqueia')+'</b><small>Regra da atividade: '+(row.expected?'permitir':'bloquear')+'</small></div>').join('');
    const mismatches=rows.filter(row=>row.allowed!==row.expected).length;
    $('#access-feedback').textContent=mismatches?mismatches+' decisões não seguem a regra. Qual conferência está faltando?':'As decisões representadas seguem a regra da atividade. Mude o papel e compare de novo.';
  }
  ['#access-role','#access-confirmed','#access-owner-rule'].forEach(selector=>$(selector).addEventListener('change',showAccess));showAccess();
  function orient(){
    const scene=document.querySelector('.scene:not([hidden])');if(!scene)return;
    const meta=course.scenes.find(item=>item.id===scene.id);if(!meta)return;
    const module=course.modules.find(item=>item.id===meta.module),index=course.modules.indexOf(module);
    const shortNames={comeco:'Web',html:'HTML',css:'CSS',js:'Lógica e JavaScript',software:'Software',infra:'Redes e suporte',dados:'Dados',cyber:'Cibersegurança',fechamento:'Participação'};
    if($('#course-current-block'))$('#course-current-block').textContent=String(index+1).padStart(2,'0')+' / '+shortNames[module.id]+' / '+module.minutes+' min';
  }
  window.addEventListener('workshop-scene-change',orient);orient();
})();
