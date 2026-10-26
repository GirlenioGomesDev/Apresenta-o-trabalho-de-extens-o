# Guia dos laboratórios progressivos

A sequência contém dez novos experimentos, além dos cinco laboratórios iniciais preservados como aquecimento. A solução pode ser aberta sem perder a primeira tentativa: o botão Voltar à minha tentativa recupera o código anterior.

## HTML já pode ser interativo.

**Etapa:** `#lab-html` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** O “O que vamos experimentar?” precisa de JavaScript para abrir?

**Resposta para quem apresenta:** Não. O elemento details tem comportamento nativo.. Alguns elementos HTML já trazem comportamento. JavaScript amplia as possibilidades; não é necessário recriar cada controle do zero.

**Desafio:** Adicione uma segunda trilha. Mantenha um título e uma descrição dentro de um novo article.

**Dicas graduais:**

- Localize o fechamento do primeiro article.
- Copie a estrutura do article antes do fechamento de section e troque o conteúdo.

**Como explicar:**

- **Organizar:** header apresenta, nav orienta e section reúne conteúdos relacionados. Os nomes ajudam a explicar a página.
- **Relacionar:** O link aponta para o id trilhas. O navegador encontra esse destino dentro da mesma página.
- **Interagir:** details e summary formam uma interação nativa que pode ser usada com mouse ou teclado.

## Um formulário pode orientar.

**Etapa:** `#lab-html-form` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** Se eu clicar no texto “Apelido do personagem”, o que deve acontecer?

**Resposta para quem apresenta:** O campo recebe foco.. O for do label aponta para o id do input. Essa relação dá nome ao campo e amplia a área de interação.

**Desafio:** Exija pelo menos 5 caracteres. Depois teste um apelido de 4 e um de 5 caracteres.

**Dicas graduais:**

- A regra já está no atributo minlength.
- A validação ajuda a pessoa, mas sistemas reais também validam no servidor.

**Como explicar:**

- **Identificar:** label e input se relacionam por for e id. Placeholder não substitui esse nome.
- **Restringir:** required exige uma resposta; minlength define o tamanho mínimo do texto.
- **Retornar:** O JavaScript de apoio pede a validação nativa e escreve uma confirmação local. Não há envio de formulário.

## O mesmo site. Outros tamanhos de tela.

**Etapa:** `#lab-css-layout` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** Se a tela encolher, três colunas fixas continuam sendo uma boa ideia?

**Resposta para quem apresenta:** Depende do espaço: precisamos reorganizar as colunas.. Responsividade adapta a organização ao espaço disponível. O conteúdo pode continuar o mesmo.

**Desafio:** Faça as trilhas virarem uma coluna quando faltar espaço. Teste a prévia estreita e a ampla.

**Dicas graduais:**

- A grade é definida em grid-template-columns.
- Experimente repeat(auto-fit, minmax(170px, 1fr)). Cada item ganha uma largura mínima, sem fixar três colunas.

**Como explicar:**

- **Distribuir:** display: grid cria uma grade. As colunas dividem o espaço e gap separa os itens.
- **Adaptar:** Uma largura mínima impede que o cartão seja comprimido indefinidamente. Quando não cabe, ele muda de linha.
- **Verificar:** Teste larguras diferentes. Um layout deve funcionar para o conteúdo e para a tela, sem depender só do seu notebook.

## Movimento também conta uma história.

**Etapa:** `#lab-css-motion` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** Trocar a duração de 4s para 1s muda o caminho ou a velocidade?

**Resposta para quem apresenta:** A velocidade: o caminho continua definido pelos mesmos extremos.. A duração muda o tempo para percorrer a animação. Os keyframes definem os estados entre os quais o navegador interpola.

**Desafio:** Faça o robô viajar em 2 segundos e compare ease-in-out com linear. Pause para observar.

**Dicas graduais:**

- Procure a linha animation.
- Troque 4s por 2s e ease-in-out por linear. Mantenha a opção de reduzir movimento.

**Como explicar:**

