# Fábrica de Software na Prática

Uma oficina em código para alunos do ensino médio: **HTML, CSS, JavaScript, cibersegurança e carreiras em TI**, com previsão, demonstração e investigação.

**[Abrir a apresentação publicada](https://girleniogomesdev.github.io/Apresenta-o-trabalho-de-extens-o/)**

A versão 2.0 contém **46 etapas**, **15 laboratórios editáveis**, **12 perguntas de revisão** e um **roteiro sugerido de 130 minutos (2h10)**. O tempo inclui conversa, previsões e resolução dos desafios; uma passagem rápida pelos títulos não corresponde à oficina completa.

O design original foi mantido. A referência react.dev orienta a organização didática: uma ideia por vez, código perto do resultado, mudanças observáveis e desafios progressivos. A oficina continua focada nos assuntos solicitados.

## Roteiro de duas horas e dez minutos

| Bloco | Duração | Prática principal |
| --- | --- | --- |
| Curiosidade e origem da Web | 8 min | Distinguir rede, serviço e página; formular perguntas |
| HTML | 18 min | Estrutura semântica, links, detalhes, controles e validação local |
| CSS | 18 min | Modelo de caixa, grade responsiva e animação com controle |
| JavaScript | 20 min | Estado, eventos, busca, listas e aplicação com limites |
| Desenvolvimento de software | 12 min | Funções, requisitos, testes e entradas inválidas |
| Suporte / Infraestrutura | 12 min | Conexão, DNS, respostas HTTP, latência e recuperação |
| Análise de dados | 12 min | Limpeza, agrupamento, média, mediana e interpretação |
| Cibersegurança | 18 min | Sessão, papel, dono, ação, mensagens e resposta a incidente |
| Missão da turma e fechamento | 12 min | Investigar tickets, revisar e escolher uma primeira prática |

Cada bloco tem notas na apresentação. O [roteiro completo](docs/ROTEIRO.md) orienta as falas e o [guia dos laboratórios](docs/GUIA_DOS_LABORATORIOS.md) reúne previsões, dicas, desafios e verificações.

## O que mudou nas demonstrações

Os exemplos iniciais foram preservados como aquecimento. A sequência avança para práticas com mais de uma regra:

- Construir uma página com significado e controles utilizáveis pelo teclado.
- Validar campos fictícios e testar entradas no limite.
- Reorganizar cartões conforme a largura da prévia.
- Alterar duração, ritmo e pausa de uma animação.
- Corrigir uma busca que diferencia maiúsculas e minúsculas.
- Combinar escolhas, soma de tempo, remoção e limite.
- Corrigir uma função de estoque sem alterar os resultados esperados dos testes.
- Distinguir falha de conexão, DNS, recurso ausente, serviço indisponível e lentidão.
- Comparar registros incompletos, valor extremo, média e mediana.
- Revisar uma autorização que ignora confirmação de sessão e dono do recurso.

Nos dez novos laboratórios, a turma pode responder a uma **previsão**, editar o código, observar resultado e console, pedir **dicas graduais**, abrir uma **solução** e voltar à própria tentativa. A atualização automática pode ser pausada. **Restaurar** recupera o exemplo.

As partes relevantes de cada exemplo aparecem primeiro no editor; os estilos de apoio ficam separados por comentário. As abas permitem explorar os arquivos. A prévia web tem opções de largura ampla e estreita.

## Pessoas, casos e curiosidade

As histórias entram junto do assunto correspondente: Tim Berners-Lee e a Web; Håkon Wium Lie e a proposta de folhas de estilo; Grace Hopper e a automação da programação; Radia Perlman e a organização de caminhos Ethernet; Katherine Johnson e a conferência de cálculos.

Três casos breves conectam o laboratório ao mundo real: Ariane 5 (testes e contexto), GitLab (backup e restauração) e WannaCry/NHS (continuidade e preparação). As fontes primárias ficam nas próprias telas e em [Fontes e escopo](docs/FONTES.md). As demonstrações são analogias educativas e não reproduzem os sistemas desses casos.

## Abrir uma cópia local

Baixe o repositório em **Code → Download ZIP**, extraia a pasta inteira e abra `index.html` em um navegador atualizado. Mantenha `assets` junto do HTML. Os exemplos e a apresentação não precisam de conta ou conexão; os links externos precisam de internet.

Com Node.js 20 ou superior, também é possível usar:

```bash
npm start
```

Abra `http://localhost:5173`. Não há dependências para instalar.

## Controles para apresentar

| Ação | Controle |
| --- | --- |
| Avançar / voltar | Setas, Page Down / Page Up, botões inferiores |
| Primeira / última etapa | Home / End |
| Tela cheia | F ou ícone superior |
| Roteiro por blocos e duração | M ou ícone de roteiro |
| Notas de apoio | N ou botão Notas |
| Executar código | Executar ou Ctrl + Enter / Cmd + Enter |
| Fechar painel ou diálogo | Esc |

Durante a edição, os atalhos de navegação são suspensos. Tab insere dois espaços nos novos editores; nas abas, as setas trocam de arquivo. As notas aparecem na própria tela projetada. O cronômetro pode ser iniciado, pausado e zerado.

## Ambiente controlado

Os dados, pedidos, personagens e estados de rede são fictícios. Não há cadastro, coleta de dados pessoais, votação sincronizada ou acesso a contas reais. Os estados ficam na sessão e desaparecem ao recarregar.

A prévia web usa iframe com origem opaca e conexões bloqueadas. Os laboratórios de funções usam Workers descartáveis dentro de iframes isolados, com interrupção após um segundo e validação dos resultados. Código web que manipula o DOM executa na prévia; evite loops infinitos nessa modalidade. A oficina foi feita para seus exemplos educativos, não para executar programas não confiáveis de terceiros.

`entrada` e `mostrar` são recursos dos laboratórios de funções: conectam controles e visualização ao código. Sistemas reais verificam autenticação e autorização no servidor. As regras locais não substituem essa verificação.

Alguns exemplos começam com um problema **intencional e identificado**. Os testes ou o comportamento mostrado ajudam a investigá-lo. A solução é uma possibilidade de implementação, não uma resposta que a turma precisa decorar.

## Editar e verificar

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura, sequência, conceitos, histórias e créditos |
| `assets/course-data.js` | Roteiro, novos exemplos, previsões, dicas e soluções |
| `assets/course-labs.js` | Editores, prévias, execução e cenários dos novos laboratórios |
| `assets/course-logic.js` | Contratos dos resultados e funções do roteiro |
| `assets/course.js` | Interações de apoio e orientação dos blocos |
| `assets/course.css` | Estilo das novas partes, mantendo a identidade |
| `assets/content.js`, `lab-content.js`, `app.js`, `live-labs.js`, `logic.js`, `lab-engine.js` | Exemplos preservados, navegação, quiz e isolamento |
| `docs/` | Roteiro, guia prático e fontes |

```bash
npm run check
```

O comando verifica sintaxe, navegação, coerência do roteiro, duração, contratos e comportamento dos exemplos antes e depois das correções. O GitHub Actions executa as verificações a cada alteração.

O GitHub Pages publica automaticamente a branch **main**, pasta **/ (root)**. O arquivo `.nojekyll` mantém a publicação estática. Ensaiem também no notebook e no projetor, inclusive sem internet; em telas menores, editor e resultado ficam empilhados.

## Equipe

Anita Gallindo Oliveira · Bianka Moura Batista · Emanuele Vitoria Lima de Sousa · Girlenio Gomes da Silva · Pedro Vinícius de Almeida Santana · Vanderson Gabriel Vasconcelos Barbosa.

UNINASSAU, Campus Graças. Ciência da Computação, Atividades Práticas Interdisciplinares de Extensão II. Escola Lions de Parnamirim, Recife/PE, 2026.
