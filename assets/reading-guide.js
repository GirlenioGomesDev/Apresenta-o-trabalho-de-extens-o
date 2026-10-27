/* Orienta o olhar sem excluir ou esconder o conteúdo da oficina. */
(function(){
  'use strict';
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
  const esc=window.WorkshopLogic.escapeHTML,plans=new Map();
  const careerJobs={
    software:{jobs:['Desenvolvedor front-end','Desenvolvedor back-end','Desenvolvedor full-stack','Desenvolvedor mobile'],source:'https://learn.microsoft.com/pt-br/training/career-paths/developer'},
    infra:{jobs:['Analista de suporte','Analista de infraestrutura','Administrador de redes','Administrador de sistemas'],source:'https://learn.microsoft.com/pt-br/training/career-paths/administrator'},
    dados:{jobs:['Analista de dados','Analista de BI','Engenheiro de dados','Cientista de dados'],source:'https://learn.microsoft.com/pt-br/training/career-paths/data-analyst'},
    cyber:{jobs:['Analista de segurança','Analista de SOC','Analista de resposta a incidentes','Especialista em testes de segurança'],source:'https://learn.microsoft.com/pt-br/training/career-paths/security-engineer'}
  };
  const group=(title,...selectors)=>({title,selectors});
  const custom={
    roteiro:[group('Conheça o caminho','#course-agenda'),group('Como vamos aprender','.learning-rhythm')],
    'vida-digital':[group('Escolha uma situação','.experience-options'),group('Veja o que está por trás','.experience-board')],
    'web-na-tela':[group('Separe os três conceitos','.web-basics'),group('Acompanhe a página nascer','.web-walkthrough')],
    'internet-evolucao':[group('Entenda a necessidade','.course-lead'),group('Escolha um marco','.evolution-timeline'),group('Compare o antes e o depois','.evolution-panel','.milestone-navigation'),group('Conheça outras contribuições','.history-brief-credits')],
    'internet-pacotes':[group('Conheça as contribuições','.internet-people'),group('Compare o problema e a solução','.internet-contribution > div:last-child'),group('Envie e reconstrua a mensagem','.packet-history-lab')],
    'internet-protocolos':[group('Conheça as contribuições','.internet-people'),group('Compare as redes','.internet-contribution > div:last-child'),group('Teste a comunicação','.internet-lab')],
    'internet-dns':[group('Entenda a necessidade','.internet-people'),group('Veja a mudança','.internet-contribution > div:last-child'),group('Siga a busca pelo endereço','.internet-lab')],
    linguagens:[group('Escolha uma responsabilidade','.language-list'),group('Veja a mesma página','.language-browser','.layer-browser'),group('Leia o que mudou','.layer-explanation')],
    'html-estrutura':[group('Enxergue a estrutura','.semantic-tree'),group('Veja a página','.semantic-page'),group('Entenda o elemento','.semantic-explanation')],
    'html-acessivel':[group('Compare os controles','.accessibility-compare'),group('Confira o resultado','#accessibility-feedback','.lesson-reveal')],
    'css-caixa':[group('Mude uma medida','.box-controls>label'),group('Veja o espaço ocupado','.box-diagram'),group('Confira a soma','.box-equation','.lesson-reveal')],
    'logica-passos':[group('Monte as instruções','.logic-program'),group('Execute uma por vez','.logic-result')],
    'logica-decisoes':[group('Guarde um valor','.logic-concepts>:nth-child(1)'),group('Confira a condição','.logic-concepts>:nth-child(2)'),group('Repita as instruções','.logic-concepts>:nth-child(3)'),group('Dê nome à tarefa','.logic-function')],
    'js-modelo':[group('Provoque uma mudança','.state-cycle','#state-feedback'),group('Entenda cada parte','.concept-three')],
    'js-desafio':[group('Compare com a expectativa','.expectation-grid'),group('Leia o resultado do teste','.experiment-takeaway')],
    carreiras:[group('Entenda as quatro entregas','.lead'),group('Escolha e explore uma área','.career-map')],
    'por-tras-do-clique':[group('Conheça os papéis','.software-roles'),group('Acompanhe uma ação','.route-tabs','#local-route','#server-route'),group('Retome HTML, CSS e JS','.career-web-foundations')],
    'infra-cabo':[group('Teste o cabo no modelo','.cable-simulator'),group('Compare com o equipamento','.physical-demo')],
    'infra-caminho':[group('Observe uma camada por vez','.infra-layer-cards'),group('Leia as pistas','.concept-caption','.status-meanings')],
    'lab-infra-missao':[group('Monte o cenário','.diagnostic-controls'),group('Observe a evidência','.diagnostic-path','.diagnostic-conclusion'),group('Teste uma hipótese','.investigation-choices')],
    'dados-pergunta':[group('Observe os registros','.data-record-preview'),group('Defina a pergunta','.data-question-board>.concept-three')],
    'lab-dados-coleta':[group('Olhe os registros','.data-table-wrap'),group('Mude uma condição','.data-clean-controls'),group('Compare os resultados','.analysis-bars','.analysis-measures','#data-quality')],
    'dados-vies':[group('Compare as escalas','.chart-literacy > div:first-child'),group('Leia a diferença real','.experiment-takeaway')],
    'alan-turing':[group('Entenda o problema da época','.turing-layout','.turing-team'),group('Conheça as máquinas','.turing-machine-pair'),group('Execute uma ideia','.turing-lab')],
    'codigo-seguro':[group('Entenda a permissão','.lead'),group('Escolha o papel e teste','.permission-demo'),group('Conheça as proteções','.safety-focus')],
    'lab-cyber-regras':[group('Defina identidade e regras','.access-policy-controls'),group('Compare cada decisão','#visual-access-matrix','#access-feedback')],
    detetive:[group('Escolha o cenário','.scenario-tabs'),group('Leia os sinais e teste uma ação','#phishing-scenario','#mfa-scenario')],
    'cyber-investiga':[group('Observe o cenário','.incident-response-board'),group('Siga as três ações','.concept-three')],
    'primeiro-projeto':[group('Escolha uma área','.starting-options'),group('Continue experimentando','.starting-detail')]
  };
  // O exemplo prático fica entre a apresentação da área e os dados de mercado.
  for(const [area,meta] of Object.entries(careerJobs)){
    const scene=$('#lab-'+area),context=$('[data-career-context]',scene);if(!scene||!context)continue;
    const firstExample=$('.career-lab-intro,.career-situation,.visual-poll,.cyber-visual-workspace',scene);
    const mini=$('.career-mini-case',context);if(mini&&firstExample)firstExample.before(mini);
    $('.story-bridge',scene).before(context);
    const jobs=document.createElement('div');jobs.className='career-job-list';
    jobs.innerHTML='<span class="mini-label">EXEMPLOS DE CARGOS NESTA ÁREA</span><ul>'+meta.jobs.map(job=>'<li>'+esc(job)+'</li>').join('')+'</ul><a class="source-link" href="'+meta.source+'" target="_blank" rel="noopener noreferrer">Fonte: funções e caminhos de carreira · Microsoft Learn ↗</a>';
    context.prepend(jobs);
    $('.career-identity',scene).insertAdjacentHTML('beforeend','<a class="source-link" href="'+meta.source+'" target="_blank" rel="noopener noreferrer">Fonte: conceito e atividades · Microsoft Learn ↗</a>');
    custom['lab-'+area]=[group('Conheça a área','.career-explainer'),group('Veja o trabalho na prática','.career-mini-case','.career-lab-intro','[data-live-lab]','.career-situation','.visual-poll','.cyber-visual-workspace'),group('Explore cargos e salários','[data-career-context]')];
  }
  // Separa o contexto da contribuição e sua representação, preservando todos os nós.
  $$('.history-layout').forEach(layout=>{
    const scene=layout.closest('.scene'),explanation=$('.history-explanation',layout),context=$('.history-context',explanation);
    if(!explanation||!context)return;
    const application=document.createElement('div');application.className='history-application';
    Array.from(explanation.children).filter(el=>el!==context).forEach(el=>application.append(el));explanation.append(application);
    custom[scene.id]=[group('Conheça a pessoa','.history-person'),group('Necessidade, ideia e legado','.history-explanation>.history-context'),group('Veja a contribuição em ação','.history-application'),group('Experimente no laboratório','.internet-lab')];
  });
  function defaultGroups(scene){
    if($('[data-course-lab]',scene))return [group('Entenda o experimento','.experiment-orientation'),group('Edite e observe o resultado','.course-workspace'),group('Experimente e explique','.course-challenge','.course-code-steps','.course-step-explanation')];
    if(scene.id==='laboratorio')return [group('Escolha o que vai mudar','.lab-stage-controls','.web-lab-live-tools','.web-lesson-note'),group('Edite e veja acontecer','.lab-workspace'),group('Leia o retorno','.web-live-console','.lab-bottom')];
    if($('.history-layout',scene))return [group('Conheça a pessoa e a necessidade','.history-layout'),group('Compare e experimente','.internet-lab','.theme-comparison','#switch-theme','.network-loop','.axis-demo','.hopper-example')];
    if($('.incident-layout',scene))return [group('Entenda o caso real','.incident-poster'),group('Ligue o caso à prática','.incident-reading')];
    const children=Array.from(scene.children).filter(el=>!el.matches('h1,h2,.eyebrow,.course-eyebrow,.story-bridge,.career-subnav,.internet-timeline,.history-overview-link,.footnote,.course-small,.common-language-note,.concept-caption')&&el.textContent.trim().length>0);
    return children.slice(0,4).map((el,i)=>({title:['Entenda a ideia','Explore o exemplo','Confira o resultado','Conecte com o próximo passo'][i],nodes:[el]}));
  }
  function build(scene){
    if(['inicio','quiz','encerramento','equipe'].includes(scene.id))return;
    const groups=[],used=new Set();
    const source=custom[scene.id]||defaultGroups(scene);
    for(const entry of source){
      const nodes=entry.nodes||entry.selectors.flatMap(s=>$$(s,scene));
      const unique=nodes.filter((el,i)=>nodes.indexOf(el)===i&&!used.has(el)&&!groups.some(g=>g.nodes.some(parent=>parent.contains(el))));
      if(!unique.length)continue;
      unique.forEach(el=>used.add(el));groups.push({title:entry.title,nodes:unique});
    }
    if(!groups.length)return;
    const nav=document.createElement('nav');nav.className='reading-guide';nav.setAttribute('aria-label','Ordem de leitura desta etapa');
    nav.innerHTML='<div class="reading-guide-caption"><span>SIGA A LEITURA</span><b class="reading-guide-status" aria-live="polite"></b><div><button type="button" data-guide-back aria-label="Destacar trecho anterior">←</button><button type="button" data-guide-next>Próximo trecho →</button></div></div><ol>'+groups.map((g,i)=>'<li><button type="button" data-reading-focus="'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(g.title)+'</button></li>').join('')+'</ol>';
    const heading=$('h1,h2',scene);let anchor=heading;while(anchor&&anchor.parentElement!==scene)anchor=anchor.parentElement;if(anchor)anchor.after(nav);else scene.prepend(nav);
    const state={scene,groups,nav,current:0};plans.set(scene.id,state);
    groups.forEach((g,i)=>g.nodes.forEach((el,j)=>{el.classList.add('reading-region');el.dataset.readingStep=String(i);if(j===0){el.classList.add('reading-region-start');el.dataset.readingNumber=String(i+1).padStart(2,'0');el.dataset.readingTitle=g.title;}}));
    nav.addEventListener('click',e=>{const step=e.target.closest('[data-reading-focus]');if(step)focus(state,Number(step.dataset.readingFocus),true);else if(e.target.closest('[data-guide-next]'))focus(state,state.current+1,true);else if(e.target.closest('[data-guide-back]'))focus(state,state.current-1,true);});
    focus(state,0,false);
  }
  function focus(state,index,scroll){
    index=Math.max(0,Math.min(state.groups.length-1,index));state.current=index;
    state.groups.forEach((g,i)=>g.nodes.forEach(el=>el.classList.toggle('is-reading-current',i===index)));
    $$('[data-reading-focus]',state.nav).forEach((b,i)=>{b.setAttribute('aria-current',i===index?'step':'false');});
    $('.reading-guide-status',state.nav).textContent=(index+1)+' de '+state.groups.length+' · '+state.groups[index].title;
    $('[data-guide-back]',state.nav).disabled=index===0;$('[data-guide-next]',state.nav).disabled=index===state.groups.length-1;
    if(scroll){const target=state.groups[index].nodes.find(el=>!el.hidden)||state.groups[index].nodes[0];target.style.scrollMarginTop=Math.ceil(parseFloat(getComputedStyle(state.nav).top)+state.nav.getBoundingClientRect().height+18)+'px';target.scrollIntoView({behavior:'instant',block:'start'});}
  }
  $$('.scene').forEach(build);
  window.addEventListener('workshop-scene-change',()=>{const scene=$('.scene:not([hidden])'),state=plans.get(scene?.id);if(state)focus(state,0,false);});
})();
