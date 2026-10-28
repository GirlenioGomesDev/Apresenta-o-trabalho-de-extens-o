# Acabamento visual - versão 2.7.2

| Problema observado | Correção |
| --- | --- |
| Na abertura, a legenda branca ficava sobre o cartão claro e próxima do botão Testar ideia. | Cartões e legenda acompanham o fluxo e a altura real do conteúdo. A legenda fica abaixo do cartão, sobre o fundo escuro. |
| O quadro escuro da abertura era coberto pelo cartão do resultado. | Os três exemplos de HTML, CSS e JavaScript ficam inteiros, mantendo cores e inclinação dos cartões. |
| Abas, faixas salariais, nomes, opções e alguns diagramas podiam ultrapassar seus próprios cartões, mesmo sem uma barra de rolagem na página. | Grades, preenchimentos, quebras de linha e larguras mínimas foram ajustados. Abas menores continuam disponíveis e utilizáveis. |
| Rótulos de rede podiam passar por uma cor quase branca sobre uma superfície clara. | O texto muda imediatamente de cor; transformações e sombras mantêm sua transição. |
| O caminho do diagnóstico aparecia antes dos controles, com números de leitura fora da sequência visual. | A estrutura mostra primeiro os controles (01), depois a evidência (02) e a hipótese (03). O caminho fica vertical em telas menores. |

A revisão mantém os conteúdos, as demonstrações, as fotografias, os dados das carreiras e o cronograma. Foram conferidos contraste, transbordamento da página, limites internos dos cartões e títulos numerados nas 55 páginas no computador e em larguras simuladas de 320 e 390 px. A verificação de largura no navegador não equivale a um ensaio em celulares físicos.

---

# Ajustes das imagens - versão 2.7.1

| Pendência | Correção |
| --- | --- |
| Texto do quiz encostado na borda esquerda, inclusive ao mostrar o QR. | Margem interna responsiva no próprio quiz embutido; a grade reserva espaço para texto e QR. |
| Ao selecionar Estreita, títulos invadiam outros cartões ou eram cortados. | Quebra de palavras dentro dos cartões, preenchimento adaptável e prévia de até 360 px. |
| O conteúdo reorganizado em uma coluna ultrapassava a altura original da prévia. | A altura acompanha o conteúdo e as mudanças de largura. A mensagem de ajuste é aceita somente do iframe e token correspondentes, com limites de altura. |
| Número e título de leitura podiam sobrepor o começo do desafio ou de outro bloco. | Espaço superior reservado também em componentes com preenchimento próprio, com ajuste para telas menores. |

Verificação desta revisão:

- 41 testes automatizados aprovados (`npm run check`).
- 55 páginas conferidas no computador e em uma área de 390 px: sem transbordamento horizontal ou colisão entre o título numerado e o começo do conteúdo.
- Seis laboratórios Web conferidos em tela menor, sem transbordamento horizontal no resultado.
- Troca Ampla/Estreita, solução em uma coluna, edição ao vivo e restauração. A prévia cresceu de 410 para 626 px ao receber mais conteúdo e voltou a 410 px ao restaurar.
- Quiz em larguras de 320, 390, 700, 768, 1024 e 1366 px. Criação da sala, QR, entrada de aluno, pergunta, resposta e placar de 100 pontos verificados no ambiente de teste.

O exercício de grade conserva as três colunas do código inicial; a solução usa `@media` para reorganizar em uma coluna. O conteúdo passa a permanecer dentro de cada cartão durante essa comparação. Histórias, fotos, cronograma, carreiras e práticas foram preservados. Os testes de largura foram realizados no navegador, sem aparelhos físicos Android ou iOS.

---

# Revisão da apresentação - versão 2.7

## Correções confirmadas

| Situação observada | Correção |
| --- | --- |
| No exemplo de CSS, a superfície escurecia enquanto o título e o parágrafo continuavam escuros. | Texto e fundo usam a mesma definição de superfície. A troca de cor é imediata, preservando a mudança de forma. |
| Textos quase apagados nos cartões, rótulos, pistas, console e resultados; alguns botões sem contraste quando selecionados. | Paleta coerente por superfície; estados normal, selecionado, desativado, erro e foco com texto legível. |
| Confirmação de campo válido podia permanecer após editar o apelido; o tamanho mínimo podia não ser verificado em um valor preenchido por script. | A validação consulta o mínimo atual, informa o motivo da recusa e limpa o retorno anterior ao editar. Envio tratado localmente. |
| A seleção de uma escolha insegura ou hipótese incompatível podia usar a mesma indicação de uma escolha adequada. | O retorno identifica a necessidade de revisão, com texto e cor próprios. `aria-pressed` acompanha a seleção. |
| Notas de DNS antecipavam a Web antes de Radia e NSFNET; o caso GitLab era descrito como fechamento da infraestrutura. | Notas corrigidas para acompanhar o histórico existente, sem retirar pessoas, casos ou demonstrações. |
| Erros intencionais nos exercícios podiam parecer uma falha do aplicativo. | Busca sensível a maiúsculas e regra de estoque incompleta são identificadas como desafios antes de executar. |

## Verificação realizada

- `npm run check`: 41 testes aprovados, incluindo quatro regressões do formulário.
- 55 páginas revisadas no Chrome, com medição de contraste do texto renderizado e conferência dos destinos dos links internos.
- As 55 páginas verificadas em uma área de 390 px de largura, sem transbordamento horizontal.
- Edição HTML, CSS e JavaScript; prévia ao vivo, dicas, solução, retorno à tentativa, restauração, console e execução manual.
- Loop infinito no laboratório de funções interrompido após um segundo, mantendo a apresentação responsiva.
- Fita e hipóteses de Turing, fotos ampliadas, pacotes sem rota, protocolos, DNS e documentos conectados.
- Três estados de cabeamento; diagnóstico de conexão, DNS e HTTP 503; perda e restauração de registros.
- Amostra vazia, campo ausente, valor fora do contexto, média e regra de exclusão; identidade, papéis, dono do arquivo e decisões de segurança.
- Quiz percorrido por apresentador e aluno de teste em abas distintas, da entrada à classificação após dez perguntas. Testes de API também cobrem prazos, concorrência, empates e autorização.

A medição de contraste é uma verificação dos componentes e estados revisados, não uma certificação de acessibilidade. O teste de largura foi realizado no navegador; não equivale a um ensaio em aparelhos físicos Android e iOS.

## Preservação

55 páginas, 160 minutos sugeridos, nove laboratórios de código e todas as práticas visuais mantidos. Fotos, pessoas e fontes históricas foram preservadas. A competição permanece no próprio projeto. Nenhuma nova linha do tempo foi acrescentada à interface nesta revisão; o relatório didático foi entregue separadamente.

Referência da correção do formulário: [MDN - Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation). `minlength` pode não ser conferido para valores preenchidos por script, mesmo ao chamar a API de validação.
