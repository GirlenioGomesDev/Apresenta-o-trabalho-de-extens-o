/* Acréscimos isolados: não substitui os editores, demonstrações ou controles existentes. */
(function(){
  'use strict';
  const data=window.WorkshopExtension,logic=window.WorkshopExtensionLogic,course=window.WorkshopCourse;
  const esc=window.WorkshopLogic.escapeHTML;
  const $=selector=>document.querySelector(selector),$$=selector=>Array.from(document.querySelectorAll(selector));
  const external=(url,label)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';

  // All career subjects, including cybersecurity, share the same chapter and navigation.
  $$('.scene[data-chapter="carreiras"]').forEach(scene=>{
    const meta=course.scenes.find(item=>item.id===scene.id),nav=document.createElement('nav');
    nav.className='career-subnav';nav.setAttribute('aria-label','Áreas do módulo 03, Carreiras');
    nav.innerHTML='<a href="#carreiras" class="career-subnav-label">03 / CARREIRAS</a>'+Object.entries(data.careers).map(([id,career])=>'<a href="'+career.href+'"'+(meta.module===id&&scene.id!=='carreiras'?' class="active" aria-current="page"':'')+'>'+esc(career.label)+'</a>').join('');
    scene.prepend(nav);
  });

  $$('[data-career-context]').forEach(host=>{
    const area=host.dataset.careerContext,career=data.careers[area];
    const control=career.salaries.length>1?'<label class="salary-position-label">Cargo de referência <select data-salary-position aria-label="Cargo de referência em '+esc(career.label)+'">'+career.salaries.map((sample,index)=>'<option value="'+index+'">'+esc(sample.job)+'</option>').join('')+'</select></label>':'<p class="salary-position" data-salary-position-name>'+esc(career.salaries[0].job)+'</p>';
    host.innerHTML='<div class="career-market-panel"><article class="career-market-reading"><span class="mini-label">MERCADO / GUIA 2026</span><h3>Onde essa área aparece hoje?</h3><p>'+esc(career.market)+'</p><div class="career-skill-tags">'+career.skills.map(skill=>'<span>'+esc(skill)+'</span>').join('')+'</div>'+external(data.marketSource,'Fonte: tendências em tecnologia')+'</article><article class="career-salary-reading"><span class="mini-label">FAIXA DE REFERÊNCIA / JÚNIOR / BRASIL</span>'+control+'<strong class="salary-range" data-salary-range></strong><span class="salary-unit">por mês · Guia Robert Half 2026 · P25–P75</span><div class="salary-source" data-salary-source></div>'+(career.salaryContext?'<p class="salary-context">'+esc(career.salaryContext)+'</p>':'')+'<details class="salary-method"><summary>Como ler essa faixa?</summary><p>Exemplo de cargo do guia, entre os percentis 25 e 75. Não é piso ou teto de toda a profissão. A referência considera novas contratações e exclui bônus e benefícios. Região, empresa e experiência mudam os valores.</p>'+external(data.salaryMethod,'Metodologia do guia')+' '+external(data.salaryUnitSource,'Unidade mensal: FIAP')+'</details><small class="salary-checked">Consulta: 27/10/2026.</small></article></div><div class="career-mini-case">'+career.example.map((text,index)=>'<div><span>'+['PROBLEMA','TRABALHO','ENTREGA'][index]+'</span><p>'+esc(text)+'</p></div>').join('<i aria-hidden="true">→</i>')+'</div>';
    function showSalary(index){
      const sample=career.salaries[index]||career.salaries[0];
      host.querySelector('[data-salary-range]').textContent='R$ '+logic.salaryRange(sample);
      host.querySelector('[data-salary-source]').innerHTML=external(sample.source,'Fonte do cargo e da faixa');
    }
    host.querySelector('select')?.addEventListener('change',event=>showSalary(Number(event.target.value)));
    showSalary(0);
  });

  $$('[data-history-timeline]').forEach(nav=>{
    nav.innerHTML=data.history.map(item=>'<a href="#'+item.id+'"'+(nav.dataset.historyTimeline===item.id?' aria-current="step"':'')+'><b>'+esc(item.year)+'</b><span>'+esc(item.short)+'</span></a>').join('');
  });
  $$('[data-history-contribution]').forEach(host=>{
    const item=data.history.find(item=>item.id===host.dataset.historyContribution);
    host.innerHTML='<div class="internet-contribution"><div class="internet-people">'+item.people.map(person=>'<article><span class="internet-person-initials" aria-hidden="true">'+esc(person.initials)+'</span><div><h3>'+esc(person.name)+'</h3><small>'+esc(person.date)+'</small><p>'+esc(person.contribution)+'</p></div></article>').join('')+'</div><div><div class="internet-before-after"><div><span>PROBLEMA / ANTES</span><p>'+esc(item.before)+'</p></div><div><span>CONTRIBUIÇÃO / DEPOIS</span><p>'+esc(item.after)+'</p></div></div><p class="internet-milestone">'+esc(item.milestone)+'</p><div class="internet-sources">'+item.sources.map(source=>external(source.url,source.label)).join('')+'</div></div></div>';
  });

  let packets=[],arrivalOrder=[],arrived=[];
  function showArrivals(){
    $('#history-packet-arrivals').innerHTML=arrived.map(packet=>'<span><b>'+packet.id+'</b>'+esc(packet.text)+'</span>').join('');
    const result=logic.assemblePackets(arrived,packets.length);
    $('#history-reassembled').textContent=result===null?'Aguardando as partes: '+arrived.length+'/'+packets.length+'.':'Mensagem reorganizada: '+result;
    $('#history-send-packet').disabled=!packets.length||arrived.length>=packets.length;
  }
  function resetPackets(){
    const message=Array.from($('#history-message').value).slice(0,24).join('');$('#history-message').value=message;
    packets=logic.makePackets(message);arrived=[];
    arrivalOrder=packets.length>1?[packets.at(-1),...packets.slice(0,-1)]:packets.slice();
    $('#history-whole-message').textContent=message||'Escreva uma mensagem de exemplo.';
    $('#history-packet-tray').innerHTML=packets.map(packet=>'<span><b>'+packet.id+'</b>'+esc(packet.text)+'</span>').join('');
    $('#history-packet-network').dataset.route=$('#history-route').value;
    $('#history-packet-network').classList.remove('packet-in-flight');
    $('#history-moving-packet').textContent='';
    $('#history-packet-feedback').textContent='Façam uma previsão: qual parte chegará primeiro? Alterar a mensagem ou o caminho recomeça este exemplo.';
    showArrivals();
  }
  $('#history-message').addEventListener('input',resetPackets);
  $('#history-route').addEventListener('change',resetPackets);
  $('#history-packet-reset').addEventListener('click',resetPackets);
  $('#history-send-packet').addEventListener('click',()=>{
    const route=logic.packetRoute($('#history-route').value);
    if(!route){$('#history-packet-feedback').textContent='Nenhum caminho disponível: o próximo pacote não foi enviado. Dividir a mensagem não cria uma conexão inexistente.';return;}
    const packet=arrivalOrder[arrived.length];if(!packet)return;
    arrived.push(packet);
    const network=$('#history-packet-network');network.classList.remove('packet-in-flight');void network.offsetWidth;
    $('#history-moving-packet').textContent=packet.id;network.classList.add('packet-in-flight');
    $('#history-packet-feedback').textContent='Pacote '+packet.id+' enviado pelo '+route+'. '+(arrived.length===packets.length?'Agora as pontas podem reorganizar a mensagem.':'Ainda faltam partes para reconstruir a mensagem inteira.');
    showArrivals();
  });resetPackets();

  function showProtocol(){
    const shared=$('#history-common-protocol').checked;
    $('#history-protocol-networks').classList.toggle('protocol-shared',shared);
    $('#history-protocol-networks').classList.remove('protocol-sending');
    $('#history-protocol-feedback').textContent=shared?'Depois: os dois lados usam um conjunto comum. A rede A e a rede B mantêm suas tecnologias internas.':'Antes: as duas redes deste modelo ainda não combinam um conjunto comum de protocolos.';
  }
  $('#history-common-protocol').addEventListener('change',showProtocol);
  $('#history-send-protocol').addEventListener('click',()=>{
    const network=$('#history-protocol-networks');network.classList.remove('protocol-sending');
    if(!$('#history-common-protocol').checked){$('#history-protocol-feedback').textContent='Neste modelo, falta o conjunto comum nos dois lados. O equipamento sozinho não resolve a incompatibilidade.';return;}
    void network.offsetWidth;network.classList.add('protocol-sending');
    $('#history-protocol-feedback').textContent='A mensagem atravessou a interligação do modelo. Tecnologias diferentes podem participar de uma rede de redes.';
  });showProtocol();

  let dnsStep=0;
  function resetDNS(){
    dnsStep=0;$('#history-dns-next').disabled=false;
    $$('[data-history-dns-step]').forEach(step=>{step.classList.remove('current','completed');step.removeAttribute('aria-current');});
    $('#history-dns-result').textContent='Qual endereço corresponde a '+$('#history-dns-name').value+'?';
    $('#history-dns-feedback').textContent='O nome já existe. Vamos acompanhar quem indica o próximo responsável.';
  }
  $('#history-dns-name').addEventListener('change',resetDNS);$('#history-dns-reset').addEventListener('click',resetDNS);
  $('#history-dns-next').addEventListener('click',()=>{
    if(dnsStep>=3)return;
    const name=$('#history-dns-name').value,address=logic.lookupExample(name);
    const explanations=['A raiz indica onde consultar a terminação .test neste modelo.','O responsável por .test indica quem responde por '+name+'.','O servidor responsável informa o endereço associado a '+name+'.'];
    $('#history-dns-feedback').textContent=explanations[dnsStep];
    $$('[data-history-dns-step]').forEach((step,index)=>{step.classList.toggle('current',index===dnsStep);step.classList.toggle('completed',index<dnsStep);if(index===dnsStep)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');});
    dnsStep++;
    if(dnsStep===3){$('#history-dns-result').textContent=name+' → '+(address||'não encontrado');$('#history-dns-next').disabled=true;}
  });resetDNS();

  function showWebLinks(){
    const linked=$('#history-web-linked').checked;
    $('#history-web-documents').classList.toggle('web-documents-linked',linked);
    $$('[data-history-document]').forEach((button,index)=>{button.disabled=index>0&&!linked;button.setAttribute('aria-pressed',String(index===0));});
    $('#history-web-feedback').textContent=linked?'Documento A aberto. Os links permitem chegar aos documentos B e C. Escolha um destino.':'Neste modelo sem links, os documentos B e C não podem ser abertos a partir do A. Ative os links e explore.';
  }
  $('#history-web-linked').addEventListener('change',showWebLinks);
  $$('[data-history-document]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-history-document]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    const name=String.fromCharCode(65+Number(button.dataset.historyDocument));
    $('#history-web-feedback').textContent='Documento '+name+' aberto. Um link conecta este conteúdo a outro destino; você não precisa copiar seu endereço manualmente.';
  }));showWebLinks();
})();
