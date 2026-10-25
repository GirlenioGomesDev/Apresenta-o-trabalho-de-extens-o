# Fábrica de Software na Prática

Uma apresentação interativa em **HTML, CSS e JavaScript**, criada para a oficina do Grupo 04 na Escola Lions de Parnamirim, em Recife/PE. O conteúdo acompanha o projeto de extensão de Ciência da Computação da UNINASSAU, Campus Graças.

**Tema completo:** Desenvolvimento Web, Cibersegurança e Carreiras em TI.

## Abrir e apresentar

1. No GitHub, clique em **Code → Download ZIP**.
2. Extraia a pasta inteira. Não abra o HTML de dentro do ZIP.
3. Abra **`index.html`** no Chrome, Edge, Firefox ou outro navegador atualizado.
4. Clique em **Vamos começar**. Use os botões inferiores ou as setas do teclado.

Não precisa instalar pacotes, fazer login ou ter internet para apresentar. Mantenha a pasta `assets` junto de `index.html`. Somente os links para materiais externos precisam de conexão.

Para apresentar com um servidor local, se preferir e já tiver Node.js 20 ou superior:

```bash
npm start
```

Abra `http://localhost:5173`. Não há dependências para instalar.

## O que a oficina contém

- **17 etapas** com navegação, roteiro, progresso, tela cheia e cronômetro.
- Demonstração do caminho entre navegador, servidor e banco de dados.
- Explicação de HTML, CSS e JavaScript com exemplos e analogias.
- **Laboratório editável:** compare HTML, HTML + CSS e HTML + CSS + JavaScript.
- Etapas de uma fábrica de software, da identificação do problema à manutenção.
- Caso real da **Uber, setembro de 2022**, com fonte oficial e foco em prevenção.
- Mensagem suspeita e pedido inesperado de login para discutir com o público.
- Cuidados com contas e dados, além de uma simulação de permissões.
- Exploração de **nove áreas de TI**, caminhos de formação e desafios da carreira.
- **Quiz coletivo com seis perguntas**, explicações, resultado e revisão.
- Desafio de primeiro projeto, materiais de estudo, equipe e referências.

## Controles

| Ação | Controle |
| --- | --- |
| Avançar / voltar | `→` / `←`, botões inferiores, `Page Down` / `Page Up` |
| Avançar | `Espaço`, quando não estiver em um botão ou campo |
| Primeira / última etapa | `Home` / `End` |
| Tela cheia | `F` ou ícone superior, conforme suporte do navegador |
| Abrir roteiro | `M` ou ícone de quatro quadrados |
| Notas de apoio | `N` ou **Notas** |
| Ver atalhos | `?` |
| Executar exemplo | **Executar** ou `Ctrl + Enter` / `Cmd + Enter` |
| Fechar painel ou diálogo | `Esc` |

Durante a edição de código, os atalhos de navegação ficam suspensos. Dentro das abas de arquivos, as setas trocam a aba. Clique no cronômetro para iniciar ou pausar; abra as notas para zerá-lo.

**As notas aparecem na própria tela.** Elas não são um monitor separado do apresentador. Se estiver projetando, o público também as verá. Consulte antecipadamente [o roteiro de falas](docs/ROTEIRO.md).

Links diretos, como `index.html#laboratorio` e `index.html#carreiras`, abrem a etapa correspondente. O botão de voltar do navegador também funciona.

## Como usar o laboratório

1. Em **Só HTML**, mostre o conteúdo. O botão ainda não tem uma ação programada.
2. Selecione **+ CSS** e compare a aparência.
3. Selecione **+ JavaScript** e clique em **Quero participar** dentro da prévia.
4. Nas abas de arquivos, altere o título ou a cor e clique em **Executar**.
5. Use **Restaurar exemplo** para recuperar o código inicial e voltar à primeira etapa.

Cada etapa controla quais tecnologias estão ativas. Editar CSS durante **Só HTML** não muda o resultado até ativar a segunda etapa. O mesmo vale para JavaScript na terceira etapa.

A prévia usa um `iframe` isolado, sem acesso à origem da apresentação e com política que bloqueia conexões de rede e envio de formulários. Ela executa o código do exemplo no navegador. Evite loops infinitos, que podem travar a aba. Não é um ambiente de execução para código não confiável de terceiros.

## Dinâmicas e dados

As marcações, respostas e decisões são **locais à sessão**. Elas não são enviadas para um servidor, não são sincronizadas entre aparelhos e não permanecem após recarregar a página. A atividade de abertura registra temas reconhecidos na conversa, sem medir quantas pessoas responderam.

O quiz aceita uma resposta por pergunta, mostra a explicação e permite revisão ao final. **Recomeçar o quiz** limpa as respostas. Não há ranking individual, cadastro ou coleta de dados pessoais.

A troca entre visitante e editor é uma **simulação educativa de uma regra de autorização**. Em um sistema real, essa verificação deve ser imposta pelo servidor. Não use esta interface como controle real de acesso.

## Preparação para o dia

- Extraia o projeto no notebook e teste sem internet.
- Teste o cabo, o projetor e a resolução. O conteúdo pode rolar em telas menores.
- Faça uma passagem pelo laboratório e restaure o exemplo.
- Combine as falas entre os seis integrantes. O roteiro sugere uma divisão e cerca de 90 minutos.
- Deixe uma cópia local completa. A apresentação não depende de um serviço de hospedagem.

## Editar o conteúdo

| Arquivo | O que alterar |
| --- | --- |
| `index.html` | Textos principais, etapas, equipe e estrutura da página |
| `assets/content.js` | Exemplos, carreiras, perguntas, respostas e notas de apoio |
| `assets/styles.css` | Cores, fontes, tamanhos e comportamento responsivo |
| `assets/app.js` | Navegação, interações, laboratório e quiz |
| `assets/logic.js` | Funções de navegação, pontuação e isolamento da prévia |
| `docs/ROTEIRO.md` | Sugestão de falas e organização da oficina |
| `docs/FONTES.md` | Referências e relação com o projeto original |

O código usa scripts clássicos em vez de módulos para permitir abertura direta do HTML. Não utiliza frameworks, CDNs, fontes remotas, serviços pagos, banco de dados ou telemetria.

## Verificações de desenvolvimento

Com Node.js 20 ou superior:

```bash
npm run check
```

O comando verifica a sintaxe e executa testes de navegação, âncoras, notas, respostas e pontuação, permissões ilustrativas e restrições da prévia. O fluxo de GitHub Actions executa essas verificações em novos commits e pull requests. Os testes não substituem a conferência visual e a passagem da oficina pelo grupo.

## Hospedar no GitHub Pages, se quiser um link

O projeto já está pronto para hospedagem estática. No próprio repositório:

1. Abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch **main** e a pasta **/ (root)**.
4. Salve e aguarde o GitHub mostrar o endereço publicado.

Use o endereço exibido pelo GitHub depois que a publicação concluir. A apresentação local continua funcionando sem essa configuração. Não há uma publicação ativa presumida por este README.

## Equipe

Anita Gallindo Oliveira · Bianka Moura Batista · Emanuele Vitoria Lima de Sousa · Girlenio Gomes da Silva · Pedro Vinícius de Almeida Santana · Vanderson Gabriel Vasconcelos Barbosa.

UNINASSAU, Campus Graças. Atividades Práticas Interdisciplinares de Extensão II, Ciência da Computação, 2026.
