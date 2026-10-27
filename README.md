# Fábrica de Software na Prática

Apresentação interativa para alunos do ensino médio · Grupo 04 · UNINASSAU Campus Graças.

**Abrir a apresentação:** https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/

## Oficina de 2h20

São 53 etapas em dez blocos consecutivos: começo, história da internet, HTML, CSS, lógica e JavaScript, desenvolvimento de software, redes e infraestrutura, análise de dados, cibersegurança e participação da turma.

- Design em creme e verde, com navegação por teclado, roteiro, cronômetro e notas de apresentação.
- Web explicada com exemplos visuais: internet, navegador e página têm papéis diferentes.
- Nove laboratórios de código em Web e desenvolvimento, com exemplos mais curtos, resultado ao vivo, dicas e solução.
- Lógica básica antes dos exemplos de JavaScript: sequência, variáveis, condições, repetição e função.
- Carreiras com o que são, por que existem, atividades, ferramentas e uma entrega concreta.
- Redes, dados e cibersegurança com simulações visuais sem editor de código.
- Atividade com cabo e testador de continuidade, com alternativa visual se o equipamento não estiver disponível.
- Histórias de cinco pessoas e três casos reais dentro dos seus assuntos, com fontes.
- Doze perguntas selecionáveis e três formas de conduzir a participação: voluntário, convite ou dupla.

O tempo proposto inclui a participação da turma e as demonstrações. Consulte o [roteiro dos apresentadores](docs/ROTEIRO.md) e as [fontes](docs/FONTES.md).

## Acréscimos desta versão

A navegação reúne cibersegurança em **03 · Carreiras**, com as demais áreas. O novo capítulo **01 · História da internet** compara contribuições em ordem cronológica: Baran e Davies, ARPANET, Cerf e Kahn, Mockapetris e a Web de Berners-Lee. Os três novos laboratórios visuais acrescentam dez minutos; os exemplos e as durações das 50 etapas anteriores foram preservados.

As carreiras ganham painéis de mercado e faixas nacionais de cargos júnior do Guia Robert Half 2026, com cargo, percentis e fontes. Os conceitos de HTML, CSS e JavaScript foram acrescentados abaixo de front-end e back-end, com links para os laboratórios existentes.

## Rodar

Sem instalar dependências, abra `index.html` ou use Node.js 20 ou superior:

```sh
npm start
```

Abra o endereço exibido no terminal. O conteúdo e as simulações funcionam sem internet; os links das referências precisam de conexão.

```sh
npm run check
```

A verificação valida a sintaxe, as regras das práticas, os testes dos exemplos, a ordem dos blocos, os links e a ausência de editores nas carreiras visuais.

## Editar

- `index.html`: telas e conteúdo visual.
- `assets/content.js`: exemplo inicial, dados de apoio e perguntas básicas.
- `assets/course-data.js`: ordem, minutos, notas, desafios e exemplos dos laboratórios.
- `assets/course.js` e `assets/course-logic.js`: simulações visuais e suas regras.
- `assets/course-labs.js`: código da aula, execução isolada e resultado ao lado.
- `assets/course.css`: estilos que estendem o design aprovado.
- `assets/extension-data.js`, `extension-logic.js`, `extension.js` e `extension.css`: acréscimos isolados de história e carreiras.

Os estilos e as ligações de apoio de cada cenário são identificados; o editor mantém o foco no trecho ensinado. O código editável roda em ambiente isolado. As atividades de dados, rede e acesso usam exemplos fictícios e não consultam serviços externos.

## Publicação

GitHub Pages publica automaticamente a raiz da branch `main`. O arquivo `.nojekyll` mantém a publicação estática. O workflow `Verificar apresentação` executa `npm run check`.

Versão 2.2.0.
