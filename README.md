# Fábrica de Software na Prática

Oficina para alunos do ensino médio · Grupo 04 · UNINASSAU Campus Graças.

**[Abrir a apresentação](https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/?v=2.7.0#inicio)** · versão 2.7.0

## Revisão de funcionamento e contraste - versão 2.7

- Cores passam a acompanhar a superfície clara ou escura, inclusive após selecionar um controle ou trocar o tema do exemplo.
- Rótulos, console, resultados, estados desativados e placar ganharam contraste e foco visível. A troca de página não usa mais um efeito que apaga o conteúdo durante a entrada.
- O formulário informa a recusa, acompanha mudanças de `minlength` e limpa uma confirmação anterior quando o campo é editado. O envio continua local.
- Os desafios que começam com código incompleto agora explicam essa intenção antes da prática. As notas do apresentador foram alinhadas à ordem histórica existente.
- 41 testes automatizados, revisão das 55 páginas no navegador e em largura de 390 px, além de uma competição de dez rodadas entre apresentador e aluno de teste.

O registro de correções e da cobertura está em [REVISAO.md](docs/REVISAO.md). O conteúdo, as práticas e a ordem dos módulos foram preservados.

## Mesmos conteúdos, leitura numerada e sequência cronológica

O material anterior às duas alterações foi comparado com a versão atual. Os testes de cabo, rede/DNS/HTTP, backup, dados, permissões, Turing e os nove laboratórios de código permanecem. Pessoas, fotografias, salários, fontes e casos reais também continuam.

As marcações **01, 02, 03… são fixas ao lado dos blocos**. Textos e exemplos já ficam visíveis. A barra de foco e os botões para avançar entre trechos foram retirados. Os testes e seus controles continuam interativos. Bordas, preenchimentos e intervalos entre textos e cartões foram revistos.

O histórico vem primeiro, em ordem de datas: **Turing → Hopper → Katherine → pacotes → ARPANET → TCP/IP → DNS → Radia → NSFNET → Web → CSS → expansão comercial → Ariane 5 → GitLab → WannaCry**. Depois vêm os conceitos e práticas atuais, sem voltar ao meio da aula para apresentar as origens das mesmas tecnologias.

| Capítulo | Conteúdo | Tempo |
| --- | --- | ---: |
| 00 · Começo | Apresentação, roteiro e cotidiano. | 4 min |
| 01 · História | Contribuições e casos, de 1936–1940 até maio de 2017. | 32 min |
| 02 · Web + lógica | Internet/Web/navegador, front-end/back-end, HTML, CSS, lógica e JavaScript. | 55 min |
| 03 · Carreiras | Software, suporte/infraestrutura, dados e cibersegurança, com suas práticas. | 45 min |
| 04 · Participar | Quiz próprio de dez perguntas e próximos passos. | 23 min |
| 05 · Equipe | Integrantes e referências. | 1 min |

São **55 páginas e 160 minutos sugeridos (2h40)**. As duas páginas de introdução da participação, `fabrica` e `missao-final`, continuam removidas. NSFNET e expansão comercial, que já estavam no panorama, foram colocadas em páginas próprias nas datas correspondentes.

## Repetições consolidadas

- A prévia decorativa do robô saiu da explicação das três linguagens; o robô editável, seu console e os outros laboratórios continuam.
- Os cartões repetidos de HTML/CSS/JS dentro de carreiras foram reunidos à explicação dessas linguagens na Web. Front-end, back-end e full stack aparecem antes dela.
- O panorama não repete as mesmas demonstrações de pacotes, protocolos, DNS e documentos. Cada uma fica na página de seu assunto. A linha do tempo do roteiro é um mapa estático.
- Os textos históricos e os testes de cada área permanecem em seus lugares na nova sequência; os links das carreiras levam diretamente ao bloco correspondente.

## Práticas preservadas

- Nove laboratórios de código: seis da Web, o robô, o placar e a regra de estoque com seus testes.
- Cabeamento e continuidade, investigação de rede/DNS/HTTP, caminhos sem loop e restauração de backup.
- Gráficos editáveis, valores ausentes e fora do contexto, média, mediana e eixos.
- Identidade e permissão, portão visual, regras de acesso aos arquivos e mensagens suspeitas.
- Fita e eliminação de hipóteses de Turing, história de Katherine nos cálculos e os demais contextos históricos com fotos e fontes.

Infraestrutura, dados e segurança mantêm práticas visuais sem editor de código. As perguntas de competição ficam no quiz com QR.

Veja o [roteiro](docs/ROTEIRO.md), as [fontes](docs/FONTES.md), os [créditos das fotos](docs/IMAGENS.md) e a [operação do quiz](docs/QUIZ.md).

## Quiz próprio

Em **04 · Participar**, crie a sala e projete o QR. Os alunos abrem o link pela câmera do Android/iPhone e escolhem um apelido. O apresentador inicia e avança as perguntas. Cada acerto vale 100 pontos e empates dividem a posição. Depois de cada rodada, todos veem a explicação e o placar atualizado.

A competição exige internet e usa código próprio deste repositório. O QR contém só a entrada da sala, sem a credencial do apresentador. Não há aplicativo ou conta para instalar/criar. Os laboratórios da aula funcionam localmente.

## Executar e verificar

Use **Node.js 22.13+**, sem instalar dependências:

```sh
npm start
npm run check
```

O servidor local inclui a API e o SQLite em `.quiz/local.sqlite`, ignorado pelo Git. Para simular um aluno local, abra `competicao.html?sala=CODIGO` no mesmo servidor. O QR aponta para a apresentação pública.

As verificações cobrem a sequência cronológica, o inventário das práticas, exemplos, fotos, modelos de rede/dados/acesso e as dez rodadas do quiz, com pontuação, empates, prazos, permissão e concorrência.

## Arquivos e publicação

- `index.html` e `assets/course-data.js`: páginas, ordem, tempos, notas e exemplos.
- `assets/app.js`, `course.js`, `course-labs.js`, `live-labs.js` e regras associadas: controles e práticas.
- `assets/extension*` e `history-stories*`: conteúdo histórico, fotos, contexto e salários.
- `assets/reading-guide.js`: numeração fixa; não cria uma navegação entre trechos.
- `assets/spacing.css`: acabamento de bordas, preenchimentos e intervalos; `projection.css` mantém contraste e letras maiores.
- `competicao.html`, `assets/quiz-*` e `server/`: quiz próprio e API.

O GitHub Pages publica a raiz de `main`; **Verificar apresentação** executa os testes. A API própria usa D1 no runtime do projeto existente. Alterações no servidor precisam ser publicadas nesse runtime; um push no Pages atualiza só o frontend. A sincronização está descrita em [QUIZ.md](docs/QUIZ.md).

Créditos: Manrope sob SIL OFL em `assets/manrope-ofl.txt`; QR Nayuki sob MIT no cabeçalho de `assets/quiz-qr-vendor.js`.
