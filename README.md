# Fábrica de Software na Prática

Apresentação interativa para alunos do ensino médio · Grupo 04 · UNINASSAU Campus Graças.

**[Abrir a apresentação](https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/)** · versão 2.4.0

## Uma oficina de 2 horas

São **26 etapas, 120 minutos sugeridos e cinco capítulos**. O tempo inclui previsões, experimentos e conversa com a turma.

| Capítulo | Caminho | Tempo |
| --- | --- | ---: |
| 00 · Começo | Situações próximas dos alunos e roteiro. | 4 min |
| 01 · Web | Entender a página → HTML → CSS → lógica e JavaScript. | 69 min |
| 02 · Carreiras | Software, suporte/infraestrutura, dados e cibersegurança. | 24 min |
| 03 · Participar | Quiz próprio de dez perguntas e próximos passos. | 22 min |
| 04 · Equipe | Créditos e fontes. | 1 min |

- A Web evolui uma ideia por vez, com exemplos e sete laboratórios ativos: seis do curso e o laboratório do robô. Código e resultado ficam próximos.
- Carreiras mostram apenas conceito, o que o profissional faz, exemplos de cargos, faixa salarial identificada e fontes. Há um seletor para cada uma das quatro áreas.
- Participar abre diretamente o quiz. A aba Internet e as duas introduções da participação saíram da navegação.
- O design mantém a base em creme e verde, com cores mais vivas, fonte Manrope local e letras maiores.
- Roteiro, notas, cronômetro, tela cheia e navegação por teclado continuam disponíveis.

Veja o [roteiro dos apresentadores](docs/ROTEIRO.md), as [fontes](docs/FONTES.md) e a [operação do quiz](docs/QUIZ.md).

## Competição integrada

Em **Participar**, escolha o tempo e clique em **Criar sala e mostrar QR**. Os alunos abrem a câmera do Android ou iPhone, tocam no link e escolhem um apelido. O apresentador inicia e avança as rodadas.

São dez perguntas, 100 pontos por acerto e empate compartilhado. Após cada pergunta, todos recebem a resposta comentada e o placar atualizado automaticamente. Não há conta nem aplicativo a instalar. O quiz usa código próprio deste repositório e um banco compartilhado entre os participantes.

**A competição exige internet.** Os exemplos da aula e laboratórios continuam locais. O QR contém um endereço HTTPS normal e o código da sala; o controle do apresentador não é compartilhado com os alunos.

## Rodar localmente

Use **Node.js 22.13 ou superior**, sem instalar dependências:

```sh
npm start
```

Abra o endereço mostrado no terminal. Esse comando serve o material e a API do quiz, com SQLite local em `.quiz/local.sqlite` (ignorado pelo Git). Para simular um aluno local, abra `competicao.html?sala=CODIGO` no mesmo servidor. O QR projetado aponta sempre para a versão pública da oficina.

```sh
npm run check
```

A verificação cobre ordem e duração das etapas, exemplos, ausência de editores nas carreiras, dez perguntas e as regras reais do quiz: permissão do apresentador, respostas únicas, prazos, pontuação, empates, dez rodadas, concorrência e CORS.

## Editar e publicar

- `index.html`: conteúdo e telas da oficina.
- `assets/course-data.js`: sequência, notas, tempo e exemplos.
- `assets/course*.js`, `assets/app.js` e os arquivos de laboratório: interações da aula.
- `assets/career-clean.js`: quatro áreas e ligações às fontes.
- `assets/clarity.css`: tipografia e ajustes visuais desta versão.
- `competicao.html`, `assets/quiz-live.*` e `assets/quiz-embed.js`: telas do apresentador/aluno e integração na oficina.
- `server/quiz-service.mjs`, `server/quiz-questions.mjs` e `server/quiz-schema.sql`: API, perguntas, regras e banco do quiz.

O GitHub Pages publica a raiz de `main`. O workflow **Verificar apresentação** roda os testes. O Pages hospeda arquivos estáticos; a API própria roda no runtime do projeto existente com D1. Alterações no servidor precisam ser publicadas também nesse runtime; um push no Pages, sozinho, não atualiza a API. Detalhes em [QUIZ.md](docs/QUIZ.md).

Arquivos históricos de versões anteriores permanecem no repositório como referência e não são carregados pela apresentação atual. Créditos: Manrope sob SIL OFL em `assets/manrope-ofl.txt`; gerador QR Nayuki sob MIT, preservado no cabeçalho de `assets/quiz-qr-vendor.js`.
