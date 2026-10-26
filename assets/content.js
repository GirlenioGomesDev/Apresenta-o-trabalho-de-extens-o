/* Conteúdo da oficina, em linguagem acessível para o ensino médio. */
window.WorkshopData = {
  "experiences": {
    "site": {
      "title": "Um título, um texto e um botão aparecem.",
      "text": "HTML organiza o conteúdo. CSS cuida do visual. Vamos separar essas responsabilidades antes de programar.",
      "focus": [
        "interface",
        "conexao"
      ]
    },
    "conta": {
      "title": "Uma explicação se abre quando você escolhe.",
      "text": "Alguns controles HTML já têm comportamento próprio. Vamos experimentar um deles no bloco de HTML.",
      "focus": [
        "interface",
        "sistema"
      ]
    },
    "conteudo": {
      "title": "Você escreve. A página procura um assunto.",
      "text": "JavaScript pode receber o texto digitado, comparar títulos e atualizar a lista. Veremos isso depois da lógica.",
      "focus": [
        "interface",
        "sistema"
      ]
    },
    "jogo": {
      "title": "Uma estrela coletada muda o placar.",
      "text": "Uma regra transforma a quantidade de estrelas em pontos. Alguém precisa criar e testar essa regra.",
      "focus": [
        "sistema",
        "dados"
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
    "css": ":root {\n  --cor: #c5ec6a;\n}\n\nh1 {\n  font-size: 32px;\n}\n\nbutton {\n  border-radius: 10px;\n}",
    "js": "const ganho = 10;\nlet energia = 0;\n\nfunction darEnergia() {\n  energia = energia + ganho;\n  if (energia > 100) {\n    energia = 100;\n  }\n  console.log(\"Energia:\", energia);\n  return energia;\n}"
  },
  "request": [
    {
      "title": "A pessoa faz uma busca na tela",
      "text": "O front-end recebe o texto, por exemplo: “robótica”. O botão e a lista fazem parte da interface."
    },
    {
      "title": "Um serviço procura no catálogo",
      "text": "O back-end recebe a consulta e aplica as regras da busca. Neste exemplo, procura livros pelo título."
    },
    {
      "title": "As informações são consultadas",
      "text": "O catálogo guarda os títulos disponíveis. O serviço reúne os resultados que correspondem à busca."
    },
    {
      "title": "A interface mostra o resultado",
      "text": "O front-end apresenta a lista. As partes precisam combinar o formato do pedido e da resposta. O caminho é simplificado e inteiramente visual."
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
      "text": "A parte do servidor: regras do produto e consulta às informações necessárias.",
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
      "text": "Experimente sequência, variáveis, condições e funções. Depois mude o título, a cor e o comportamento de uma página.",
      "action": "Experimentar no laboratório",
      "href": "#laboratorio"
    },
    "infra": {
      "area": "SUPORTE / INFRAESTRUTURA",
      "heading": "Entenda o caminho de uma conexão.",
      "text": "Identifique dispositivo, rede e serviço. Pratique como explicar um problema de acesso a outra pessoa.",
      "action": "Rever a demonstração de redes",
      "href": "#lab-infra"
    },
    "dados": {
      "area": "ANÁLISE DE DADOS",
      "heading": "Faça uma pergunta a uma tabela.",
      "text": "Use dados fictícios, organize categorias e compare resultados antes de tirar uma conclusão.",
      "action": "Explorar a tabela e o gráfico",
      "href": "#lab-dados"
    },
    "cyber": {
      "area": "CIBERSEGURANÇA",
      "heading": "Observe os cuidados com uma conta.",
      "text": "Conheça a segunda etapa de autenticação e pratique reconhecer uma mensagem suspeita.",
      "action": "Rever o cenário de proteção",
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
      "review": "lab-infra"
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
      "review": "lab-dados"
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
  "notes": {},
  "webLessons": [
    {
      "label": "HTML / ESTRUTURA",
      "text": "As tags dizem o que é título, texto e botão. Troque “Olá, turma!” no h1: o título muda automaticamente na prévia.",
      "preset": "Trocar a saudação →"
    },
    {
      "label": "CSS / APARÊNCIA",
      "text": "Uma regra escolhe o que mudar e um valor define como. Mude --cor ou font-size. O visual de apoio do cenário já está preparado.",
      "preset": "Experimentar tema roxo →"
    },
    {
      "label": "JS / INTERAÇÃO",
      "text": "ganho é o valor de cada clique. energia muda. if impede passar de 100. O botão preparado chama darEnergia e mostra o retorno no robô; console.log mostra o valor abaixo.",
      "preset": "Energia por clique ×5 →"
    }
  ],
  "exampleSupport": {
    "css": "/* Experimente trocar a cor e o tamanho! */\n:root { --cor: #c5ec6a; }\n* { box-sizing: border-box; }\nbody {\n  margin: 0; padding: 28px;\n  background: #edf3e4; color: #183323;\n  font-family: system-ui, sans-serif;\n}\nmain { max-width: 440px; margin: auto; }\nh1 { font-size: 32px; margin: 18px 0 12px; }\np { font-size: 14px; line-height: 1.5; }\nbutton {\n  background: var(--cor); color: #183323;\n  padding: 12px 18px; border: 0;\n  border-radius: 10px; cursor: pointer;\n  font: 700 14px system-ui, sans-serif;\n}\n.robo {\n  width: 84px; height: 62px; margin: 16px 0 24px;\n  position: relative; border: 3px solid #345540;\n  border-radius: 16px; text-align: center;\n  background: linear-gradient(0deg, var(--cor) var(--energia, 0%), #f8fbed 0%);\n  animation: flutuar 2s ease-in-out infinite;\n}\n.robo span { font-size: 32px; line-height: 48px; }\n.robo::after {\n  content: ''; position: absolute;\n  width: 18px; height: 5px; background: #345540;\n  bottom: 8px; left: 30px; border-radius: 5px;\n}\n@keyframes flutuar {\n  50% { transform: translateY(-7px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .robo { animation: none; }\n}",
    "js": "const botao = document.querySelector('#participar');\nbotao.addEventListener('click', () => {\n  const valor = darEnergia();\n  document.querySelector('#mensagem').textContent = 'Energia: ' + valor + '%';\n  document.querySelector('.robo').style.setProperty('--energia', valor + '%');\n});"
  }
};
