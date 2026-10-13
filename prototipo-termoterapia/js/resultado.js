/* ==========================================================
   resultado.js - Tela 7: recursos da condição + objetivo
   Filtra DADOS.combinacoes pelos parâmetros da URL.
   Os cartões ficam em ordem alfabética (nunca por eficácia).
   ========================================================== */

// Monta a lista de itens a mostrar: { nome, ficha, porCondicao }
function montarItens(modo, valor, objetivo) {
  var itens = [];
  for (var i = 0; i < DADOS.combinacoes.length; i++) {
    var comb = DADOS.combinacoes[i];
    if (comb.objetivo !== objetivo) continue;

    for (var j = 0; j < comb.itens.length; j++) {
      var item = comb.itens[j];
      var ficha = DADOS.fichas[item.recurso] ? item.recurso : null;
      if (modo === "condicao" && comb.condicao === valor) {
        // um cartão por recurso
        itens.push({
          nome: ficha ? DADOS.fichas[ficha].nome : buscarPorId(DADOS.recursos, item.recurso).nome,
          ficha: ficha,
          porCondicao: !!item.porCondicao
        });
      }
      if (modo === "recurso" && item.recurso === valor) {
        // um cartão por condição
        itens.push({
          nome: buscarPorId(DADOS.condicoes, comb.condicao).nome,
          ficha: ficha,
          porCondicao: !!item.porCondicao
        });
      }
    }
  }
  itens.sort(function (a, b) { return a.nome.localeCompare(b.nome, "pt-BR"); });
  return itens;
}

// Cartão normal (com ficha)
function criarCartao(item) {
  var ficha = DADOS.fichas[item.ficha];
  var cartao = criar("article", "", "cartao");

  var topo = criar("div", "", "linha-topo");
  topo.appendChild(criar("h2", item.nome, "nome-recurso"));
  var fav = criar("button", "Favoritar", "btn-texto");
  fav.type = "button";
  fav.setAttribute("data-favorito", item.ficha);
  ligarBotaoFavorito(fav);
  topo.appendChild(fav);
  cartao.appendChild(topo);

  cartao.appendChild(criar("p")).appendChild(criar("span", "Evidência: ver ficha", "etiqueta"));

  var lista = criar("ul", "", "lista");
  lista.appendChild(criar("li", "• Benefício: " + ficha.beneficio));
  lista.appendChild(criar("li", "• Limitações: " + ficha.limitacoes));
  lista.appendChild(criar("li", "• Segurança: " + ficha.seguranca));
  cartao.appendChild(lista);

  var abrir = criar("a", "Abrir ficha", "btn");
  abrir.href = "ficha.html?id=" + item.ficha;
  cartao.appendChild(abrir);
  return cartao;
}

// Cartão menor: a evidência depende da condição
function criarCartaoPorCondicao(item) {
  var cartao = criar("article", "", "cartao pequeno");
  var linha = criar("div", "", "linha-etiqueta");
  linha.appendChild(criar("h2", item.nome, "nome-recurso"));
  linha.appendChild(criar("span", "Por condição", "etiqueta"));
  cartao.appendChild(linha);
  cartao.appendChild(criar("p", "A evidência deste recurso é específica para cada condição."));
  return cartao;
}

function mostrarResultado() {
  var modo = parametroUrl("modo") === "recurso" ? "recurso" : "condicao";
  var valor = parametroUrl(modo);
  var objetivo = parametroUrl("objetivo");

  var lista = modo === "condicao" ? DADOS.condicoes : DADOS.recursos;
  var principal = buscarPorId(lista, valor);
  var obj = buscarPorId(DADOS.objetivos, objetivo);
  var area = document.getElementById("cartoes");

  document.getElementById("titulo").textContent = principal ? principal.nome : "Resultado";

  var itens = (principal && obj) ? montarItens(modo, valor, objetivo) : [];

  if (itens.length === 0) {
    document.getElementById("resumo").hidden = true;
    area.appendChild(criar("div", "Ainda não há fichas para esta combinação nesta versão.", "aviso"));
    var voltar = criar("a", "Voltar à busca", "btn");
    voltar.href = "busca.html";
    area.appendChild(voltar);
    return;
  }

  var unidade = modo === "condicao"
    ? (itens.length === 1 ? "recurso" : "recursos")
    : (itens.length === 1 ? "condição" : "condições");
  document.getElementById("resumo").textContent =
    "Objetivo: " + obj.nome.toLowerCase() + " · " + itens.length + " " + unidade;

  for (var i = 0; i < itens.length; i++) {
    area.appendChild(itens[i].porCondicao || !itens[i].ficha
      ? criarCartaoPorCondicao(itens[i])
      : criarCartao(itens[i]));
  }
}

mostrarResultado();
