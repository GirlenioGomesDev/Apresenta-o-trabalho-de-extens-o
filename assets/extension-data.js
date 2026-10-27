/* Acréscimos solicitados: história da internet e contexto das carreiras. */
window.WorkshopExtension = {
  checkedAt: '2026-10-27',
  marketSource: 'https://www.roberthalf.com/br/pt/insights/guia-salarial/tecnologia',
  salaryMethod: 'https://www.roberthalf.com/br/pt/insights/guia-salarial',
  salaryUnitSource: 'https://www.fiap.com.br/radar-tech/post/salarios-em-tecnologia-2026-quanto-ganham-as-principais-profissoes-tech-no-brasil/',
  careers: {
    software: {
      label: 'Desenvolvimento', href: '#por-tras-do-clique',
      scene: 'lab-software',
      market: 'O guia de 2026 destaca desenvolvedores e analistas de sistemas entre os perfis buscados pelas empresas.',
      skills: ['Programação', 'Testes', 'Trabalho em equipe'],
      example: ['Uma busca precisa funcionar.', 'Criar a tela, a regra e os testes.', 'A pessoa encontra o que procura.'],
      salaries: [{job:'Desenvolvedor(a) Full-Stack Júnior',low:6050,high:8750,source:'https://www.roberthalf.com/br/pt/vagas-detalhes/desenvolvedora-full-stack-junior'}]
    },
    infra: {
      label: 'Suporte / Infra', href: '#lab-infra', scene: 'lab-infra',
      market: 'Redes, infraestrutura e nuvem aparecem entre as necessidades das equipes de tecnologia no guia de 2026.',
      skills: ['Redes', 'Sistemas', 'Comunicação'],
      example: ['A sala ficou sem acesso.', 'Ouvir, testar e localizar a falha.', 'O ambiente volta a funcionar.'],
      salaries: [
        {job:'Analista de Suporte Júnior',low:3350,high:5650,source:'https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-suporte-junior'},
        {job:'Analista de Infraestrutura Júnior',low:4400,high:7450,source:'https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-suporte-junior'}
      ]
    },
    dados: {
      label: 'Dados', href: '#lab-dados', scene: 'lab-dados',
      market: 'O guia de 2026 cita profissionais de dados e de BI, que organizam informações e apoiam decisões.',
      skills: ['Planilhas e SQL', 'Estatística', 'Visualização'],
      example: ['Há números, mas falta uma resposta.', 'Conferir, comparar e interpretar.', 'Uma conclusão com contexto.'],
      salaries: [{job:'Analista de BI Júnior',low:5600,high:9000,source:'https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-bi-junior'}],
      salaryContext: 'BI é um exemplo dentro de dados: usa relatórios e painéis para apoiar decisões. A faixa não representa todos os cargos da área.'
    },
    cyber: {
      label: 'Cibersegurança', href: '#lab-cyber', scene: 'lab-cyber',
      market: 'Cibersegurança está entre as áreas com procura elevada por profissionais especializados no guia de 2026.',
      skills: ['Redes e sistemas', 'Análise de riscos', 'Resposta a incidentes'],
      example: ['Um acesso precisa ser revisado.', 'Conferir identidade e permissão.', 'A ação segue uma regra de proteção.'],
      salaries: [{job:'Analista de Segurança Júnior',low:6200,high:10400,source:'https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-seguranca-junior'}]
    }
  },
  history: [
    {
      id:'internet-pacotes',year:'1964–1969',short:'Pacotes',minutes:3,
      title:'Uma mensagem pode viajar em partes.',
      people:[
        {initials:'PB',name:'Paul Baran',date:'1964 · RAND',contribution:'Estudou mensagens em blocos e redes distribuídas.'},
        {initials:'DD',name:'Donald Davies',date:'1965 · NPL',contribution:'Desenvolveu, independentemente, a comutação de pacotes com sua equipe.'}
      ],
      before:'O desafio: compartilhar conexões e lidar com caminhos indisponíveis.',
      after:'A contribuição: encaminhar pequenas partes e aproveitar caminhos disponíveis.',
      milestone:'1969: a ARPANET começa a conectar centros de pesquisa. Não era a Web; várias equipes participaram.',
      sources:[
        {label:'RAND · Baran, 1964',url:'https://www.rand.org/pubs/research_memoranda/RM3420.html'},
        {label:'NPL · Davies, 1965',url:'https://www.npl.co.uk/about-us/history/timeline'},
        {label:'DARPA · ARPANET, 1969',url:'https://www.darpa.mil/news/features/arpanet'}
      ]
    },
    {
      id:'internet-protocolos',year:'1974–jan. 1983',short:'Redes de redes',minutes:4,
      title:'Redes diferentes precisam combinar como conversar.',
      people:[
        {initials:'VC',name:'Vint Cerf',date:'1974 · artigo com Kahn',contribution:'Cocriou a arquitetura e os protocolos para interligar redes.'},
        {initials:'BK',name:'Bob Kahn',date:'1974 · artigo com Cerf',contribution:'Cocriou a proposta de comunicação entre redes diferentes.'}
      ],
      before:'O desafio: redes com tecnologias e regras próprias não se interligavam facilmente.',
      after:'A contribuição: um conjunto comum de protocolos, preservando as tecnologias internas das redes.',
      milestone:'1º de janeiro de 1983: a ARPANET passa de NCP para TCP/IP. Foi uma transição planejada.',
      sources:[
        {label:'Internet Society · relato dos participantes',url:'https://www.internetsociety.org/internet/history-internet/brief-history-internet/'},
        {label:'RFC 801 · plano de transição',url:'https://www.rfc-editor.org/rfc/rfc801.html'}
      ]
    },
    {
      id:'internet-dns',year:'nov. 1983',short:'Nomes e endereços',minutes:3,
      title:'Uma lista central ficou pequena para tantas máquinas.',
      people:[{initials:'PM',name:'Paul Mockapetris',date:'Novembro de 1983 · RFC 882',contribution:'Descreveu o sistema distribuído de nomes de domínio: DNS.'}],
      before:'Antes: nomes e endereços eram reunidos em uma tabela central, como HOSTS.TXT.',
      after:'Depois: DNS distribui a responsabilidade pelas informações e organiza as consultas.',
      milestone:'Os nomes já existiam. A mudança foi como manter e consultar essas informações em uma rede crescente.',
      sources:[{label:'RFC 882 · documento de Mockapetris',url:'https://www.rfc-editor.org/rfc/rfc882.html'}]
    },
    {id:'origem-web',year:'1989–1993',short:'Web e links'}
  ]
};