- **Definir estados:** Os keyframes descrevem começo e fim. O navegador calcula os estados intermediários.
- **Escolher o ritmo:** Duração e curva de velocidade mudam a sensação de movimento, sem alterar a mensagem principal.
- **Dar controle:** A pessoa pode pausar. A preferência de reduzir movimento é respeitada: animações não devem ser condição para compreender.

## Como uma busca decide o que mostrar?

**Etapa:** `#lab-js-feed` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** Neste código, “java” encontra o título que começa com “JavaScript”?

**Resposta para quem apresenta:** Não: a comparação original diferencia maiúsculas e minúsculas.. includes diferencia letras maiúsculas e minúsculas. Normalizar os dois textos ajuda a aplicar uma regra consistente.

**Desafio:** Faça “java”, “Java” e “JAVA” encontrarem a mesma trilha. Depois adicione um novo objeto ao catálogo.

**Dicas graduais:**

- A mudança deve ficar na função filtrar.
- Converta título e busca com toLowerCase antes de comparar. Isso não resolve automaticamente acentos; é outra decisão de produto.

**Como explicar:**

- **Modelar:** Cada objeto reúne título e tema. A lista é a fonte dos itens que podem aparecer.
- **Filtrar:** filter mantém os objetos que passam na condição. A regra de busca é uma escolha explícita do código.
- **Renderizar:** O evento input chama a função. Ela refaz a lista visível, atualiza a contagem e registra o resultado no console.

## Escolhas se acumulam. Regras precisam acompanhar.

**Etapa:** `#lab-js-carrinho` · **modalidade:** HTML/CSS/JavaScript com prévia real.

**Antes de editar:** Com limite de 90 min, Web (30) + Dados (40) + Segurança (50) cabe?

**Resposta para quem apresenta:** Não. O total seria 120 minutos.. O que importa para essa regra é a soma do tempo, não apenas quantos itens existem.

**Desafio:** Impeça que a mesma trilha seja adicionada duas vezes. Teste o limite, uma repetição e a remoção.

**Dicas graduais:**

- A verificação precisa acontecer antes de push.
- some permite perguntar se uma trilha com o mesmo nome já existe na lista.

**Como explicar:**

- **Guardar escolhas:** A lista escolhidas representa o estado. push adiciona e pop remove o último elemento.
- **Aplicar limites:** A função total soma os minutos. O if verifica a próxima escolha antes de alterar o estado.
- **Testar sequências:** Não teste só um clique. Combine adicionar, repetir, remover e tentar ultrapassar o limite.

## Passar no primeiro teste não é passar em todos.

**Etapa:** `#lab-software-testes` · **modalidade:** Função JavaScript com saída visual controlada.

**Antes de editar:** Subtrair o pedido do estoque resolve todos os casos?

**Resposta para quem apresenta:** Não: uma conta válida pode desrespeitar a regra do produto.. O programa precisa lidar com limites e entradas inválidas, não apenas realizar uma operação.

**Desafio:** Faça os cinco testes passarem sem mudar os resultados esperados.

**Dicas graduais:**

- Mude a função reservar, não a lista de testes.
- Recuse pedido negativo, zero, fracionário ou maior que o estoque antes de subtrair.

**Como explicar:**

- **Especificar:** Cada caso informa a entrada e o resultado que a regra deve produzir. Isso torna a expectativa verificável.
- **Executar:** A mesma função é chamada para todas as entradas. O programa compara obtido e esperado.
- **Corrigir:** Uma função corrigida precisa preservar os casos que já funcionavam e tratar os limites.

## A mesma tela de erro pode ter causas diferentes.

**Etapa:** `#lab-infra-missao` · **modalidade:** Função JavaScript com saída visual controlada.

**Antes de editar:** Se o serviço respondeu 404, o código deveria apontar primeiro “rede desligada”?

**Resposta para quem apresenta:** Não. O serviço respondeu; precisamos examinar o recurso pedido.. Investigar é usar a evidência disponível. Esse modelo separa conexão, DNS e resposta HTTP.

**Desafio:** Acrescente a pista de lentidão: se o caminho estiver disponível e a latência superar 500 ms, devolva etapa lento.

