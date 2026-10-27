(function(){
 'use strict';
 const data=window.WorkshopExtension,esc=window.WorkshopLogic.escapeHTML;
 const areas={
  software:{title:'Desenvolvimento de software',meaning:'Cria e mantém programas, sites e aplicativos que resolvem necessidades das pessoas.',work:'Transforma uma ideia em funcionalidades: programa, testa, corrige problemas e melhora a experiência de uso.',jobs:['Desenvolvedor front-end','Desenvolvedor back-end','Desenvolvedor full-stack','Desenvolvedor mobile'],source:'https://learn.microsoft.com/pt-br/training/career-paths/developer'},
  infra:{title:'Suporte e infraestrutura',meaning:'Mantém computadores, redes e serviços funcionando para que as pessoas consigam trabalhar e se conectar.',work:'Atende chamados, configura equipamentos e investiga falhas de conexão, DNS, sistemas e servidores.',jobs:['Analista de suporte','Analista de infraestrutura','Administrador de redes','Administrador de sistemas'],source:'https://learn.microsoft.com/pt-br/training/career-paths/administrator'},
  dados:{title:'Análise de dados',meaning:'Organiza e interpreta informações para ajudar pessoas e empresas a tomar decisões.',work:'Confere a qualidade dos registros, compara resultados e cria relatórios e gráficos. Um campo vazio precisa ser entendido antes de virar zero.',jobs:['Analista de dados','Analista de BI','Engenheiro de dados','Cientista de dados'],source:'https://learn.microsoft.com/pt-br/training/career-paths/data-analyst'},
  cyber:{title:'Cibersegurança',meaning:'Protege informações, contas e sistemas, reduzindo riscos e investigando incidentes.',work:'Identifica riscos, acompanha alertas e define proteções. Conferir a identidade não substitui verificar a permissão para cada ação.',jobs:['Analista de segurança','Analista de SOC','Analista de resposta a incidentes','Especialista em testes de segurança'],source:'https://learn.microsoft.com/pt-br/training/career-paths/security-engineer'}
 };
 let selected='software';
 function render(id){
  if(!areas[id])return;selected=id;
  document.querySelectorAll('[data-clean-career]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cleanCareer===id)));
  const area=areas[id],salaries=data.careers[id].salaries;
  document.querySelector('#career-clean-content').innerHTML='<article class="career-clean-summary"><span class="mini-label">O QUE É A ÁREA?</span><h3>'+esc(area.title)+'</h3><p>'+esc(area.meaning)+'</p><span class="mini-label">O QUE FAZ NO DIA A DIA?</span><p>'+esc(area.work)+'</p><a class="career-source" href="'+area.source+'" target="_blank" rel="noopener noreferrer">Fonte: funções e caminhos de carreira · Microsoft Learn ↗</a></article><aside class="career-clean-details"><div class="career-clean-salary"><span class="mini-label">FAIXA SALARIAL DE REFERÊNCIA</span>'+(salaries.length>1?'<label>Cargo júnior <select id="clean-salary-position">'+salaries.map((s,i)=>'<option value="'+i+'">'+esc(s.job)+'</option>').join('')+'</select></label>':'<p class="clean-salary-job">'+esc(salaries[0].job)+'</p>')+'<strong id="clean-salary-value"></strong><small>por mês · Brasil · Guia Robert Half 2026 · P25–P75</small><a class="career-source" id="clean-salary-source" target="_blank" rel="noopener noreferrer"></a><p class="career-salary-note">Referência do cargo indicado, não piso ou teto da área. Região, empresa e experiência mudam os valores.'+(id==='dados'?' BI é um exemplo de atuação dentro de dados.':'')+'</p></div><div class="career-clean-jobs"><span class="mini-label">ALGUNS CARGOS NESSA ÁREA</span><ul>'+area.jobs.map(job=>'<li>'+esc(job)+'</li>').join('')+'</ul></div></aside>';
  function salary(index){const s=salaries[index];document.querySelector('#clean-salary-value').textContent='R$ '+window.WorkshopExtensionLogic.salaryRange(s);const a=document.querySelector('#clean-salary-source');a.href=s.source;a.textContent='Fonte do cargo e da faixa salarial ↗';}
  document.querySelector('#clean-salary-position')?.addEventListener('change',e=>salary(Number(e.target.value)));salary(0);
 }
 document.querySelectorAll('[data-clean-career]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.cleanCareer)));
 window.CleanCareers={select:render};render(selected);
})();
