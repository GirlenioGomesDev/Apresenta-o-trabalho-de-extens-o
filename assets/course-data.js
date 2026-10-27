/* Roteiro atual: Web, carreiras resumidas e competição da turma. */
window.WorkshopCourse = {
  "modules": [
    {
      "id": "comeco",
      "title": "Começo · uma ideia de cada vez",
      "minutes": 4
    },
    {
      "id": "fundamentos",
      "title": "Web · entender a página",
      "minutes": 5
    },
    {
      "id": "html",
      "title": "HTML · conteúdo e estrutura",
      "minutes": 22
    },
    {
      "id": "css",
      "title": "CSS · aparência e organização",
      "minutes": 17
    },
    {
      "id": "js",
      "title": "JavaScript · lógica e interação",
      "minutes": 25
    },
    {
      "id": "carreiras",
      "title": "Carreiras · quatro áreas de tecnologia",
      "minutes": 24
    },
    {
      "id": "fechamento",
      "title": "Participar · quiz e próximos passos",
      "minutes": 23
    }
  ],
  "scenes": [
    {
      "id": "inicio",
      "module": "comeco",
      "minutes": 1,
      "title": "Tecnologia por trás da tela",
      "chapter": "abertura"
    },
    {
      "id": "roteiro",
      "module": "comeco",
      "minutes": 1,
      "title": "Nossa trilha de descobertas.",
      "chapter": "abertura"
    },
    {
      "id": "vida-digital",
      "module": "comeco",
      "minutes": 2,
      "title": "Um toque na tela. Muita coisa por trás.",
      "chapter": "abertura"
    },
    {
      "id": "web-na-tela",
      "module": "fundamentos",
      "minutes": 3,
      "title": "Internet, Web e navegador: cada um tem um papel.",
      "chapter": "web"
    },
    {
      "id": "por-tras-do-clique",
      "module": "fundamentos",
      "minutes": 2,
      "title": "Quem cria a tela? Quem cria as regras?",
      "chapter": "web"
    },
    {
      "id": "linguagens",
      "module": "html",
      "minutes": 2,
      "title": "Uma página, três responsabilidades.",
      "chapter": "web"
    },
    {
      "id": "html-estrutura",
      "module": "html",
      "minutes": 3,
      "title": "O navegador lê uma estrutura.",
      "chapter": "web"
    },
    {
      "id": "lab-html",
      "module": "html",
      "minutes": 8,
      "title": "Uma tag, um significado. Uma mudança por vez.",
      "chapter": "web"
    },
    {
      "id": "html-acessivel",
      "module": "html",
      "minutes": 3,
      "title": "Funciona no mouse. E no teclado?",
      "chapter": "web"
    },
    {
      "id": "lab-html-form",
      "module": "html",
      "minutes": 6,
      "title": "Dar nome ao campo e orientar o preenchimento.",
      "chapter": "web"
    },
    {
      "id": "css-aparencia",
      "module": "css",
      "minutes": 2,
      "title": "O mesmo conteúdo. Outra aparência.",
      "chapter": "web"
    },
    {
      "id": "css-caixa",
      "module": "css",
      "minutes": 3,
      "title": "Por que essa caixa ocupa tanto espaço?",
      "chapter": "web"
    },
    {
      "id": "lab-css-layout",
      "module": "css",
      "minutes": 8,
      "title": "O mesmo site. Outros tamanhos de tela.",
      "chapter": "web"
    },
    {
      "id": "lab-css-motion",
      "module": "css",
      "minutes": 4,
      "title": "Movimento também conta uma história.",
      "chapter": "web"
    },
    {
      "id": "logica-passos",
      "module": "js",
      "minutes": 3,
      "title": "Programar começa com instruções em ordem.",
      "chapter": "web"
    },
    {
      "id": "logica-decisoes",
      "module": "js",
      "minutes": 3,
      "title": "Guardar, decidir e repetir.",
      "chapter": "web"
    },
    {
      "id": "js-modelo",
      "module": "js",
      "minutes": 2,
      "title": "Ação → estado → tela.",
      "chapter": "web"
    },
    {
      "id": "laboratorio",
      "module": "js",
      "minutes": 7,
      "title": "Do clique ao console: o primeiro experimento",
      "chapter": "web"
    },
    {
      "id": "lab-js-feed",
      "module": "js",
      "minutes": 5,
      "title": "Como uma busca decide o que mostrar?",
      "chapter": "web"
    },
    {
      "id": "js-desafio",
      "module": "js",
      "minutes": 1,
      "title": "O que significa “funcionar”?",
      "chapter": "web"
    },
    {
      "id": "lab-js-carrinho",
      "module": "js",
      "minutes": 4,
      "title": "Uma soma, uma condição e um limite.",
      "chapter": "web"
    },
    {
      "id": "carreiras",
      "module": "carreiras",
      "minutes": 24,
      "title": "Quatro áreas. Formas diferentes de trabalhar com tecnologia.",
      "chapter": "carreiras"
    },
    {
      "id": "quiz",
      "module": "fechamento",
      "minutes": 20,
      "title": "Quiz da turma: dez perguntas para competir.",
      "chapter": "desafio"
    },
    {
      "id": "primeiro-projeto",
      "module": "fechamento",
      "minutes": 1,
      "title": "Qual parte você quer explorar depois?",
      "chapter": "desafio"
    },
    {
      "id": "encerramento",
      "module": "fechamento",
      "minutes": 1,
      "title": "Você também pode começar a construir.",
      "chapter": "desafio"
    },
    {
      "id": "equipe",
      "module": "fechamento",
      "minutes": 1,
      "title": "Equipe, histórias e fontes verificadas.",
      "chapter": "creditos"
    }
  ],
  "experiments": {
    "lab-html": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Olá, turma!</h1>\n  <p>Uma página começa com conteúdo.</p>\n  <details>\n    <summary>O que podemos criar?</summary>\n    <p>Sites, jogos e novas ideias.</p>\n  </details>\n</main>",
        "css": "",
        "js": ""
      },
      "focus": "html",
      "question": "Todo clique que abre conteúdo exige JavaScript?",
      "options": [
        "Sim, toda interação exige JavaScript.",
        "Não. O elemento details tem comportamento nativo."
      ],
      "correct": 1,
      "feedback": "Alguns elementos HTML já trazem comportamento. JavaScript amplia as possibilidades; não é necessário recriar cada controle do zero.",
      "challenge": "Adicione um subtítulo com h2 e uma frase com p, antes de details. Depois troque a saudação e abra a explicação com o mouse ou teclado.",
      "hints": [
        "Uma tag geralmente abre e fecha: <h2>Meu subtítulo</h2>.",
        "Escreva um novo <p> abaixo do h2. Preserve o main e o details que já existem."
      ],
      "solution": {
        "html": "<main>\n  <h1>Olá, turma!</h1>\n  <p>Uma página começa com conteúdo.</p>\n  <h2>Minha primeira ideia</h2>\n  <p>Um site para recomendar livros.</p>\n  <details>\n    <summary>O que podemos criar?</summary>\n    <p>Sites, jogos e novas ideias.</p>\n  </details>\n</main>"
      },
      "steps": [
        {
          "label": "Ler uma tag",
          "text": "Em <h1>Olá, turma!</h1>, h1 marca o título principal. O texto fica entre a abertura e o fechamento."
        },
        {
          "label": "Organizar",
          "text": "main reúne o conteúdo principal. h2 cria um subtítulo e p marca um parágrafo. A indentação ajuda a enxergar o que está dentro do quê."
        },
        {
          "label": "Experimentar",
          "text": "details e summary criam uma explicação que abre e fecha com comportamento do próprio navegador. O visual básico é fornecido pelo cenário."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n",
        "js": ""
      },
      "supportNote": "O cenário visual já está preparado. O editor mostra o código desta aula; os recursos de apoio aparecem na explicação abaixo."
    },
    "lab-html-form": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Crie um personagem</h1>\n  <form id=\"perfil\">\n    <label for=\"apelido\">Apelido do personagem</label>\n    <input id=\"apelido\" required minlength=\"3\">\n    <button type=\"button\" id=\"validar\">Testar campo</button>\n  </form>\n  <output id=\"saida\" aria-live=\"polite\"></output>\n</main>",
        "css": "",
        "js": ""
      },
      "focus": "html",
      "question": "Se eu clicar no texto “Apelido do personagem”, o que deve acontecer?",
      "options": [
        "O campo recebe foco.",
        "Nada: o texto é só decoração."
      ],
      "correct": 0,
      "feedback": "O for do label aponta para o id do input. Essa relação dá nome ao campo e amplia a área de interação.",
      "challenge": "Exija pelo menos 5 caracteres. Depois teste um apelido de 4 e um de 5 caracteres.",
      "hints": [
        "Troque o número em minlength, mantendo as aspas.",
        "Digite no campo da prévia para testar: quatro letras não bastam quando o mínimo é cinco. A checagem é local."
      ],
      "solution": {
        "html": "<main>\n  <h1>Crie um personagem</h1>\n  <form id=\"perfil\">\n    <label for=\"apelido\">Apelido do personagem</label>\n    <input id=\"apelido\" required minlength=\"5\">\n    <button type=\"button\" id=\"validar\">Testar campo</button>\n  </form>\n  <output id=\"saida\" aria-live=\"polite\"></output>\n</main>"
      },
      "steps": [
        {
          "label": "Identificar",
          "text": "label e input se relacionam por for e id. Placeholder não substitui esse nome."
        },
        {
          "label": "Restringir",
          "text": "required exige uma resposta; minlength define o tamanho mínimo do texto."
        },
        {
          "label": "Testar",
          "text": "O botão preparado pede ao navegador para verificar o campo e mostra uma confirmação local. Na aula, modificamos required e minlength no HTML."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n",
        "js": "const formulario = document.querySelector('#perfil');\ndocument.querySelector('#validar').addEventListener('click', () => {\n  if (!formulario.reportValidity()) return;\n  const nome = document.querySelector('#apelido').value;\n  document.querySelector('#saida').textContent = nome + ': campo válido!';\n});"
      },
      "supportNote": "O visual e o botão de teste estão preparados com CSS e JavaScript de apoio. Aqui editamos apenas o HTML do campo. Nada é enviado."
    },
    "lab-css-layout": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Um cartão ao lado do outro</h1>\n  <div class=\"grade\">\n    <article><h2>Aprender</h2><p>Entender uma ideia.</p></article>\n    <article><h2>Experimentar</h2><p>Mudar uma coisa.</p></article>\n    <article><h2>Compartilhar</h2><p>Explicar o resultado.</p></article>\n  </div>\n</main>",
        "css": ".grade {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 12px;\n}",
        "js": ""
      },
      "focus": "css",
      "question": "Se a tela encolher, três colunas fixas continuam sendo uma boa ideia?",
      "options": [
        "Sempre, porque o conteúdo não mudou.",
        "Depende do espaço: precisamos reorganizar as colunas."
      ],
      "correct": 1,
      "feedback": "Responsividade adapta a organização ao espaço disponível. O conteúdo pode continuar o mesmo.",
      "challenge": "Faça as trilhas virarem uma coluna quando faltar espaço. Teste a prévia estreita e a ampla.",
      "hints": [
        "1fr 1fr 1fr significa três partes de mesmo tamanho. Só 1fr significa uma coluna.",
        "Use @media (max-width: 400px) para aplicar uma coluna somente quando a tela for estreita."
      ],
      "solution": {
        "css": ".grade {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 12px;\n}\n\n@media (max-width: 400px) {\n  .grade {\n    grid-template-columns: 1fr;\n  }\n}"
      },
      "steps": [
        {
          "label": "Selecionar",
          "text": ".grade seleciona o elemento com class=\"grade\". As regras dentro das chaves dizem como ele deve aparecer."
        },
        {
          "label": "Distribuir",
          "text": "display: grid organiza em grade. 1fr 1fr 1fr divide a largura em três partes iguais; gap cria o espaço entre elas."
        },
        {
          "label": "Adaptar",
          "text": "A solução usa uma condição de largura: em telas de até 400 px, as colunas viram uma só. Compare Ampla e Estreita."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n\n.grade article { min-width:0; margin:0; }",
        "js": ""
      },
      "supportNote": "O cenário visual já está preparado. O editor mostra o código desta aula; os recursos de apoio aparecem na explicação abaixo."
    },
    "lab-css-motion": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Como esse movimento foi criado?</h1>\n  <div class=\"pista\"><div class=\"robo\" aria-label=\"Robô\">•‿•</div></div>\n  <p><button id=\"pausar\">Pausar movimento</button></p>\n  <p id=\"aviso\">Observe a duração e o caminho.</p>\n</main>",
        "css": ".robo {\n  animation: viajar 4s ease-in-out infinite alternate;\n}\n\n@keyframes viajar {\n  from { left: 0; }\n  to { left: calc(100% - 60px); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .robo { animation: none; }\n}",
        "js": ""
      },
      "focus": "css",
      "question": "Trocar a duração de 4s para 1s muda o caminho ou a velocidade?",
      "options": [
        "O caminho.",
        "A velocidade: o caminho continua definido pelos mesmos extremos."
      ],
      "correct": 1,
      "feedback": "A duração muda o tempo para percorrer a animação. Os keyframes definem os estados entre os quais o navegador interpola.",
      "challenge": "Faça o robô viajar em 2 segundos e compare ease-in-out com linear. Pause para observar.",
      "hints": [
        "Procure a linha animation.",
        "Troque 4s por 2s e ease-in-out por linear. Mantenha a opção de reduzir movimento."
      ],
      "solution": {
        "css": ".robo {\n  animation: viajar 2s linear infinite alternate;\n}\n\n@keyframes viajar {\n  from { left: 0; }\n  to { left: calc(100% - 60px); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .robo { animation: none; }\n}"
      },
      "steps": [
        {
          "label": "Definir estados",
          "text": "Os keyframes descrevem começo e fim. O navegador calcula os estados intermediários."
        },
        {
          "label": "Escolher o ritmo",
          "text": "Duração e curva de velocidade mudam a sensação de movimento, sem alterar a mensagem principal."
        },
        {
          "label": "Dar controle",
          "text": "A pessoa pode pausar. A preferência de reduzir movimento é respeitada: animações não devem ser condição para compreender."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n\n.pista { position:relative; height:130px; background:#dfeacb; border-radius:12px; }\n.robo {\n  position:absolute; left:0; bottom:16px;\n  width:60px; height:54px; padding-top:8px;\n  border:3px solid #345540; border-radius:14px;\n  background:#c5ec6a; text-align:center; font-weight:700;\n}\n.pausado .robo { animation-play-state:paused; }",
        "js": "const botao = document.querySelector('#pausar');\nbotao.addEventListener('click', () => {\n  const pausado = document.body.classList.toggle('pausado');\n  botao.textContent = pausado ? 'Continuar movimento' : 'Pausar movimento';\n});"
      },
      "supportNote": "O robô, a pista e o botão de pausa já estão preparados. O CSS deste editor define somente o movimento e respeita a preferência de reduzir animações."
    },
    "lab-js-feed": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Biblioteca de descobertas</h1>\n  <label for=\"busca\">Buscar por título</label>\n  <input id=\"busca\" placeholder=\"Experimente digitar java\" autocomplete=\"off\">\n  <p id=\"contagem\" aria-live=\"polite\"></p>\n  <ul id=\"resultados\"></ul>\n</main>",
        "css": "",
        "js": "const titulos = [\"HTML: conteúdo\", \"CSS: visual\", \"JavaScript: interação\"];\n\nfunction buscar(texto) {\n  const encontrados = [];\n\n  for (const titulo of titulos) {\n    if (titulo.includes(texto)) {\n      encontrados.push(titulo);\n    }\n  }\n\n  console.log(\"Resultados:\", encontrados.length);\n  return encontrados;\n}"
      },
      "focus": "js",
      "question": "Neste código, “java” encontra o título que começa com “JavaScript”?",
      "options": [
        "Sim, sempre.",
        "Não: a comparação original diferencia maiúsculas e minúsculas."
      ],
      "correct": 1,
      "feedback": "includes diferencia letras maiúsculas e minúsculas. Normalizar os dois textos ajuda a aplicar uma regra consistente.",
      "challenge": "Faça a busca encontrar JavaScript mesmo com java, Java ou JAVA. A função recebe o texto digitado e devolve os títulos encontrados para a interface preparada.",
      "hints": [
        "A comparação inicial diferencia letras maiúsculas e minúsculas. toLowerCase() transforma o texto em minúsculas.",
        "Compare titulo.toLowerCase() com texto.toLowerCase() dentro de includes. Depois teste java e JAVA."
      ],
      "solution": {
        "js": "const titulos = [\"HTML: conteúdo\", \"CSS: visual\", \"JavaScript: interação\"];\n\nfunction buscar(texto) {\n  const encontrados = [];\n\n  for (const titulo of titulos) {\n    if (titulo.toLowerCase().includes(texto.toLowerCase())) {\n      encontrados.push(titulo);\n    }\n  }\n\n  console.log(\"Resultados:\", encontrados.length);\n  return encontrados;\n}"
      },
      "steps": [
        {
          "label": "Guardar",
          "text": "titulos guarda uma lista. A função buscar recebe o texto digitado; encontrados começa como uma lista vazia."
        },
        {
          "label": "Repetir e decidir",
          "text": "for percorre cada título. if pergunta se ele inclui o texto procurado. Quando inclui, push adiciona o título à lista de resultados."
        },
        {
          "label": "Devolver",
          "text": "return devolve a lista encontrada. O cenário preparado desenha essa lista ao lado. console.log mostra quantos resultados foram encontrados."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n",
        "js": "const campo = document.querySelector('#busca');\nfunction atualizarLista() {\n  const encontrados = buscar(campo.value);\n  const lista = document.querySelector('#resultados');\n  lista.replaceChildren();\n  for (const titulo of encontrados) {\n    const item = document.createElement('li');\n    item.textContent = titulo;\n    lista.appendChild(item);\n  }\n  document.querySelector('#contagem').textContent = encontrados.length + ' resultados';\n}\ncampo.addEventListener('input', atualizarLista);\natualizarLista();"
      },
      "supportNote": "A caixa de busca e a atualização visual já estão preparadas. O editor contém a função que decide quais títulos entram no resultado."
    },
    "lab-js-carrinho": {
      "type": "web",
      "files": {
        "html": "<main>\n  <h1>Monte seu tempo de descoberta</h1>\n  <p>Escolha atividades sem ultrapassar o limite.</p>\n  <button data-minutos=\"30\">Web +30 min</button>\n  <button data-minutos=\"40\">Jogos +40 min</button>\n  <button data-minutos=\"20\">Robótica +20 min</button>\n  <h2 id=\"total\"></h2>\n  <p id=\"feedback\" aria-live=\"polite\"></p>\n  <button id=\"recomecar\">Recomeçar</button>\n</main>",
        "css": "",
        "js": "const limite = 90;\nlet total = 0;\n\nfunction adicionar(minutos) {\n  if (total + minutos > limite) {\n    console.log(\"Não cabe no limite.\");\n    return false;\n  }\n\n  total = total + minutos;\n  console.log(\"Total de minutos:\", total);\n  return true;\n}"
      },
      "focus": "js",
      "question": "Com limite de 90 min, Web (30) + Jogos (40) + Robótica (20) cabe exatamente?",
      "options": [
        "Sim: 30 + 40 + 20 = 90.",
        "Não: chegar ao limite já seria ultrapassar."
      ],
      "correct": 0,
      "feedback": "Chegar ao limite é diferente de ultrapassá-lo. A condição usa >, que significa maior que. Compare também com >=, maior ou igual.",
      "challenge": "Teste uma combinação que dá exatamente 90 min e outra que ultrapassa. Depois mude o limite para 120 min. Antes de executar, a turma deve prever qual escolha passa a caber.",
      "hints": [
        "A constante limite está na primeira linha. total guarda o tempo acumulado.",
        "Troque 90 por 120. O if recusa somente quando a soma fica maior que o limite; return false encerra essa tentativa."
      ],
      "solution": {
        "js": "const limite = 120;\nlet total = 0;\n\nfunction adicionar(minutos) {\n  if (total + minutos > limite) {\n    console.log(\"Não cabe no limite.\");\n    return false;\n  }\n\n  total = total + minutos;\n  console.log(\"Total de minutos:\", total);\n  return true;\n}"
      },
      "steps": [
        {
          "label": "Guardar valores",
          "text": "limite é o máximo permitido. total começa em zero e muda quando uma atividade é adicionada."
        },
        {
          "label": "Tomar a decisão",
          "text": "if testa a soma antes de mudar o total. Se ultrapassar o limite, a função retorna false e não adiciona a atividade."
        },
        {
          "label": "Atualizar",
          "text": "Quando a escolha cabe, total recebe a soma e a função retorna true. Os botões preparados chamam adicionar e mostram o valor ao lado."
        }
      ],
      "support": {
        "css": "* { box-sizing: border-box; }\nbody { margin:0; padding:24px; background:#edf3e4; color:#183323; font:15px/1.6 system-ui,sans-serif; }\nmain { max-width:620px; margin:auto; }\nh1 { font-size:28px; line-height:1.15; }\nh2 { font-size:20px; }\narticle, .painel { background:#fffef8; padding:18px; margin:14px 0; border:1px solid #cfdbc0; border-radius:12px; }\nbutton { background:#c5ec6a; color:#183323; border:0; border-radius:7px; padding:10px 14px; font:600 14px system-ui; cursor:pointer; }\ninput,select { max-width:100%; padding:10px; font:14px system-ui; border:1px solid #a8bc95; border-radius:6px; }\nlabel { display:block; margin:12px 0; }\na,summary { color:#325b30; cursor:pointer; }\nbutton:focus-visible,a:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible { outline:3px solid #526f36; outline-offset:3px; }\noutput { display:block; margin-top:14px; font-weight:600; }\n",
        "js": "function desenharTotal() {\n  document.querySelector('#total').textContent = total + ' de ' + limite + ' min';\n}\ndocument.querySelectorAll('[data-minutos]').forEach(botao => {\n  botao.addEventListener('click', () => {\n    const aceito = adicionar(Number(botao.dataset.minutos));\n    document.querySelector('#feedback').textContent = aceito ? 'Atividade adicionada.' : 'Essa escolha ultrapassa o limite.';\n    desenharTotal();\n  });\n});\ndocument.querySelector('#recomecar').addEventListener('click', () => {\n  total = 0;\n  document.querySelector('#feedback').textContent = 'Vamos escolher de novo.';\n  desenharTotal();\n});\ndesenharTotal();"
      },
      "supportNote": "Os botões e a atualização do texto já estão preparados. A função adicionar contém a decisão que vamos ler e modificar."
    },
    "lab-software-testes": {
      "type": "function",
      "view": "tests",
      "input": {
        "pedido": 2
      },
      "code": "function reservar(estoque, pedido) {\n  return estoque - pedido;\n}\nconst casos = [\n  { nome:'Pedido normal', estoque:5, pedido:2, esperado:3 },\n  { nome:'Última unidade', estoque:1, pedido:1, esperado:0 },\n  { nome:'Estoque insuficiente', estoque:2, pedido:5, esperado:'recusado' },\n  { nome:'Pedido negativo', estoque:3, pedido:-1, esperado:'recusado' },\n  { nome:'Fração de unidade', estoque:3, pedido:1.5, esperado:'recusado' }\n];\nconst testes = casos.map(caso => {\n  const obtido = reservar(caso.estoque, caso.pedido);\n  return { nome:caso.nome, esperado:caso.esperado, obtido,\n    passou:obtido === caso.esperado };\n});\nconsole.log('Testes aprovados:', testes.filter(t => t.passou).length);\nmostrar({ testes, restante:reservar(3, entrada.pedido) });",
      "solution": {
        "code": "function reservar(estoque, pedido) {\n  if (!Number.isInteger(pedido) || pedido <= 0 || pedido > estoque) {\n    return 'recusado';\n  }\n  return estoque - pedido;\n}\nconst casos = [\n  { nome:'Pedido normal', estoque:5, pedido:2, esperado:3 },\n  { nome:'Última unidade', estoque:1, pedido:1, esperado:0 },\n  { nome:'Estoque insuficiente', estoque:2, pedido:5, esperado:'recusado' },\n  { nome:'Pedido negativo', estoque:3, pedido:-1, esperado:'recusado' },\n  { nome:'Fração de unidade', estoque:3, pedido:1.5, esperado:'recusado' }\n];\nconst testes = casos.map(caso => {\n  const obtido = reservar(caso.estoque, caso.pedido);\n  return { nome:caso.nome, esperado:caso.esperado, obtido,\n    passou:obtido === caso.esperado };\n});\nconsole.log('Testes aprovados:', testes.filter(t => t.passou).length);\nmostrar({ testes, restante:reservar(3, entrada.pedido) });"
      },
      "question": "Subtrair o pedido do estoque resolve todos os casos?",
      "options": [
        "Sim, a conta está matematicamente correta.",
        "Não: uma conta válida pode desrespeitar a regra do produto."
      ],
      "correct": 1,
      "feedback": "O programa precisa lidar com limites e entradas inválidas, não apenas realizar uma operação.",
      "challenge": "Faça os cinco testes passarem sem mudar os resultados esperados.",
      "hints": [
        "Mude a função reservar, não a lista de testes.",
        "Recuse pedido negativo, zero, fracionário ou maior que o estoque antes de subtrair."
      ],
      "steps": [
        {
          "label": "Especificar",
          "text": "Cada caso informa a entrada e o resultado que a regra deve produzir. Isso torna a expectativa verificável."
        },
        {
          "label": "Executar",
          "text": "A mesma função é chamada para todas as entradas. O programa compara obtido e esperado."
        },
        {
          "label": "Corrigir",
          "text": "Uma função corrigida precisa preservar os casos que já funcionavam e tratar os limites."
        }
      ]
    }
  },
  "sources": {
    "web": {
      "label": "CERN · A short history of the Web",
      "url": "https://home.cern/science/computing/the-birth-of-the-web/short-history-web/"
    },
    "css": {
      "label": "W3C · proposta original de Håkon Wium Lie, 1994",
      "url": "https://www.w3.org/People/howcome/p/cascade.html"
    },
    "hopper": {
      "label": "Computer History Museum · entrevista com Grace Hopper",
      "url": "https://archive.computerhistory.org/resources/text/Oral_History/Hopper_Grace/102702026.05.01.pdf"
    },
    "radia": {
      "label": "LACNIC · entrevista com Radia Perlman",
      "url": "https://blog.lacnic.net/en/an-interview-with-internet-pioneer-radia-perlman/"
    },
    "katherine": {
      "label": "NASA · biografia de Katherine Johnson",
      "url": "https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/"
    },
    "ariane": {
      "label": "ESA · conclusões da investigação, 23/07/1996",
      "url": "https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report"
    },
    "gitlab": {
      "label": "GitLab · postmortem do incidente de 31/01/2017",
      "url": "https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/"
    },
    "wannacry": {
      "label": "NAO · investigação WannaCry e NHS, 2017",
      "url": "https://www.nao.org.uk/reports/investigation-wannacry-cyber-attack-and-the-nhs/"
    },
    "react": {
      "label": "React · referência de organização didática",
      "url": "https://react.dev/"
    },
    "cable": {
      "title": "Fluke Networks · Network Cable Testers",
      "url": "https://www.flukenetworks.com/expertise/learn-about/cable-testing"
    }
  },
  "notes": {
    "inicio": {
      "time": "1 min / Começo · uma ideia de cada vez",
      "text": "Apresente a proposta sem exigir conhecimento anterior. Convide a turma a observar, prever e experimentar. Explique que o grupo vai construir uma página, entender sua lógica e conhecer quatro áreas profissionais."
    },
    "roteiro": {
      "time": "1 min / Começo · uma ideia de cada vez",
      "text": "Mostre uma trajetória: compreender a página, construir conteúdo com HTML, organizar com CSS, programar interações com JavaScript e conhecer as carreiras. A oficina reserva tempo para a turma prever e experimentar. Participar abre diretamente a competição de dez perguntas."
    },
    "vida-digital": {
      "time": "2 min / Começo · uma ideia de cada vez",
      "text": "Escolha apenas uma ou duas situações familiares. Peça exemplos do que aparece e do que muda na página. Não antecipe diagnósticos de rede ou segurança: cada área terá seu próprio bloco."
    },
    "web-na-tela": {
      "time": "3 min / Web · entender a página",
      "text": "Pergunte qual aplicativo usam para abrir um site. Diferencie internet, Web e navegador com os três cartões. Passe pelas quatro etapas e só depois habilite o botão. A animação é um modelo, não uma requisição real. Pergunte: onde entram HTML, CSS e JavaScript?"
    },
    "por-tras-do-clique": {
      "time": "2 min / Web · entender a página",
      "text": "Use uma busca de livros para explicar front-end, back-end e full stack. A interface recebe a busca; o serviço procura no catálogo; a resposta vira lista. Não introduza regras de segurança aqui. Elas ficam no bloco de cibersegurança. Abaixo, os três cartões retomam os conceitos de HTML, CSS e JavaScript e abrem os laboratórios já existentes, sem substituí-los."
    },
    "linguagens": {
      "time": "2 min / HTML · conteúdo e estrutura",
      "text": "Compare sempre a mesma página. HTML organiza o conteúdo; CSS dá forma; JavaScript cria a resposta programada. Os links abrem o laboratório já no bloco correspondente, para evitar pular assuntos."
    },
    "html-estrutura": {
      "time": "3 min / HTML · conteúdo e estrutura",
      "text": "Comece pelo título e pelo parágrafo. Explique que uma tag dá significado ao conteúdo. Mostre a organização visual da página e depois abra o laboratório, com oito linhas de HTML."
    },
    "lab-html": {
      "time": "8 min / HTML · conteúdo e estrutura",
      "text": "Leia uma tag com a turma: abertura, conteúdo e fechamento. Mude primeiro apenas a saudação. Depois peça um subtítulo e uma frase; deixe alguém prever onde aparecerão. Abra e feche details. Visual de apoio separado; nenhuma outra linguagem precisa ser editada nesta etapa."
    },
    "html-acessivel": {
      "time": "3 min / HTML · conteúdo e estrutura",
      "text": "Demonstre usando Tab e Enter. Pergunte qual controle recebe foco. Explique acessibilidade pelo uso real, sem uma lista de termos. Um botão nativo já traz formas de operação que uma caixa clicável não oferece."
    },
    "lab-html-form": {
      "time": "6 min / HTML · conteúdo e estrutura",
      "text": "Clique no label e veja o foco no campo. Deixe vazio, digite um personagem de duas letras e depois de três. Troque minlength de 3 para 5 e teste quatro e cinco letras. O botão está preparado com JavaScript de apoio; o foco desta aula é o HTML."
    },
    "css-aparencia": {
      "time": "2 min / CSS · aparência e organização",
      "text": "Compare o mesmo conteúdo em duas apresentações. Pergunte o que mudou e o que continuou. Explique CSS como regras de aparência e organização, sem alterar a mensagem. Depois investigue a caixa e experimente no laboratório."
    },
    "css-caixa": {
      "time": "3 min / CSS · aparência e organização",
      "text": "Peça uma previsão e mova um controle de cada vez. Padding é espaço interno; borda contorna; margem fica por fora. A soma é uma extensão opcional: primeiro garanta que a turma reconhece as partes."
    },
    "lab-css-layout": {
      "time": "8 min / CSS · aparência e organização",
      "text": "Mostre as cinco linhas de CSS. Explique seletor, propriedade e valor com a regra da grade. Compare Ampla e Estreita. Use a dica de uma coluna e a solução com media query. Peça que expliquem por que o conteúdo não mudou."
    },
    "lab-css-motion": {
      "time": "4 min / CSS · aparência e organização",
      "text": "Leia somente a linha animation antes dos detalhes. Troque 4s por 2s e peça uma previsão. Compare linear e ease-in-out. O botão de pausa e o desenho estão preparados. Respeite reduzir movimento e explique também com a animação parada."
    },
    "logica-passos": {
      "time": "3 min / JavaScript · lógica e interação",
      "text": "Convide: alguém quer dar a primeira instrução? Monte um erro de ordem, como pegar antes de andar, e execute um passo por vez. Depois teste andar três vezes e pegar. Peça à turma que explique o erro como instrução, não como culpa do robô. Limpar reinicia o programa e a posição."
    },
    "logica-decisoes": {
      "time": "3 min / JavaScript · lógica e interação",
      "text": "Retome o mesmo robô. Variável guarda um valor; condição escolhe o caminho; repetição executa de novo; função dá nome à tarefa. Mude passos de 2 para 3 e depois para 5. Peça previsões antes de mover. Não introduza todos os detalhes de sintaxe nesta tela."
    },
    "js-modelo": {
      "time": "2 min / JavaScript · lógica e interação",
      "text": "Clique e acompanhe ação, valor guardado e texto atualizado. Conecte com a variável da tela anterior. A próxima tela abre a função que produz a mudança."
    },
    "laboratorio": {
      "time": "7 min / JavaScript · lógica e interação",
      "text": "Abra a etapa JavaScript. Leia ganho, energia, soma, limite e return. O botão preparado chama darEnergia; o cenário atualiza o robô. Troque ganho de 10 para 50 e teste dois cliques. O terceiro continua em 100. console.log mostra os valores. Cada edição reinicia o exemplo."
    },
    "lab-js-feed": {
      "time": "5 min / JavaScript · lógica e interação",
      "text": "Antes de digitar java, peça uma previsão. Explique a função em três partes: recebe texto, percorre títulos e devolve os encontrados. O desenho da lista está preparado. Teste Java e JAVA, use as dicas para normalizar a comparação e compare os resultados. Não é preciso ensinar manipulação completa do DOM agora."
    },
    "js-desafio": {
      "time": "1 min / JavaScript · lógica e interação",
      "text": "Retome a busca com uma pergunta curta: funcionar significa o quê para a pessoa que usa? Escolham uma alternativa e justifiquem. Evite trocar o assunto: esta tela ainda é sobre o comportamento da busca."
    },
    "lab-js-carrinho": {
      "time": "4 min / JavaScript · lógica e interação",
      "text": "Teste 30 + 40 + 20 = 90. Pergunte se chegar ao limite é ultrapassar. Tente adicionar mais. Mude o limite para 120 e repita. Compare > com >= como extensão opcional. A interface dos botões está preparada; a função contém a regra que a turma lê."
    },
    "carreiras": {
      "time": "24 min / Carreiras · quatro áreas de tecnologia",
      "text": "Explore uma área por vez, com cerca de seis minutos para cada uma e perguntas da turma. Leia conceito, atividades e exemplos de cargos. A faixa é a referência nacional do cargo júnior indicado no Guia Robert Half 2026, entre os percentis 25 e 75; não é salário garantido, piso ou teto. Em suporte/infra, cada cargo tem sua própria faixa. BI é um exemplo dentro de dados. Abra as fontes se surgir dúvida."
    },
    "quiz": {
      "time": "20 min / Participar · quiz e próximos passos",
      "text": "Crie a sala no painel integrado e projete o QR. Alunos abrem o link no navegador e escolhem um apelido. Cada pergunta vale cem pontos por acerto; empates dividem a posição. A rodada fecha ao final do tempo, quando todos responderem ou por comando do apresentador. Mostre a explicação e o placar após cada questão e avance. Use o link de janela maior se o projetor precisar. Celulares e apresentador precisam de internet. Não compartilhe a sessão do apresentador: o QR contém somente o endereço de entrada e o código da sala."
    },
    "primeiro-projeto": {
      "time": "1 min / Participar · quiz e próximos passos",
      "text": "Peça que cada pessoa pense em uma primeira prática: uma página, um diagnóstico, uma tabela ou um cuidado com a conta. Os links permitem continuar após a oficina."
    },
    "encerramento": {
      "time": "1 min / Participar · quiz e próximos passos",
      "text": "Retome o que aprenderam: organizar conteúdo, dar forma, criar uma regra e reconhecer diferentes profissões. Convide a turma a compartilhar o que ficou curioso para aprender depois."
    },
    "equipe": {
      "time": "1 min / Participar · quiz e próximos passos",
      "text": "Agradeça ao público e apresente os seis integrantes, sem matrículas. As histórias e os casos têm fontes acessíveis nos links. O funcionamento dos exemplos é local."
    }
  },
  "choices": {
    "produto": {
      "correct": 1,
      "feedback": "A linguagem executa regras; pessoas precisam entender a necessidade, combinar o comportamento e testar se ele foi atendido."
    },
    "grafico": {
      "correct": 0,
      "feedback": "O aumento é 3 sobre uma base de 15: 20%. Mudar o eixo altera a percepção visual, não esses valores."
    },
    "incidente": {
      "correct": 1,
      "feedback": "Negar um pedido desconhecido evita uma autorização indevida. Verificar e comunicar pelo canal oficial ajuda a equipe a responder."
    }
  },
  "missions": [],
  "extraQuiz": [],
  "chapters": [
    {
      "id": "abertura",
      "number": "00",
      "title": "Começo",
      "description": "Um ponto de partida no seu cotidiano."
    },
    {
      "id": "web",
      "number": "01",
      "title": "Web",
      "description": "Entender → HTML → CSS → JavaScript."
    },
    {
      "id": "carreiras",
      "number": "02",
      "title": "Carreiras",
      "description": "Área, atividades, cargos e salários."
    },
    {
      "id": "desafio",
      "number": "03",
      "title": "Participar",
      "description": "Quiz com dez perguntas, QR e placar ao vivo."
    },
    {
      "id": "creditos",
      "number": "04",
      "title": "Equipe",
      "description": "Integrantes e referências."
    }
  ]
};
Object.assign(window.WorkshopData.notes, window.WorkshopCourse.notes);
