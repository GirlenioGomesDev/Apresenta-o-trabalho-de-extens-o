# Roteiro da apresentação

**Público:** alunos do ensino médio. **Foco:** HTML, CSS, JavaScript, cibersegurança e quatro áreas de TI.

A conversa segue o mesmo ciclo: faça uma pergunta curta, peça uma previsão, mostre o código, altere uma coisa e observe o resultado com a turma. Os botões de explicação ajudam a ler entrada, regra e saída. Evite tentar ensinar toda a sintaxe de uma vez.

Os tempos abaixo são sugestões para as demonstrações. Ajuste ao espaço disponível para perguntas. As notas da própria apresentação abrem com `N` e ficam visíveis ao público.

## 01–03. Do cotidiano às camadas da web

Abra a conversa com situações familiares: sites, contas, recomendações e jogos. As partes destacadas mostram que existem interfaces, regras, conexão e dados por trás da tela.

Na comparação de linguagens, use sempre a mesma página com um robô. HTML define o conteúdo; CSS dá aparência e movimento; JavaScript responde ao clique. Use o link para abrir a camada no laboratório.

**Transição:** “Agora vamos mudar essas partes no código e conferir o resultado ao lado.”

## 04. Laboratório web / 5–7 minutos

| Etapa | O que alterar | O que observar / explicar |
| --- | --- | --- |
| HTML | O texto do `h1` | O título da prévia muda; tags dão significado ao conteúdo |
| CSS | A variável `--cor` | O botão e a cor da energia mudam; a animação é uma regra de estilo |
| JavaScript | `ganho` de 10 para 50 | O clique passa a somar mais energia; mensagem, preenchimento e console acompanham |

O botão é **Dar energia**. Cada edição recria a prévia e zera a energia. `console.log` imprime os valores no console abaixo. Erros de sintaxe também aparecem ali. Se quiser preparar uma mudança longa, pause **Atualizar ao digitar** e execute depois.

**Restaurar exemplo** devolve os três arquivos e a etapa HTML. **Voltar à explicação** retoma a origem do link.

## 05–06. Da página às profissões

Compare uma ação local com uma consulta simplificada a navegador, servidor e banco. Não há uma requisição real nessa tela.

Apresente os quatro papéis: criar, manter, entender e proteger. Cada cartão abre seu próprio laboratório. JavaScript é usado como linguagem comum para comparar a lógica; as carreiras têm outras ferramentas e linguagens.

Explique os dois recursos educativos: `entrada` fornece os controles do cenário e `mostrar` conecta a saída do código à animação.

## 07. Desenvolvimento de software / 3–4 minutos

1. Pergunte: “Com duas estrelas, quantos pontos teremos?”
2. Colete uma estrela e observe o placar e o console.
3. Leia a função: quantidade de estrelas multiplicada pelo valor de cada uma.
4. Troque 10 por 50, sem clicar em Executar; veja o placar recalcular.
5. Colete outra estrela. A regra continua sendo aplicada.

Os botões abaixo explicam receber uma ação, aplicar uma função e mostrar o resultado. Use **Restaurar** se precisar recomeçar. Desenvolvimento envolve entender necessidades, criar, testar e melhorar. Front-end trata da interface, back-end das regras e serviços; full stack atua nos dois.

**Transição:** “Criamos a regra. Como garantir que a aplicação chega até quem usa?”

## 08. Suporte e infraestrutura / 3–4 minutos

1. Envie um pacote com a rede desligada. Ele para no caminho.
2. Ligue a rede e desligue o servidor. Compare a evidência com o diagnóstico.
3. Ligue os dois: o caminho fica disponível.
4. Abra **Desafio: uma verificação sumiu**.
5. Mantenha servidor ativo e desligue a rede. A função pode informar caminho disponível, mas o pacote para. Pergunte qual verificação está faltando.
6. Reponha a condição da rede ou use **Restaurar**.

O caminho animado usa os sinais simulados; o diagnóstico usa o resultado do código. Essa separação permite encontrar o erro. Nada consulta a internet ou a rede real. Suporte investiga dispositivos e problemas dos usuários; infraestrutura cuida também da disponibilidade e da configuração dos ambientes.

**Transição:** “Com o sistema acessível, as interações geram dados. O que eles mostram?”

## 09. Análise de dados / 3–4 minutos

Leia a lista na ordem Jogos, Vídeos e Música. São quantidades fictícias de preferências. Pergunte qual barra crescerá antes de trocar o primeiro valor por 30.

Mostre o gráfico e o total acompanhando a alteração. A função soma os elementos da lista: o acumulador começa em zero e recebe cada número. Não é necessário aprofundar `reduce`. Use **Comparar outra amostra** para mudar a categoria mais frequente.

Peça uma interpretação: qual categoria tem mais escolhas? E o que essa amostra não permite concluir? O trabalho também envolve verificar qualidade, contexto e como comunicar os resultados.

**Transição:** “Os dados ajudam a decidir. E quem cuida de quem pode acessá-los?”

## 10. Cibersegurança / 4 minutos

| Papel | Segunda etapa | Regra original |
| --- | --- | --- |
| Visitante | Não ou sim | Bloqueia |
| Editor | Não | Bloqueia |
| Editor | Sim | Permite |
| Revisor | Sim | Bloqueia, até a função ser alterada |

Teste os controles e observe a porta. Explique `&&` como E: as duas condições são necessárias. Selecione Revisor e use **Incluir o papel revisor**. A função passa a aceitar editor OU revisor, sempre com segunda etapa.

Diferencie autenticação (confirmar identidade) e autorização (definir o que pode fazer). A simulação apenas recebe um papel e um sinal de confirmação; não autentica ninguém. Em produção, a autorização é verificada pelo servidor. Não há senha, conta, ataque ou acesso real.

Cibersegurança envolve prevenção, revisão de acessos, acompanhamento de riscos e resposta a incidentes.

## 11–12. Da regra ao cuidado cotidiano

Retome contas, permissões e dados. A tela de visitante/editor isola a regra de autorização pelo papel, enquanto o laboratório anterior combinava papel e segunda etapa.

Discuta a mensagem fictícia e o pedido de login não iniciado. Peça que a turma observe remetente, urgência e pedido de senha ou código. Confirme pelo serviço oficial e negue solicitações inesperadas. As situações conectam cuidado técnico e comportamento das pessoas.

## 13. As áreas colaboram

Escolha uma situação e pergunte quem começaria a investigação. O link **Rever essa área** abre seu laboratório. Uma falha pode envolver mais de uma equipe; as profissões não funcionam isoladas.

## 14–17. Participação, primeiros passos e fechamento

Use o quiz como conversa coletiva: uma resposta local por pergunta, explicação e revisão ao final. Não há votação sincronizada entre celulares.

Peça que a turma escolha uma primeira prática e reabra um laboratório para uma última alteração. Mostre MDN e CERT.br para continuar. Feche com uma descoberta, um cuidado digital e uma área que despertou curiosidade. Apresente equipe e referências.

## Ensaio

- Teste edição automática, pausa, console, erro e restauração.
- Passe pelas sete práticas: HTML, CSS, JS e quatro profissões.
- Combine quem altera o código e quem conversa com a turma.
- Antes de cada mudança, peça uma previsão do resultado.
- Teste o projetor e a pasta extraída, inclusive sem internet.
- Explique que conexão, contas, papéis, personagens e dados são exemplos fictícios.
