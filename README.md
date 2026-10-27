# Fábrica de Software na Prática

Oficina interativa para alunos do ensino médio · Grupo 04 · UNINASSAU Campus Graças.

**[Abrir a apresentação](https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/)** · versão 2.5.0

## Conteúdo completo, com uma ordem para acompanhar

São **53 etapas, seis capítulos e 160 minutos sugeridos (2h40)**. O roteiro inclui tempo para conversa e demonstrações. As histórias, pessoas, fotografias, laboratórios, atividades de carreira e casos reais foram reintegrados. Apenas as duas introduções da participação, `fabrica` e `missao-final`, foram retiradas; Participar abre diretamente o quiz com QR.

| Capítulo | Conteúdo | Tempo |
| --- | --- | ---: |
| 00 · Começo | O cotidiano e os papéis de internet, Web e navegador. | 7 min |
| 01 · Internet | ARPANET, linha do tempo, pessoas e contribuições, pacotes, protocolos, DNS e Web. | 18 min |
| 02 · Web + lógica | HTML, CSS, sequência, condições e JavaScript com código ao vivo. | 52 min |
| 03 · Carreiras | Desenvolvimento, suporte/infraestrutura, dados e cibersegurança, com exemplos e práticas. | 59 min |
| 04 · Participar | Quiz de dez perguntas por QR e próximos passos. | 23 min |
| 05 · Equipe | Integrantes e referências. | 1 min |

A faixa **Siga a leitura** numera os trechos de cada etapa. Clique em um trecho ou em **Próximo trecho** para destacá-lo e trazê-lo à tela. O material continua disponível na página. Nas quatro carreiras, o caminho é **conheça a área → veja o trabalho na prática → explore cargos e salários**. Nas contribuições históricas, o contexto liga necessidade, surgimento e uso ou legado atual à representação visual.

O contraste foi reforçado para projeção: fundo verde escuro, blocos de leitura claros, letras maiores e destaques em verde vivo. A fonte Manrope é local. O roteiro, as notas, o cronômetro, os atalhos e a tela cheia continuam disponíveis.

## Exemplos que permanecem

- Linha do tempo com nove marcos e comparação visual antes/depois; onze pessoas contextualizadas e quinze fotos locais com créditos.
- Nove laboratórios de código ativos: seis da Web, o robô, o placar de software e os testes da regra de estoque.
- Cabo e continuidade, investigação de conexão/DNS/HTTP, caminhos sem loop e restauração de backup.
- Gráficos editáveis, registros incompletos, valores fora do contexto, média, mediana e comparação de eixos.
- Identidade e permissão, portão visual, política de acesso a arquivos, mensagens suspeitas e resposta a incidentes.
- Experimentos de Turing e os casos Ariane, GitLab e WannaCry.
- Mercado, cargos, salários identificados e links às fontes junto de cada área.

Infraestrutura, dados e cibersegurança mantêm práticas visuais sem editor de código. Os testes aplicados às demonstrações continuam; as perguntas de múltipla escolha da competição ficam no quiz, sem o seletor antigo ou perguntas avulsas nos laboratórios.

Veja o [roteiro](docs/ROTEIRO.md), as [fontes](docs/FONTES.md), os [créditos das fotografias](docs/IMAGENS.md) e a [operação do quiz](docs/QUIZ.md).

## Competição própria integrada

Em **04 · Participar**, escolha 30, 45 ou 60 segundos e clique em **Criar sala e mostrar QR**. Os alunos abrem o link HTTPS pela câmera do Android/iPhone e escolhem um apelido. O apresentador inicia e avança as rodadas. Cada acerto vale 100 pontos; empates dividem a posição. Resposta comentada e placar aparecem automaticamente após cada pergunta.

O quiz usa código próprio deste repositório e um banco compartilhado, sem conta ou aplicativo a instalar. A competição exige internet. Os exemplos da aula e laboratórios continuam locais. O QR contém só o endereço de entrada e o código da sala, sem o token do apresentador.

## Rodar localmente

Use **Node.js 22.13+**, sem instalar dependências:

```sh
npm start
```

O comando serve a apresentação e a API própria com SQLite local em `.quiz/local.sqlite`, ignorado pelo Git. Para simular um aluno localmente, abra `competicao.html?sala=CODIGO` no mesmo servidor. O QR aponta para a oficina pública.

```sh
npm run check
```

A verificação cobre conteúdo restaurado, ordem e duração, exemplos, nove laboratórios, modelos de rede/dados/acesso, fotografias, linha do tempo e dez rodadas do quiz, com prazo, pontos, empates, permissão e concorrência.

## Editar e publicar

- `index.html`: conteúdo e telas.
- `assets/course-data.js`: sequência, duração, notas e exemplos do curso.
- `assets/app.js`, `course.js`, `course-labs.js`, `live-labs.js` e arquivos de lógica: interações e laboratórios preservados.
- `assets/extension*` e `history-stories*`: contribuições históricas, fotos, linha do tempo e contexto das carreiras.
- `assets/reading-guide.js`: orientação por trecho; adiciona ordem e destaque sem excluir o material.
- `assets/projection.css`: contraste e legibilidade para projeção; `clarity.css` contém a fonte local e a base tipográfica.
- `competicao.html`, `assets/quiz-live.*` e `quiz-embed.js`: competição própria e integração.
- `server/`: API, banco de perguntas, regras e esquema do quiz; `worker.mjs` é um adaptador D1.

O GitHub Pages publica a raiz de `main`; o workflow **Verificar apresentação** executa os testes. O Pages hospeda arquivos estáticos. A API própria usa D1 no runtime do projeto existente. Alterações no servidor precisam ser publicadas também nesse runtime; um push no Pages atualiza apenas o frontend. A sincronização está descrita em [QUIZ.md](docs/QUIZ.md).

Créditos: Manrope sob SIL OFL em `assets/manrope-ofl.txt`; gerador QR Nayuki sob MIT, preservado no cabeçalho de `assets/quiz-qr-vendor.js`.
