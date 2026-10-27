/* Interações visuais de apoio e orientação do roteiro. */
(function(){
  'use strict';
  const course=window.WorkshopCourse, esc=window.WorkshopLogic.escapeHTML;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  $('#course-agenda').innerHTML=window.WorkshopExtensionLogic.groupedChapters(course).map(chapter=>'<a href="#'+chapter.start+'"><span>'+chapter.number+'</span><b>'+esc(chapter.title)+'<em>'+esc(chapter.description)+'</em></b><small>'+chapter.minutes+' min</small></a>').join('');
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

  function orient(){
    const scene=document.querySelector('.scene:not([hidden])');if(!scene)return;
    const meta=course.scenes.find(item=>item.id===scene.id);if(!meta)return;
    const module=course.modules.find(item=>item.id===meta.module),index=course.modules.indexOf(module);
    const shortNames={comeco:'Começo',fundamentos:'Entender a Web',html:'HTML',css:'CSS',js:'Lógica e JavaScript',carreiras:'Carreiras',fechamento:'Participar'};
    const chapter=course.chapters.find(item=>item.id===meta.chapter);
    const blockMinutes=course.scenes.filter(item=>item.module===module.id&&item.chapter===chapter.id).reduce((sum,item)=>sum+item.minutes,0);
    const blockName=chapter.id==='creditos'?'Equipe':shortNames[module.id]||chapter.title;
    if($('#course-current-block'))$('#course-current-block').textContent=chapter.number+' / '+blockName+' / '+blockMinutes+' min';
  }
  window.addEventListener('workshop-scene-change',orient);orient();
})();
