# Fábrica de Software na Prática

Apresentação interativa para alunos do ensino médio sobre **HTML, CSS, JavaScript, cibersegurança e carreiras em TI**. Projeto de extensão do Grupo 04, Ciência da Computação, UNINASSAU Campus Graças, para a Escola Lions de Parnamirim, Recife/PE.

A sequência tem **17 etapas conectadas**. Cada prática aproxima três coisas: **o código editável, o que ele faz e o resultado visual ao vivo**.

## Abrir e apresentar

Baixe o repositório em **Code → Download ZIP**, extraia a pasta inteira e abra `index.html` em um navegador atualizado. Mantenha `assets` junto do HTML. A apresentação não depende de instalação, conta, CDN ou conexão; os links de estudo precisam de internet.

Com Node.js 20 ou superior, também é possível usar:

```bash
npm start
```

Abra `http://localhost:5173`. Não há dependências para instalar.

## Laboratórios ao vivo

| Assunto | Código | Resultado / demonstração |
| --- | --- | --- |
| HTML | Título, parágrafo e botão | Troque a saudação e veja o texto mudar |
| CSS | Cor, forma e animação | Personalize a aparência de um robô |
| JavaScript | Evento de clique, variável e `console.log` | Dê energia ao robô; acompanhe preenchimento e console |
| Desenvolvimento de software | Função de pontuação | Colete estrelas, altere o multiplicador e veja o placar |
| Suporte / Infraestrutura | Condições de diagnóstico | Ligue/desligue rede e servidor; acompanhe um pacote fictício |
| Análise de dados | Lista e função de soma | Mude os números e veja as barras e o total |
| Cibersegurança | Regra de autorização com duas condições | Teste papéis e segunda etapa; observe a porta liberar ou bloquear |

**Atualizar ao digitar** vem ativado. As alterações são executadas após uma breve pausa de 350 ms. Desative a opção para preparar várias mudanças antes de clicar em **Executar**. `Ctrl + Enter` / `Cmd + Enter` também executa o laboratório atual.

Cada laboratório de carreira tem três botões que explicam **entrada → regra → resultado**, além de um experimento sugerido, um exemplo alternativo e **Restaurar**. O console mostra as mensagens reais do código e os erros de edição. Os estados são mantidos ao trocar de tela e apagados ao recarregar.

`entrada` e `mostrar` são recursos educativos dos laboratórios de carreira: o primeiro fornece o estado dos controles e o segundo envia os dados para o cenário. Usamos JavaScript como linguagem comum para comparar a lógica; isso não resume as ferramentas de cada profissão.

### Sugestões para apresentar

- **Web:** mude o título; depois a variável de cor; por último, troque o ganho de energia de 10 para 50 e clique no robô.
- **Software:** pergunte o placar previsto com duas estrelas; colete uma; altere o multiplicador.
- **Suporte:** compare rede desligada, servidor desligado e caminho disponível. O desafio remove uma verificação: a animação do pacote e a conclusão do código podem discordar. Investigue e corrija.
- **Dados:** pergunte qual barra crescerá antes de trocar o primeiro número da lista por 30. Compare outra amostra.
- **Cibersegurança:** teste visitante e editor com e sem segunda etapa. Depois inclua o papel revisor na função e repita os testes.

Cada edição da página web recria a prévia e zera seu estado de interação. Nos laboratórios de carreira, editar o código preserva os controles; **Restaurar** recupera código e controles iniciais.

## Navegação

| Ação | Controle |
| --- | --- |
| Avançar / voltar | Setas, `Page Down` / `Page Up`, botões inferiores |
| Avançar | `Espaço`, fora de um campo ou botão |
| Primeira / última etapa | `Home` / `End` |
| Tela cheia | `F` ou ícone superior |
| Roteiro / atalhos | `M` / `?` |
| Notas de apoio | `N` ou **Notas** |
| Executar código | Botão **Executar**, `Ctrl + Enter` / `Cmd + Enter` |
| Fechar painel ou diálogo | `Esc` |

Os atalhos de navegação ficam suspensos nos editores. As setas nas abas do laboratório web trocam de arquivo e ativam sua etapa. Nos editores de carreira, `Tab` insere dois espaços. O cronômetro inicia/pausa com um clique; ele pode ser zerado nas notas.

**As notas aparecem na tela projetada.** Consulte [o roteiro de falas](docs/ROTEIRO.md) antes de apresentar. Links como `index.html#lab-dados` abrem diretamente um assunto. A navegação de voltar do navegador funciona.

## Ambiente das demonstrações

Todos os exemplos são locais e fictícios. O laboratório de suporte não testa a rede da escola. Os gráficos não coletam respostas reais. Os papéis e a segunda etapa não alteram contas ou permissões reais.

A prévia web roda em um iframe com origem opaca, sem acesso ao DOM principal, sem conexão de rede e sem envio de formulários. Nos quatro laboratórios de funções, o código roda em Workers descartáveis dentro de iframes isolados; uma execução é encerrada após um segundo. Resultados são validados antes de alimentar os cenários. Erros preservam o último resultado válido e aparecem no console.

O limite de um segundo é dos laboratórios de funções. Código web que manipula DOM executa no iframe: evite loops infinitos nesse exemplo. O material foi feito para as práticas educativas da oficina, não para receber programas não confiáveis de terceiros.

Em sistemas reais, autenticação e autorização devem ser verificadas pelo servidor. A porta animada apenas representa a decisão de uma função.

O quiz coletivo contém seis perguntas, explicação e revisão. Não há votação sincronizada entre aparelhos, ranking individual, cadastro, armazenamento persistente ou coleta de dados pessoais.

## Editar e verificar

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Estrutura, sequência, textos e créditos |
| `assets/content.js` | Exemplo web, explicações, perguntas e notas |
| `assets/lab-content.js` | Código, desafios e explicações das quatro carreiras |
| `assets/live-labs.js` | Editores, console, controles e cenários animados |
| `assets/lab-engine.js` | Executor isolado e contratos dos resultados |
| `assets/app.js` e `assets/logic.js` | Navegação, prévia web e quiz |
| `assets/styles.css`, `assets/story.css`, `assets/live-labs.css` | Aparência, responsividade e animações |
| `docs/ROTEIRO.md` | Sequência de falas e demonstrações |
| `docs/FONTES.md` | Referências e escopo dos exemplos |

```bash
npm run check
```

A verificação cobre sintaxe, sequência, âncoras, notas, quiz, isolamento e a execução dos exemplos com entradas e edições diferentes. O GitHub Actions usa o mesmo comando. Antes da apresentação, ensaie os laboratórios no notebook e no projetor, inclusive sem internet. Em telas menores o conteúdo pode rolar; o layout empilha editor e resultado no celular.

## Hospedagem estática

O projeto funciona em qualquer hospedagem estática. Para GitHub Pages, selecione **Settings → Pages → Deploy from a branch → main → / (root)** e use o endereço que o GitHub informar após publicar. Não é necessário configurar Pages para abrir a cópia local.

## Equipe

Anita Gallindo Oliveira · Bianka Moura Batista · Emanuele Vitoria Lima de Sousa · Girlenio Gomes da Silva · Pedro Vinícius de Almeida Santana · Vanderson Gabriel Vasconcelos Barbosa.

UNINASSAU, Campus Graças. Atividades Práticas Interdisciplinares de Extensão II, Ciência da Computação, 2026.
