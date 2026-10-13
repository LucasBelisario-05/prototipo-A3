/* ==========================================================
   triagem.js - Tela 3: uma pergunta por vez, na mesma página
   ========================================================== */

var indice = 0;        // pergunta atual (0 a 3)
var respostas = [];    // textos das respostas escolhidas

// Mostra a pergunta atual, as respostas e atualiza o progresso
function mostrarPergunta() {
  var total = DADOS.perguntas.length;
  var pergunta = DADOS.perguntas[indice];

  document.getElementById("contador").textContent = "Pergunta " + (indice + 1) + " de " + total;
  document.getElementById("barra").value = indice + 1;
  document.getElementById("barra").max = total;
  document.getElementById("pergunta").textContent = pergunta.texto;

  var area = document.getElementById("respostas");
  area.innerHTML = "";
  for (var i = 0; i < pergunta.opcoes.length; i++) {
    var botao = criar("button", pergunta.opcoes[i], "btn resposta");
    botao.type = "button";
    botao.addEventListener("click", escolherResposta);
    area.appendChild(botao);
  }
}

// Guarda a resposta e passa direto para a próxima
function escolherResposta(evento) {
  respostas[indice] = evento.currentTarget.textContent;
  if (indice < DADOS.perguntas.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    terminarTriagem();
  }
}

// Calcula o resultado, salva e abre a próxima tela
function terminarTriagem() {
  var recurso = DADOS.decidirRecurso(respostas);
  gravarDado("termo_triagem", {
    respostas: respostas,
    recurso: recurso,
    local: respostas[0]
  });
  if (recurso === "alerta") {
    window.location.href = "triagem-alerta.html";
  } else {
    window.location.href = "orientacao.html?recurso=" + recurso;
  }
}

// "Voltar": na 1ª pergunta vai ao Início; nas outras volta uma pergunta
function aoClicarVoltar(evento) {
  if (indice > 0) {
    evento.preventDefault();
    indice--;
    mostrarPergunta();
  }
}

document.getElementById("voltar").addEventListener("click", aoClicarVoltar);
mostrarPergunta();
