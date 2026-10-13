/* ==========================================================
   ficha.js - Tela 8: ficha científica (?id=...)
   ========================================================== */

function mostrarFicha() {
  var id = parametroUrl("id");
  var ficha = DADOS.fichas[id];

  if (!ficha) {
    document.getElementById("conteudo").hidden = true;
    document.getElementById("invalida").hidden = false;
    document.getElementById("btn-fav").hidden = true;
    return;
  }

  document.getElementById("nome").textContent = ficha.nome;
  document.getElementById("categoria").textContent = "Categoria: " + ficha.categoria;
  document.getElementById("certeza").textContent = "Certeza da evidência: " + ficha.certeza;
  document.getElementById("revisado").textContent = "Revisado em " + ficha.revisado;
  document.getElementById("t-evidencia").textContent = ficha.evidencia;
  document.getElementById("t-parametros").textContent = ficha.parametros;
  document.getElementById("t-seguranca").textContent = ficha.seguranca;
  document.getElementById("t-limitacoes").textContent = ficha.limitacoes;
  document.getElementById("t-referencias").textContent = ficha.referencias;
  document.getElementById("btn-comparar").href = "comparar.html?a=" + id;

  var fav = document.getElementById("btn-fav");
  fav.setAttribute("data-favorito", id);
  ligarBotaoFavorito(fav);
}

mostrarFicha();
