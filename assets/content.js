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
    "html": "<main>\n  <div class=\"robo\"><span>• •</span></div>\n  <h1>Olá, turma!</h1>\n  <p id=\"mensagem\">Vamos criar com tecnologia?</p>\n  <button id=\"participar\">Dar energia</button>\n</main>",
    "css": "/* Experimente trocar a cor e o tamanho! */\n:root { --cor: #c5ec6a; }\n* { box-sizing: border-box; }\nbody {\n  margin: 0; padding: 28px;\n  background: #edf3e4; color: #183323;\n  font-family: system-ui, sans-serif;\n}\nmain { max-width: 440px; margin: auto; }\nh1 { font-size: 32px; margin: 18px 0 12px; }\np { font-size: 14px; line-height: 1.5; }\nbutton {\n  background: var(--cor); color: #183323;\n  padding: 12px 18px; border: 0;\n  border-radius: 10px; cursor: pointer;\n  font: 700 14px system-ui, sans-serif;\n}\n.robo {\n  width: 84px; height: 62px; margin: 16px 0 24px;\n  position: relative; border: 3px solid #345540;\n  border-radius: 16px; text-align: center;\n  background: linear-gradient(0deg, var(--cor) var(--energia, 0%), #f8fbed 0%);\n  animation: flutuar 2s ease-in-out infinite;\n}\n.robo span { font-size: 32px; line-height: 48px; }\n.robo::after {\n  content: ''; position: absolute;\n  width: 18px; height: 5px; background: #345540;\n  bottom: 8px; left: 30px; border-radius: 5px;\n}\n@keyframes flutuar {\n  50% { transform: translateY(-7px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .robo { animation: none; }\n}",
    "js": "const ganho = 10;\nlet energia = 0;\nconst botao = document.querySelector('#participar');\nconst mensagem = document.querySelector('#mensagem');\nconst robo = document.querySelector('.robo');\n\nbotao.addEventListener('click', () => {\n  energia = Math.min(100, energia + ganho);\n  mensagem.textContent = `Energia: ${energia}%`;\n  robo.style.setProperty('--energia', `${energia}%`);\n  console.log('Energia do robô:', energia);\n});\n\nconsole.log('Robô pronto! Ganho por clique:', ganho);"
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
      "action": "Abrir laboratório de suporte",
      "href": "#lab-infra"
    },
    "dados": {
      "area": "ANÁLISE DE DADOS",
      "heading": "Faça uma pergunta a uma tabela.",
      "text": "Use dados fictícios, organize categorias e compare resultados antes de tirar uma conclusão.",
      "action": "Abrir laboratório de dados",
      "href": "#lab-dados"
    },
    "cyber": {
      "area": "CIBERSEGURANÇA",
      "heading": "Observe os cuidados com uma conta.",
      "text": "Conheça a segunda etapa de autenticação e pratique reconhecer uma mensagem suspeita.",
      "action": "Abrir laboratório de cibersegurança",
      "href": "#lab-cyber"
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
      "text": "Convide a turma a entender a tecnologia construindo e testando. Explique o padrão: código, o que ele faz e resultado ao vivo. As demonstrações usam exemplos fictícios e não precisam de contas nem dados pessoais."
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
      "time": "HTML → CSS → JavaScript / 5–7 min",
      "text": "Mostre só HTML e troque o h1. A mudança é automática. Vá para CSS, altere --cor e observe o robô e o botão. Na etapa JS, clique em Dar energia e acompanhe console e preenchimento. Troque ganho de 10 para 50 e clique novamente. Cada edição reinicia o exemplo. Pause Atualizar ao digitar quando quiser preparar várias linhas antes de executar."
    },
    "por-tras-do-clique": {
      "time": "Da página às profissões",
      "text": "Compare a ação local com a consulta ao sistema. A segunda representação é simplificada e não faz requisições. Ligue as partes da tecnologia às quatro áreas que vamos experimentar a seguir."
    },
    "codigo-seguro": {
      "time": "Retomar os fundamentos",
      "text": "Conecte a porta do laboratório a contas, permissões e dados. Use a simulação de visitante e editor como uma revisão da autorização. A demonstração anterior combinou duas condições; aqui o recorte é apenas o papel da pessoa. Evite apresentar controles de interface como segurança suficiente de um sistema real."
    },
    "detetive": {
      "time": "Segurança no cotidiano",
      "text": "Peça à turma que observe urgência, remetente e pedido de senha ou código. Depois mostre o login não iniciado. O objetivo é praticar uma decisão, com exemplos fictícios. Não há caso real obrigatório nesta sequência; um caso poderá ser incluído depois dentro do recorte de segurança que o grupo escolher."
    },
    "carreiras": {
      "time": "Um laboratório por área",
      "text": "Apresente os quatro papéis e siga a ordem das demonstrações. Os cartões também permitem saltar a um laboratório. Todos usam JavaScript para facilitar a comparação; isso não significa que a profissão trabalhe apenas com essa linguagem. Dentro de desenvolvimento, explique que front-end cuida da interface e back-end das regras e serviços; full stack trabalha com ambos."
    },
    "fabrica": {
      "time": "Conexão entre as áreas",
      "text": "Retome as quatro experiências e peça à turma quem começaria cada investigação. Os links abrem os laboratórios correspondentes. As áreas colaboram e uma falha pode envolver mais de uma delas."
    },
    "quiz": {
      "time": "Participação da turma",
      "text": "Conversem antes de escolher uma resposta. As perguntas retomam, na mesma ordem, construção de páginas, funcionamento e responsabilidades profissionais e segurança. Leia a explicação após cada escolha. As respostas são locais e não medem pessoas ou votos de outros aparelhos."
    },
    "primeiro-projeto": {
      "time": "Escolha uma primeira prática",
      "text": "Deixe a turma escolher uma área e reabra o laboratório para uma alteração. Cada exemplo tem restauração, execução manual e opção de atualização automática. Depois mostre as referências para continuar os estudos."
    },
    "encerramento": {
      "time": "Perguntas e fechamento",
      "text": "Retome a jornada: o que aparece na tela é construído, precisa funcionar e exige cuidado. Há diferentes pessoas trabalhando com cada parte. Convide a turma a contar o que entendeu e qual área despertou interesse."
    },
    "equipe": {
      "time": "Créditos",
      "text": "Agradeça ao público e apresente os integrantes. O conteúdo tem como foco tecnologia para ensino médio. As referências de web e segurança estão disponíveis aqui. Exemplos, mensagens e números das simulações são fictícios, sem coleta de dados reais de alunos."
    },
    "lab-software": {
      "time": "Desenvolvimento / 3–4 min",
      "text": "Pergunte quantos pontos virão com duas estrelas. Colete uma e veja console e placar. Leia a função e o return. Troque 10 por 50: o resultado é recalculado. Clique nas três etapas abaixo do editor para explicar entrada, regra e saída. Diga que desenvolver inclui criar, testar e melhorar, além de escrever código."
    },
    "lab-infra": {
      "time": "Suporte e infraestrutura / 3–4 min",
      "text": "Comece com rede desligada e servidor ativo. Envie o pacote, ligue a rede e desligue o servidor. Compare o caminho animado com o diagnóstico calculado. Abra o desafio: a função fica sem a verificação de rede. Desligue a rede e mantenha servidor ativo. O código pode informar online enquanto a animação para. Pergunte qual if falta e corrija; Restaurar recupera a solução. Tudo é simulado, sem consultar a rede real."
    },
    "lab-dados": {
      "time": "Análise de dados / 3–4 min",
      "text": "Leia a lista na ordem Jogos, Vídeos e Música. Peça uma previsão antes de mudar 12 para 30. A barra e o total mudam junto com o código. Compare outra amostra. Explique o acumulador de reduce usando a soma dos três números, sem aprofundar sintaxe. Ressalte que são quantidades fictícias; análise também verifica qualidade e contexto."
    },
    "lab-cyber": {
      "time": "Cibersegurança / 4 min",
      "text": "Teste visitante com e sem segunda etapa; depois editor nas duas condições. Explique E: só as duas condições abrem a porta. Selecione revisor e use Incluir o papel revisor: a nova regra passa a aceitá-lo com segunda etapa. Mostre console. Diferencie autenticação e autorização; em produção, decisões de autorização ficam no servidor. Não há contas, senhas ou ataques reais."
    }
  },
  "webLessons": [
    {
      "label": "HTML / ESTRUTURA",
      "text": "As tags dizem o que é título, texto e botão. Troque “Olá, turma!” no h1: o título muda automaticamente na prévia.",
      "preset": "Trocar a saudação →"
    },
    {
      "label": "CSS / APARÊNCIA",
      "text": "As regras escolhem cor, tamanho e movimento. Mude a variável --cor: o botão e a energia do robô usam a nova cor.",
      "preset": "Experimentar tema roxo →"
    },
    {
      "label": "JS / INTERAÇÃO",
      "text": "O clique soma energia, atualiza a mensagem e preenche o robô. console.log mostra o valor no console. Mude ganho para 50 e teste.",
      "preset": "Energia por clique ×5 →"
    }
  ]
};
