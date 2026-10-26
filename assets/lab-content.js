/* Laboratório de código da carreira de desenvolvimento. */
window.LiveLabLessons = {
  "software": {
    "file": "placar.js",
    "title": "Um jogo também é um conjunto de regras.",
    "input": {
      "estrelas": 1
    },
    "code": "function calcularPontos(estrelas) {\n  return estrelas * 10;\n}\n\nconst pontos = calcularPontos(entrada.estrelas);\nconsole.log(\"Placar:\", pontos);\nmostrar({ pontos });",
    "alternate": "function calcularPontos(estrelas) {\n  return estrelas * 50;\n}\n\nconst pontos = calcularPontos(entrada.estrelas);\nconsole.log(\"Meu novo placar:\", pontos);\nmostrar({ pontos });",
    "preset": "Experimentar pontos ×50",
    "challenge": "Mude 10 para 50. Depois colete uma estrela: a mesma ação passa a valer mais pontos.",
    "steps": [
      {
        "lines": "L5",
        "label": "Receber uma ação",
        "text": "O botão do cenário aumenta a quantidade de estrelas. Esse número chega ao código por entrada.estrelas."
      },
      {
        "lines": "L1–3",
        "label": "Aplicar uma função",
        "text": "calcularPontos recebe a quantidade e devolve quantidade × valor. Uma função permite repetir a mesma regra."
      },
      {
        "lines": "L6–7",
        "label": "Mostrar o resultado",
        "text": "console.log escreve no console. mostrar envia os pontos para o placar animado ao lado."
      }
    ]
  }
};
