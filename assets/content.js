/* Conteúdo editável: tecnologia para alunos do ensino médio. */
window.WorkshopData = {
  "experiences": {
    "site": {
      "title": "Uma página abre no navegador.",
      "text": "Vamos começar pela parte que aparece: conteúdo, aparência e interação na página.",
      "focus": [
        "interface"
      ]
    },
    "conta": {
      "title": "O sistema confirma quem pode entrar.",
      "text": "Além da tela, entram em cena regras de acesso, informações e cuidados de segurança.",
      "focus": [
        "sistema",
        "dados"
      ]
    },
    "conteudo": {
      "title": "Uma lista sugere o que pode interessar.",
      "text": "Dados podem ajudar a organizar conteúdo e apoiar decisões. Alguém precisa analisá-los com cuidado.",
      "focus": [
        "dados",
        "interface"
      ]
    },
    "jogo": {
      "title": "Outras pessoas aparecem na mesma partida.",
      "text": "Interface, regras e conexão trabalham juntas para trocar informações entre os participantes.",
      "focus": [
        "interface",
        "sistema",
        "conexao"
      ]
    }
  },
  "languages": {
    "html": {
      "heading": "HTML / O CONTEÚDO",
      "text": "O título, o texto e o botão já existem. Cada elemento tem seu lugar e significado.",
      "stage": 1
    },
    "css": {
      "heading": "CSS / A APARÊNCIA",
      "text": "O conteúdo é o mesmo. Cores, tamanhos e espaços mudam a forma como ele aparece.",
      "stage": 2
    },
    "js": {
      "heading": "JAVASCRIPT / A INTERAÇÃO",
      "text": "Agora o botão responde a uma ação. Clique e observe a mensagem mudar.",
      "stage": 3
    }
  },
  "example": {
    "html": "<main>\n  <span>MEU PRIMEIRO SITE</span>\n  <h1>Olá, mundo!</h1>\n  <p>Uma página que eu posso transformar.</p>\n  <button id=\"participar\">Testar botão</button>\n  <p id=\"mensagem\" aria-live=\"polite\"></p>\n</main>",
    "css": "* { box-sizing: border-box; }\nbody {\n  margin: 0; padding: 24px;\n  background: #edf3e4; color: #183323;\n  font-family: system-ui, sans-serif;\n}\nmain { max-width: 440px; margin: auto; }\nspan { font-size: 11px; letter-spacing: 2px; }\nh1 { font-size: 36px; line-height: 1.05; margin: 16px 0 12px; }\np { font-size: 15px; line-height: 1.5; margin: 10px 0; }\nbutton {\n  padding: 12px 18px; border: 0;\n  border-radius: 10px; cursor: pointer;\n  background: #c5ec6a; color: #183323;\n  font: 700 14px system-ui, sans-serif;\n}\nbutton:focus-visible { outline: 3px solid #183323; }\n#mensagem { min-height: 32px; font-size: 13px; font-weight: 600; }",
    "js": "const botao = document.querySelector('#participar');\nconst mensagem = document.querySelector('#mensagem');\nlet cliques = 0;\n\nbotao.addEventListener('click', () => {\n  cliques += 1;\n  mensagem.textContent =\n    `Você fez o botão funcionar! Cliques: ${cliques}`;\n});"
  },
  "request": [
    {
      "title": "O navegador envia o pedido",
      "text": "Uma busca ou um acesso pode exigir informações que estão fora do seu dispositivo."
    },
    {
      "title": "O servidor confere as regras",
      "text": "Ele recebe a solicitação e decide o que consultar e o que a pessoa tem permissão para fazer."
    },
    {
      "title": "O sistema consulta informações",
      "text": "Um banco de dados pode guardar conteúdo, preferências e outras informações necessárias ao serviço."
    },
    {
      "title": "A resposta volta para a tela",
      "text": "O navegador recebe o resultado e apresenta a informação. Este é um modelo simplificado do processo."
    }
  ],
  "safety": {
    "contas": {
      "symbol": "•••",
      "heading": "Confirmar quem está acessando.",
      "text": "Senhas diferentes e uma segunda etapa de autenticação ajudam a proteger o acesso à conta."
    },
    "permissoes": {
      "symbol": "✓",
      "heading": "Acesso na medida certa.",
      "text": "Cada pessoa deve conseguir fazer apenas o que está autorizado para seu papel."
    },
    "dados": {
      "symbol": "≡",
      "heading": "Cuidar do que é necessário.",
      "text": "Pedir menos dados, limitar o acesso e manter sistemas atualizados são partes desse cuidado."
    }
  },
  "careers": [
    {
      "id": "software",
      "label": "Desenvolvimento de software",
      "short": "Criar interfaces e comportamentos",
      "symbol": "▱",
      "question": "Como transformar uma ideia em algo que funciona?",
      "description": "Cria e testa as telas, as regras e as interações de sites e aplicativos.",
      "skills": "Lógica, HTML, CSS, JavaScript e trabalho em equipe.",
      "start": "Construir uma página pequena e experimentar mudanças no laboratório.",
      "delivery": "ENTREGA / UMA FUNCIONALIDADE QUE A PESSOA CONSEGUE USAR"
    },
    {
      "id": "infra",
      "label": "Analista de Suporte / Infraestrutura",
      "short": "Ajudar pessoas e manter o ambiente",
      "symbol": "↔",
      "question": "Por que o acesso não está funcionando?",
      "description": "Ajuda usuários e investiga equipamentos, redes e disponibilidade dos serviços.",
      "skills": "Redes, sistemas operacionais, diagnóstico e comunicação.",
      "start": "Entender o caminho entre dispositivo, conexão e serviço.",
      "delivery": "ENTREGA / UM AMBIENTE QUE AS PESSOAS CONSEGUEM UTILIZAR"
    },
    {
      "id": "dados",
      "label": "Analista de Dados",
      "short": "Transformar informações em compreensão",
      "symbol": "▥",
      "question": "O que podemos entender olhando os dados?",
      "description": "Organiza e analisa informações para responder perguntas e apoiar decisões.",
      "skills": "Planilhas, SQL, estatística e visualização de dados.",
      "start": "Organizar uma tabela fictícia e explicar o que ela mostra.",
      "delivery": "ENTREGA / UMA RESPOSTA APOIADA EM INFORMAÇÕES"
    },
    {
      "id": "cyber",
      "label": "Cibersegurança",
      "short": "Reduzir riscos para pessoas e sistemas",
      "symbol": "◇",
      "question": "Como proteger o acesso e as informações?",
      "description": "Avalia riscos, revisa controles e ajuda a prevenir e responder a incidentes.",
      "skills": "Redes, sistemas, proteção de contas e análise de riscos.",
      "start": "Conhecer os cuidados com senhas, permissões e mensagens suspeitas.",
      "delivery": "ENTREGA / CONTROLES E ORIENTAÇÕES PARA REDUZIR RISCOS"
    }
  ],
  "softwareViews": {
    "front": {
      "label": "Front-end",
      "text": "A parte que a pessoa vê e usa: conteúdo, visual e interação.",
      "visual": "interface"
    },
    "back": {
      "label": "Back-end",
      "text": "A parte do servidor: regras, permissões e comunicação com dados.",
      "visual": "regras"
    },
    "full": {
      "label": "Full stack",
      "text": "Trabalha nas duas partes e na ligação entre interface e servidor.",
      "visual": "conexao"
    }
  },
  "demand": [
    {
      "label": "Jogos",
      "value": 24
    },
    {
      "label": "Vídeos",
      "value": 20
    },
    {
      "label": "Música",
      "value": 16
    }
  ],
  "factory": [
    {
      "career": "software",
      "deliverable": "DESENVOLVIMENTO DE SOFTWARE",
      "text": "Investigar o comportamento, corrigir a lógica e testar a interação."
    },
    {
      "career": "infra",
      "deliverable": "SUPORTE / INFRAESTRUTURA",
      "text": "Verificar dispositivo, conexão e disponibilidade. Se houver erro na aplicação, trabalhar junto com desenvolvimento."
    },
    {
      "career": "dados",
      "deliverable": "ANÁLISE DE DADOS",
      "text": "Organizar as informações, comparar resultados e explicar o que elas permitem concluir."
    },
    {
      "career": "cyber",
      "deliverable": "CIBERSEGURANÇA",
      "text": "Investigar o risco, orientar a pessoa e revisar os controles de proteção com a equipe."
    }
  ],
  "starts": {
    "software": {
      "area": "DESENVOLVIMENTO DE SOFTWARE",
      "heading": "Transforme uma ideia em uma página.",
      "text": "Troque o título, escolha uma cor legível e crie uma resposta para o botão.",
      "action": "Experimentar no laboratório",
      "href": "#laboratorio"
    },
    "infra": {
      "area": "SUPORTE / INFRAESTRUTURA",
      "heading": "Entenda o caminho de uma conexão.",
      "text": "Identifique dispositivo, rede e serviço. Pratique como explicar um problema de acesso a outra pessoa.",
      "action": "Rever a simulação de conexão",
      "href": "#carreiras"
    },
    "dados": {
      "area": "ANÁLISE DE DADOS",
      "heading": "Faça uma pergunta a uma tabela.",
      "text": "Use dados fictícios, organize categorias e compare resultados antes de tirar uma conclusão.",
      "action": "Rever a visualização de dados",
      "href": "#carreiras"
    },
    "cyber": {
      "area": "CIBERSEGURANÇA",
      "heading": "Observe os cuidados com uma conta.",
      "text": "Conheça a segunda etapa de autenticação e pratique reconhecer uma mensagem suspeita.",
      "action": "Rever as situações de segurança",
      "href": "#detetive"
    }
  },
  "quiz": [
    {
      "question": "Qual camada cria o título e o texto de uma página?",
      "options": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "correct": 0,
      "explanation": "HTML define a estrutura e o significado do conteúdo. Foi a primeira camada que vimos no laboratório.",
      "review": "linguagens"
    },
    {
      "question": "O conteúdo já existe. Você quer mudar cores e organizar a página no celular. O que usa?",
      "options": [
        "Uma senha",
        "CSS",
        "O roteador"
      ],
      "correct": 1,
      "explanation": "CSS define a apresentação visual e ajuda a adaptar o layout a diferentes tamanhos de tela.",
      "review": "laboratorio"
    },
    {
      "question": "O botão deve mostrar uma mensagem depois de um clique. O que programa essa resposta?",
      "options": [
        "JavaScript",
        "Só a cor do botão",
        "O nome do arquivo"
      ],
      "correct": 0,
      "explanation": "JavaScript pode reagir ao clique e atualizar a página. Esse é um exemplo de comportamento criado no desenvolvimento de software.",
      "review": "laboratorio"
    },
    {
      "question": "Um notebook ficou sem conexão. Qual área atua diretamente na investigação do acesso e da rede?",
      "options": [
        "Análise de Dados",
        "Apenas o design visual",
        "Suporte / Infraestrutura"
      ],
      "correct": 2,
      "explanation": "Suporte e infraestrutura investigam o dispositivo, a conexão e a disponibilidade do serviço, colaborando com outras áreas quando necessário.",
      "review": "carreiras"
    },
    {
      "question": "A equipe precisa comparar uma tabela para entender preferências. Qual área tem esse foco?",
      "options": [
        "Analista de Dados",
        "Somente edição de imagem",
        "Troca de equipamento"
      ],
      "correct": 0,
      "explanation": "A análise de dados organiza e compara informações para responder perguntas. O gráfico mostrado na oficina usa dados fictícios.",
      "review": "carreiras"
    },
    {
      "question": "Uma mensagem exige sua senha e seu código de acesso com urgência. Qual é a melhor atitude?",
      "options": [
        "Enviar para resolver rápido",
        "Confirmar pelo aplicativo ou site oficial, sem compartilhar os segredos",
        "Confiar porque tem um logotipo"
      ],
      "correct": 1,
      "explanation": "Pressa e aparência não confirmam a origem. Verifique pelo canal oficial e não compartilhe senha ou código. Cibersegurança também envolve esses cuidados.",
      "review": "detetive"
    }
  ],
  "notes": {
    "inicio": {
      "time": "Abertura",
      "text": "Apresente a oficina como uma conversa sobre tecnologia para alunos do ensino médio. Mostre a sequência: entender uma página, conhecer cuidados digitais e descobrir quem trabalha nessas partes. Use o botão da abertura, sem mostrar trechos de código fora do laboratório."
    },
    "vida-digital": {
      "time": "Começo da conversa",
      "text": "Convide a turma a escolher situações familiares: site, conta, recomendação ou jogo. Use as partes destacadas para mostrar que existem processos e pessoas por trás da tela. Faça a transição para a interface que aparece no navegador. Os exemplos apenas apoiam o tema tecnologia."
    },
    "linguagens": {
      "time": "HTML, CSS e JavaScript",
      "text": "Alterne as três camadas e compare sempre a mesma página. No HTML, conteúdo; no CSS, visual; no JavaScript, resposta ao clique. A demonstração aqui é visual. Para ler ou alterar código, use o link que abre a camada correspondente no laboratório."
    },
    "laboratorio": {
      "time": "Demonstração prática",
      "text": "Mantenha a explicação ligada às camadas que a turma acabou de ver. Mostre Só HTML, depois CSS e JavaScript. Clique em Testar botão, altere um título ou uma cor e execute. Todos os trechos de código da apresentação ficam aqui. O link Voltar à explicação retoma o ponto de onde vocês vieram."
    },
    "por-tras-do-clique": {
      "time": "Da página ao sistema",
      "text": "Comece com O botão do laboratório: a mudança acontece no navegador. Só depois selecione Uma consulta ao sistema e percorra navegador, servidor, banco e resposta. Diga que a segunda opção é uma simulação do processo. Conecte o assunto à proteção de dados que circulam."
    },
    "codigo-seguro": {
      "time": "Introdução à cibersegurança",
      "text": "Teste Visitante e Editor autorizado. A regra é ilustrativa e roda no navegador; sistemas reais verificam a autorização no servidor. Explore contas, permissões e dados. Este bloco usa fundamentos ligados ao que foi explicado e pode ser ajustado quando o grupo definir o recorte de cibersegurança."
    },
    "detetive": {
      "time": "Segurança no cotidiano",
      "text": "Peça à turma que observe urgência, remetente e pedido de senha ou código. Depois mostre o login não iniciado. O objetivo é praticar uma decisão, com exemplos fictícios. Não há caso real obrigatório nesta sequência; um caso poderá ser incluído depois dentro do recorte de segurança que o grupo escolher."
    },
    "carreiras": {
      "time": "Quatro áreas de carreira",
      "text": "Apresente exatamente quatro grupos: Desenvolvimento de software, Analista de Suporte/Infraestrutura, Analista de Dados e Cibersegurança. Dentro de software, compare front-end, back-end e full stack. Use as simulações de cada área e explique a entrega do profissional, sem prometer salário ou emprego."
    },
    "fabrica": {
      "time": "As áreas colaboram",
      "text": "Percorra as situações e destaque quem investiga cada pergunta. Evite tratar toda falha de acesso como um problema de rede: as áreas colaboram. Se precisar mostrar a lógica de um botão, volte ao laboratório. A tecnologia é o assunto central, sem um projeto fictício dominar a apresentação."
    },
    "quiz": {
      "time": "Participação da turma",
      "text": "Conversem antes de escolher uma resposta. As perguntas retomam, na mesma ordem, construção de páginas, funcionamento e responsabilidades profissionais e segurança. Leia a explicação após cada escolha. As respostas são locais e não medem pessoas ou votos de outros aparelhos."
    },
    "primeiro-projeto": {
      "time": "Primeiros passos",
      "text": "Peça que a turma escolha uma parte que despertou interesse. Mostre uma primeira prática pequena e as referências. Para software, abra o laboratório. Para as outras áreas, retome a simulação correspondente. Cursos técnicos e superiores são possibilidades, não exigências ou promessas iguais para todos."
    },
    "encerramento": {
      "time": "Perguntas e fechamento",
      "text": "Retome a jornada: o que aparece na tela é construído, precisa funcionar e exige cuidado. Há diferentes pessoas trabalhando com cada parte. Convide a turma a contar o que entendeu e qual área despertou interesse."
    },
    "equipe": {
      "time": "Créditos",
      "text": "Agradeça ao público e apresente os integrantes. O conteúdo tem como foco tecnologia para ensino médio. As referências de web e segurança estão disponíveis aqui. Exemplos, mensagens e números das simulações são fictícios, sem coleta de dados reais de alunos."
    }
  }
};