**Dicas graduais:**

- A nova verificação deve vir depois das falhas de conexão, DNS e HTTP.
- Compare sinais.latencia com 500 antes do retorno pronto.

**Como explicar:**

- **Coletar sinais:** Os controles representam rede, DNS, código HTTP e latência. Eles são dados de um cenário fictício.
- **Priorizar:** Uma etapa depende da anterior. Se não há conexão, não é útil concluir que a resposta do serviço foi boa.
- **Comunicar:** Uma conclusão útil aponta uma pista específica. O modelo não substitui diagnóstico real nem cobre todas as causas.

## Limpar, agrupar, calcular. Depois interpretar.

**Etapa:** `#lab-dados-coleta` · **modalidade:** Função JavaScript com saída visual controlada.

**Antes de editar:** Um registro de 300 minutos afeta a média e a mediana da mesma forma?

**Resposta para quem apresenta:** Não. A média é mais sensível a esse valor extremo.. A média usa todos os valores na soma. A mediana depende da posição dos valores ordenados. Nenhuma das duas dispensa contexto.

**Desafio:** Para esta atividade, considere que a sessão permitia no máximo 120 minutos. Exclua registros acima desse limite e compare os resultados.

**Dicas graduais:**

- A regra de qualidade está em validos.
- Acrescente o limite à condição do filtro. O limite vem do cenário; não descarte um valor só porque ele é inconveniente.

**Como explicar:**

- **Verificar:** null não é uma duração. Number.isFinite ajuda a manter somente valores numéricos válidos.
- **Agrupar:** O código separa por tema e soma minutos. O gráfico mostra tempo acumulado, não quantidade de pessoas.
- **Comparar:** Média e mediana respondem a perguntas diferentes. Um valor extremo pode deslocar a média sem deslocar tanto a mediana.

## Ter um papel não significa ter acesso a tudo.

**Etapa:** `#lab-cyber-regras` · **modalidade:** Função JavaScript com saída visual controlada.

**Antes de editar:** Ser editor deveria permitir alterar o rascunho de qualquer pessoa neste cenário?

**Resposta para quem apresenta:** Não. A regra também exige sessão confirmada e o dono correto.. A permissão depende do contexto do pedido. Esconder um botão na tela não impõe essa regra em um sistema real.

**Desafio:** Faça a decisão coincidir com a política da atividade: sessão confirmada, recurso próprio e ação permitida. Não altere esperado.

**Dicas graduais:**

- Corrija apenas a função autorizar.
- Combine as três verificações com E. Ler o próprio rascunho é permitido aos dois papéis; editar exige editor.

**Como explicar:**

- **Identidade:** O usuário fictício tem id 1. A chave MFA representa uma confirmação já realizada; ela não autentica uma conta real.
- **Contexto:** Cada pedido tem ação e dono. A regra precisa considerar o recurso específico, não só o nome do cargo.
- **Aplicação:** O quadro compara a decisão do código com a política da atividade. Sistemas reais impõem autorização no servidor, em cada operação.

## Sinais esperados para conferir no ensaio

| Prática | Antes / depois |
| --- | --- |
| Busca | `java` não encontra inicialmente; com a normalização, `java`, `Java` e `JAVA` encontram a trilha |
| Grade CSS | Três colunas fixas; solução reorganiza em uma coluna na prévia estreita |
| Estoque | Inicialmente 2/5 testes aprovados; solução aprova os cinco e recusa pedidos negativos, zero, fracionários e maiores que o estoque |
| Diagnóstico | A regra adicional identifica latência de 501 ms como lenta, depois de verificar conexão, DNS e HTTP |
| Dados | Base: média 21 e mediana 21. Com 300 min: média próxima de 60,9 e mediana 22. Com o limite de 120: retorna à base |
| Autorização | Leitor com sessão confirmada pode ler seu próprio rascunho. Editor pode ler e editar o próprio. Outros rascunhos são bloqueados |

Todos os números são fictícios. Os resultados listados correspondem aos exemplos originais; se a turma alterar dados ou política, refaça a previsão e os testes.
