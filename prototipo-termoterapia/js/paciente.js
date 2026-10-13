/* ==========================================================
   paciente.js - telas de apoio do paciente:
   Tratamentos (lembretes) e Perfil (apagar dados)
   ========================================================== */

// Lista os lembretes salvos, cada um com botão "Remover"
function mostrarLembretes() {
  var area = document.getElementById("lista-lembretes");
  if (!area) return;
  var lembretes = lerDado("termo_lembretes", []);
  area.innerHTML = "";

  if (lembretes.length === 0) {
    area.appendChild(criar("p", "Você ainda não tem lembretes."));
    return;
  }
  var lista = criar("ul", "", "lista");
  for (var i = 0; i < lembretes.length; i++) {
    lista.appendChild(criarLinhaLembrete(lembretes[i]));
  }
  area.appendChild(lista);
}

function criarLinhaLembrete(lembrete) {
  var item = criar("li");
  var linha = criar("div", "", "linha-item");
  var nome = DADOS.orientacoes[lembrete.recurso] ? DADOS.orientacoes[lembrete.recurso].nome.toLowerCase() : lembrete.recurso;
  linha.appendChild(criar("span", nome + " às " + lembrete.horario));

  var remover = criar("button", "Remover", "btn-texto");
  remover.type = "button";
  remover.setAttribute("aria-label", "Remover lembrete de " + nome + " às " + lembrete.horario);
  remover.addEventListener("click", function () {
    var todos = lerDado("termo_lembretes", []).filter(function (l) { return l.id !== lembrete.id; });
    gravarDado("termo_lembretes", todos);
    mostrarLembretes();
  });
  linha.appendChild(remover);
  item.appendChild(linha);
  return item;
}

// Perfil: confirmação na própria tela
function ligarApagarDados() {
  var pedir = document.getElementById("btn-apagar");
  if (!pedir) return;
  var caixa = document.getElementById("confirmar-apagar");
  var msg = document.getElementById("msg-apagado");

  pedir.addEventListener("click", function () {
    caixa.hidden = false;
    msg.textContent = "";
  });
  document.getElementById("btn-cancelar").addEventListener("click", function () {
    caixa.hidden = true;
  });
  document.getElementById("btn-sim").addEventListener("click", function () {
    apagarTodosOsDados();
    caixa.hidden = true;
    msg.textContent = "✓ Dados apagados deste aparelho.";
  });
}

mostrarLembretes();
ligarApagarDados();
