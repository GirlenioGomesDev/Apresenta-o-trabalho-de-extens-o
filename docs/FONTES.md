# Fontes da oficina · versão 2.4

Referências do conteúdo ativo, conferidas em 27 de outubro de 2026. A navegação atual reúne Começo, Web, Carreiras, Participar e Equipe. As fontes de conteúdos históricos retirados estão no [arquivo da versão 2.3](FONTES-v2.3-arquivo.md).

## Web e lógica

- [MDN · HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML): estrutura, significado, formulários e elementos nativos.
- [MDN · CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS): aparência, caixa, grade e adaptação ao tamanho da tela.
- [MDN · guia de JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide): variáveis, condições, repetição e funções.
- [React](https://react.dev/): referência de organização didática, com explicação próxima do exemplo e exploração gradual.
- [CERT.br · Cartilha de Segurança para Internet](https://cartilha.cert.br/): base dos cuidados com pedidos inesperados e contas usados no quiz.

## O que cada profissional faz

As definições são resumos didáticos dos percursos profissionais da Microsoft Learn. Os cargos são exemplos, não uma lista exaustiva.

| Área | Fonte da definição |
| --- | --- |
| Desenvolvimento de software | [Microsoft Learn · Desenvolvedor](https://learn.microsoft.com/pt-br/training/career-paths/developer) |
| Suporte e infraestrutura | [Microsoft Learn · Administrador](https://learn.microsoft.com/pt-br/training/career-paths/administrator) |
| Análise de dados | [Microsoft Learn · Analista de dados](https://learn.microsoft.com/pt-br/training/career-paths/data-analyst) |
| Cibersegurança | [Microsoft Learn · Engenheiro de segurança](https://learn.microsoft.com/pt-br/training/career-paths/security-engineer) |

## Faixas salariais

**Guia Salarial Robert Half 2026**, referência nacional, valores mensais em reais entre P25 e P75 do cargo júnior indicado. São projeções de entrada em novas contratações; não são piso, teto, média de toda a profissão ou promessa de remuneração. Valores variam por empresa, região e qualificação.

| Área | Cargo usado no cartão | P25 | P75 | Fonte |
| --- | --- | ---: | ---: | --- |
| Software | Desenvolvedor(a) Full-Stack Júnior | R$ 6.050 | R$ 8.750 | [Robert Half](https://www.roberthalf.com/br/pt/vagas-detalhes/desenvolvedora-full-stack-junior) |
| Suporte / Infra | Analista de Suporte Júnior | R$ 3.350 | R$ 5.650 | [Robert Half](https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-suporte-junior) |
| Suporte / Infra | Analista de Infraestrutura Júnior | R$ 4.400 | R$ 7.450 | Cargos relacionados na mesma fonte de suporte. |
| Dados | Analista de BI Júnior | R$ 5.600 | R$ 9.000 | [Robert Half](https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-bi-junior) |
| Cyber | Analista de Segurança Júnior | R$ 6.200 | R$ 10.400 | [Robert Half](https://www.roberthalf.com/br/pt/vagas-detalhes/analista-de-seguranca-junior) |

- [Metodologia do guia](https://www.roberthalf.com/br/pt/insights/guia-salarial): base em profissionais colocados pela consultoria, sem bônus, benefícios ou outras remunerações. As páginas não explicitam regime CLT nem líquido/bruto; esses rótulos não foram acrescentados.
- [FIAP · resumo do guia 2026](https://www.fiap.com.br/radar-tech/post/salarios-em-tecnologia-2026-quanto-ganham-as-principais-profissoes-tech-no-brasil/): corrobora a unidade mensal. Os valores de cada cargo foram conferidos na fonte primária.

BI é um exemplo da área de dados. Suporte e infraestrutura aparecem separadamente no seletor de cargo.

## Quiz, QR e tipografia

- [Nayuki · QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library): gerador local, licença MIT preservada no código.
- [Apple · Ler um código QR](https://support.apple.com/pt-br/102680): câmera nativa, apontar e tocar no link.
- [Google · Ler QR com a Câmera do Google](https://support.google.com/camerafromgoogle/answer/12033278?hl=pt-BR): abertura do endereço no Android compatível.
- [Cloudflare · D1 Database API](https://developers.cloudflare.com/d1/worker-api/d1-database/): banco compartilhado da API própria. A versão local usa SQLite.
- [Google Fonts · Manrope](https://github.com/google/fonts/tree/main/ofl/manrope): fonte servida localmente; licença SIL OFL em `assets/manrope-ofl.txt`.

O QR leva a uma página HTTPS comum, sem leitor próprio ou pedido de acesso à câmera pelo site. Foram conferidos o código do QR com um decodificador independente e o layout em largura de celular; isso não equivale a um teste físico em cada modelo de Android/iPhone.

## Escopo dos exemplos

Os personagens, listas e valores dos laboratórios são fictícios. O código da aula executa em iframe isolado. Os cartões de carreira não contêm editores. No quiz, respostas e pontuação são verificadas no servidor; o gabarito só é enviado após o fechamento da pergunta. A competição precisa de conexão, embora os laboratórios locais não consultem contas ou equipamentos reais.
