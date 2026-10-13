/* ==========================================================
   favoritos.js - lista de todas as fichas favoritadas
   ========================================================== */

function mostrarFavoritos() {
  var area = document.getElementById("lista-favoritos");
  var favoritos = listarFavoritos().filter(function (id) { return DADOS.fichas[id]; });
  area.innerHTML = "";

  if (favoritos.length === 0) {
    area.appendChild(criar("div", "Toque em Favoritar no resultado da busca ou na ficha para salvar aqui.", "caixa"));
    return;
  }

  var caixa = criar("ul", "", "caixa lista lista-caixa");
  for (var i = 0; i < favoritos.length; i++) {
    caixa.appendChild(criarLinhaFavorito(favoritos[i]));
  }
  area.appendChild(caixa);
}

function criarLinhaFavorito(id) {
  var item = criar("li");
  var linha = criar("div", "", "linha-item");

  var link = criar("a", nomeDaFicha(id));
  link.href = "ficha.html?id=" + id;
  link.style.fontWeight = "bold";
  linha.appendChild(link);

  var remover = criar("button", "Remover", "btn-texto");
  remover.type = "button";
  remover.setAttribute("aria-label", "Remover " + nomeDaFicha(id) + " dos favoritos");
  remover.addEventListener("click", function () {
    alternarFavorito(id);
    mostrarFavoritos();
  });
  linha.appendChild(remover);

  item.appendChild(linha);
  return item;
}

mostrarFavoritos();
