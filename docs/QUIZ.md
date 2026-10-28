# Quiz próprio da turma

## Conduzir a competição

1. Abra a oficina e clique em **04 · Participar**. A competição aparece diretamente nessa etapa.
2. Escolha 2, 2 minutos e 30 segundos ou 3 minutos por pergunta e clique em **Criar sala e mostrar QR**.
3. Projete o QR. Cada aluno usa a câmera do Android/iPhone, toca no link HTTPS e digita seu nome. Pelo QR, a sala é fixa e não há campo para editar o código. Na entrada sem QR, é possível informar o código de seis caracteres.
4. Veja os participantes aparecerem automaticamente e clique em **Começar a primeira pergunta**.
5. O aluno seleciona uma alternativa, pode trocá-la e toca em **Confirmar resposta**. Apenas esse botão envia sua escolha. Quando todos respondem ou o tempo acaba, o gabarito continua oculto. Ao terminar o prazo, novas respostas são bloqueadas. Clique em **Revelar resposta e explicação** para mostrar a letra correta, o motivo, os acertos/erros individuais nos celulares e o placar. Depois clique em **Próxima pergunta**.
6. Depois da décima pergunta, abra o ranking final de todos os participantes, ordenado por número de acertos. A opção de nova competição cria outra sala.

Cada acerto vale **100 pontos**, até 1.000. Não há bônus de velocidade; quem soma o mesmo total divide a posição. Vale a primeira resposta confirmada de cada participante por rodada. O servidor controla prazo, resposta e pontuação. Uma atualização da página restaura a sessão no mesmo navegador, quando o armazenamento local está disponível.

Todos precisam de internet. O site não pede instalação, conta ou permissão de câmera; a leitura acontece no aplicativo de câmera do aparelho. O QR contém somente o endereço público `competicao.html?sala=CODIGO`. O token do apresentador não faz parte do link.

## Como o código se organiza

- `competicao.html`: página própria do apresentador e dos alunos.
- `assets/quiz-live.js`: telas, reconexão e sincronização automática por HTTP a cada aproximadamente 1,2 segundo em primeiro plano.
- `assets/quiz-live.css`: visual responsivo.
- `assets/quiz-qr.js` e `quiz-qr-vendor.js`: QR gerado no navegador, com margem de quatro módulos e correção de erros. A biblioteca Nayuki é MIT.
- `assets/quiz-embed.js`: carrega o painel dentro da etapa Participar e ajusta sua altura.
- `server/quiz-questions.mjs`: banco de dez perguntas alinhadas à Web, lógica, carreiras e cuidados de segurança.
- `server/quiz-service.mjs`: API própria, validações, transições, identidade do apresentador/aluno, prazos e placar.
- `server/quiz-schema.sql`: salas, participantes e respostas. As chaves únicas impedem pontos duplicados.
- `server/quiz-local-db.mjs`: adaptador SQLite local compatível com as operações D1 usadas pela API.

Gabarito e explicação só são enviados depois que o apresentador revela, inclusive quando todos responderam ou o tempo esgotou. O servidor guarda hashes dos tokens. Alunos não podem controlar as rodadas. Cada sala dura 24 horas; salas vencidas são removidas quando uma nova é criada. O limite configurado é de 200 participantes por sala e 200 salas ainda válidas; isso é um limite de aplicação, não uma medição de capacidade sob carga.

## API

| Método e rota | Uso |
| --- | --- |
| `GET /api/quiz/health` | Verificar que a API está disponível. |
| `POST /api/quiz/rooms` | Criar sala e receber o token privado do apresentador. |
| `POST /api/quiz/rooms/:code/join` | Entrar com apelido e chave do dispositivo. |
| `GET /api/quiz/rooms/:code/state` | Buscar o estado permitido para a sessão. |
| `POST /api/quiz/rooms/:code/control` | Apresentador: iniciar, revelar ou avançar. |
| `POST /api/quiz/rooms/:code/answer` | Aluno: registrar a primeira resposta. |

Tokens de sessão usam `Authorization: Bearer …`; nunca devem ser colocados no QR, em capturas ou em URLs. As requisições não usam cookies. CORS aceita a origem da apresentação no GitHub Pages e a origem própria do runtime. A validação de sessão continua obrigatória para as ações protegidas.

## Executar e publicar

Para desenvolvimento, use `npm start` com Node.js 22.13+. A API e os arquivos da apresentação usam o mesmo servidor local. O banco fica em `.quiz/local.sqlite`, ignorado pelo Git. O QR aponta para a apresentação pública; para testar localmente, use o endereço local de `competicao.html?sala=CODIGO`.

O frontend público continua no **GitHub Pages do repositório**. Como o Pages não executa servidores nem mantém um banco compartilhado, a API deste mesmo código usa o runtime do projeto existente:

`https://fabrica-software-grupo04-leno-2026.lenozika01.chatgpt.site/api/quiz`

A migração do runtime é Vinext/Worker com o binding D1 `DB`. A rota `app/api/quiz/[...parts]/route.ts` delega GET, POST e OPTIONS para `handleQuizRequest(request, env)`. Os arquivos `quiz/quiz-service.mjs` e `quiz/quiz-questions.mjs` no runtime são cópias dos arquivos `server/` deste repositório. A migração inicial tem as mesmas três tabelas do SQL local, gerada por Drizzle. A publicação aplica migrações pendentes; migrações já aplicadas não devem ser reescritas.

Ao alterar a API/perguntas, sincronize os dois arquivos do servidor e publique também o runtime existente. Ao alterar o frontend, atualize `public/index.html`, `public/competicao.html` e `public/assets/` do runtime e a raiz do GitHub Pages. Não crie outro projeto de quiz ou inclua serviços externos de competição. Um push no GitHub atualiza somente o frontend estático.

## Verificações

`npm run check` valida os exemplos da aula e o fluxo do quiz, incluindo dez rodadas completas, respostas concorrentes/duplicadas, permissão do apresentador, reconexão, prazo, pontuação, empates, CORS e expiração. A leitura do QR também foi conferida com um decodificador independente. O fluxo visual foi testado com apresentador e aluno em duas páginas e em largura de celular; a câmera de aparelhos físicos não foi testada neste ambiente.
