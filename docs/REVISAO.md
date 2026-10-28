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
