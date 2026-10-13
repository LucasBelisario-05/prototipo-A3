/* ==========================================================
   busca.js - Tela 6: busca por condição ou por recurso + favoritos
   ========================================================== */

var modo = "condicao";   // "condicao" ou "recurso"

// Preenche o primeiro campo conforme o modo escolhido
function montarPrimeiroCampo() {
  var rotulo = document.getElementById("rotulo-1");
  var campo = document.getElementById("campo-1");
  var lista = modo === "condicao" ? DADOS.condicoes : DADOS.recursos;

  rotulo.textContent = modo === "condicao"
    ? "1. Condição (" + DADOS.condicoes.length + ")"
    : "1. Recurso";

  campo.innerHTML = "";
  campo.appendChild(criarOpcao("", "Selecionar ▾"));
  for (var i = 0; i < lista.length; i++) {
    campo.appendChild(criarOpcao(lista[i].id, lista[i].nome));
  }
}

function criarOpcao(valor, texto) {
  var op = criar("option", texto);
  op.value = valor;
  return op;
}

function montarObjetivos() {
  var campo = document.getElementById("campo-2");
  campo.appendChild(criarOpcao("", "Selecionar ▾"));
  for (var i = 0; i < DADOS.objetivos.length; i++) {
    campo.appendChild(criarOpcao(DADOS.objetivos[i].id, DADOS.objetivos[i].nome));
  }
}

// Troca entre "Por condição" e "Por recurso"
function trocarModo(novoModo) {
  modo = novoModo;
  document.getElementById("modo-condicao").setAttribute("aria-pressed", modo === "condicao");
  document.getElementById("modo-recurso").setAttribute("aria-pressed", modo === "recurso");
  document.getElementById("aviso-busca").hidden = true;
  montarPrimeiroCampo();
}

// Botão Buscar: valida e abre o resultado
function buscar() {
  var primeiro = document.getElementById("campo-1").value;
  var objetivo = document.getElementById("campo-2").value;
  var aviso = document.getElementById("aviso-busca");

  if (!primeiro || !objetivo) {
    aviso.textContent = "Escolha " + (modo === "condicao" ? "a condição" : "o recurso") +
                        " e o objetivo terapêutico para buscar.";
    aviso.hidden = false;
    return;
  }
  window.location.href = "resultado.html?modo=" + modo + "&" + modo + "=" +
                         encodeURIComponent(primeiro) + "&objetivo=" + encodeURIComponent(objetivo);
}

// Mostra até 3 favoritos
function mostrarFavoritos() {
  var area = document.getElementById("favoritos");
  var favoritos = listarFavoritos().filter(function (id) { return DADOS.fichas[id]; });
  area.innerHTML = "";

  if (favoritos.length === 0) {
    area.appendChild(criar("div", "Nenhum favorito ainda.", "caixa"));
    return;
  }
  for (var i = 0; i < favoritos.length && i < 3; i++) {
    var link = criar("a", nomeDaFicha(favoritos[i]), "caixa caixa-link");
    link.href = "ficha.html?id=" + favoritos[i];
    area.appendChild(link);
  }
  document.getElementById("ver-todos").hidden = favoritos.length <= 3;
}

document.getElementById("modo-condicao").addEventListener("click", function () { trocarModo("condicao"); });
document.getElementById("modo-recurso").addEventListener("click", function () { trocarModo("recurso"); });
document.getElementById("btn-buscar").addEventListener("click", buscar);

montarObjetivos();
montarPrimeiroCampo();
mostrarFavoritos();
