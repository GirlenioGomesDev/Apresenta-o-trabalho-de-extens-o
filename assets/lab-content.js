/* Exemplos curtos: o mesmo JavaScript permite comparar a lógica das quatro áreas. */
window.LiveLabLessons = {
  software: {
    file: 'placar.js', title: 'Um jogo também é um conjunto de regras.',
    input: { estrelas: 1 },
    code: `function calcularPontos(estrelas) {
  return estrelas * 10;
}

const pontos = calcularPontos(entrada.estrelas);
console.log("Placar:", pontos);
mostrar({ pontos });`,
    alternate: `function calcularPontos(estrelas) {
  return estrelas * 50;
}

const pontos = calcularPontos(entrada.estrelas);
console.log("Meu novo placar:", pontos);
mostrar({ pontos });`,
    preset: 'Experimentar pontos ×50',
    challenge: 'Mude 10 para 50. Depois colete uma estrela: a mesma ação passa a valer mais pontos.',
    steps: [
      { lines: 'L5', label: 'Receber uma ação', text: 'O botão do cenário aumenta a quantidade de estrelas. Esse número chega ao código por entrada.estrelas.' },
      { lines: 'L1–3', label: 'Aplicar uma função', text: 'calcularPontos recebe a quantidade e devolve quantidade × valor. Uma função permite repetir a mesma regra.' },
      { lines: 'L6–7', label: 'Mostrar o resultado', text: 'console.log escreve no console. mostrar envia os pontos para o placar animado ao lado.' }
    ]
  },
  infra: {
    file: 'diagnostico.js', title: 'Investigar por etapas ajuda a encontrar a falha.',
    input: { redeAtiva: false, servidorAtivo: true },
    code: `function diagnosticar(rede, servidor) {
  if (!rede) return "rede";
  if (!servidor) return "servidor";
  return "online";
}

const status = diagnosticar(
  entrada.redeAtiva, entrada.servidorAtivo
);
console.log("Diagnóstico:", status);
mostrar({ status });`,
    alternate: `function diagnosticar(rede, servidor) {
  // Desafio: falta verificar a rede nesta função.
  if (!servidor) return "servidor";
  return "online";
}

const status = diagnosticar(
  entrada.redeAtiva, entrada.servidorAtivo
);
console.log("Diagnóstico:", status);
mostrar({ status });`,
    preset: 'Desafio: uma verificação sumiu',
    challenge: 'Ligue a rede e desligue o servidor. Depois abra o desafio e descubra por que o diagnóstico pode errar.',
    steps: [
      { lines: 'L7–9', label: 'Observar os sinais', text: 'As chaves ao lado representam uma rede e um servidor fictícios. true significa ativo; false significa inativo.' },
      { lines: 'L1–5', label: 'Testar condições', text: 'if significa “se”. O símbolo ! inverte a condição: se a rede não está ativa, a função aponta rede.' },
      { lines: 'L10–11', label: 'Comunicar a causa', text: 'O texto devolvido vira um diagnóstico e destaca uma etapa. A animação do pacote segue o estado físico simulado, permitindo comparar evidência e conclusão.' }
    ]
  },
  dados: {
    file: 'preferencias.js', title: 'Números viram uma informação que dá para enxergar.',
    input: {},
    code: `const votos = [12, 8, 5];

function somar(valores) {
  return valores.reduce((soma, n) => soma + n, 0);
}

const total = somar(votos);
console.log("Total de respostas:", total);
mostrar({ valores: votos, total });`,
    alternate: `const votos = [6, 20, 9];

function somar(valores) {
  return valores.reduce((soma, n) => soma + n, 0);
}

const total = somar(votos);
console.log("Total de respostas:", total);
mostrar({ valores: votos, total });`,
    preset: 'Comparar outra amostra',
    challenge: 'Troque o primeiro número por 30. Antes de editar, pergunte à turma qual barra vai crescer.',
    steps: [
      { lines: 'L1', label: 'Organizar os dados', text: 'A lista contém quantidades fictícias de preferências por Jogos, Vídeos e Música, nesta ordem. Nenhuma resposta real é coletada.' },
      { lines: 'L3–5', label: 'Calcular uma medida', text: 'A função percorre a lista e acumula a soma. O zero é o ponto de partida; cada número entra no total.' },
      { lines: 'L7–9', label: 'Ler o gráfico', text: 'As barras e o total são gerados pelos valores devolvidos pelo código. Compare quantidades e faça uma pergunta antes de tirar uma conclusão.' }
    ]
  },
  cyber: {
    file: 'acesso.js', title: 'Uma regra de acesso decide quem atravessa a porta.',
    input: { papel: 'visitante', segundaEtapa: false },
    code: `function podeEntrar(papel, segundaEtapa) {
  return papel === "editor" && segundaEtapa;
}

const permitido = podeEntrar(
  entrada.papel, entrada.segundaEtapa
);
console.log(permitido ? "Acesso liberado" : "Acesso bloqueado");
mostrar({ permitido });`,
    alternate: `function podeEntrar(papel, segundaEtapa) {
  const autorizado = papel === "editor" || papel === "revisor";
  return autorizado && segundaEtapa;
}

const permitido = podeEntrar(
  entrada.papel, entrada.segundaEtapa
);
console.log(permitido ? "Acesso liberado" : "Acesso bloqueado");
mostrar({ permitido });`,
    preset: 'Incluir o papel revisor',
    challenge: 'Teste visitante, editor e a segunda etapa. Depois permita também o papel revisor, mantendo as duas verificações.',
    steps: [
      { lines: 'L5–7', label: 'Receber o contexto', text: 'O laboratório fornece um papel fictício e informa se a segunda etapa foi confirmada. Não pedimos senha nem acessamos contas reais.' },
      { lines: 'L1–3', label: 'Combinar verificações', text: '=== compara valores. && significa E; || significa OU. Combine um papel autorizado com a confirmação da segunda etapa.' },
      { lines: 'L8–9', label: 'Permitir ou bloquear', text: 'true abre a porta; false bloqueia. Em produção, a autorização deve ser verificada no servidor. Este cenário só representa a regra.' }
    ]
  }
};
