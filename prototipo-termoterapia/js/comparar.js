/* ==========================================================
   comparar.js - comparação lado a lado de duas fichas (?a=id)
   Não indica o melhor recurso.
   ========================================================== */

var LINHAS = [
  ["Categoria", "categoria"],
  ["Certeza da evidência", "certeza"],
  ["Benefício", "beneficio"],
  ["Limitações", "limitacoes"],
  ["Segurança", "seguranca"]
];

function iniciarComparacao() {
  var idA = parametroUrl("a");
  if (!DADOS.fichas[idA]) {
    document.getElementById("conteudo").hidden = true;
    document.getElementById("invalida").hidden = false;
    return;
  }

  // Campo para escolher o segundo recurso (todos, menos o primeiro)
  var campo = document.getElementById("campo-b");
  var op = criar("option", "Selecionar ▾");
  op.value = "";
  campo.appendChild(op);
  for (var id in DADOS.fichas) {
    if (id === idA) continue;
    var o = criar("option", DADOS.fichas[id].nome);
    o.value = id;
    campo.appendChild(o);
  }
  campo.addEventListener("change", function () { montarTabela(idA, campo.value); });
}

function montarTabela(idA, idB) {
  var area = document.getElementById("tabela-area");
  area.innerHTML = "";
  if (!idB) {
    area.appendChild(criar("p", "Escolha o segundo recurso para comparar."));
    return;
  }
  var a = DADOS.fichas[idA];
  var b = DADOS.fichas[idB];

  var tabela = criar("table", "", "tabela");
  var cabeca = criar("thead");
  var linhaCab = criar("tr");
  linhaCab.appendChild(criar("th", a.nome));
  linhaCab.appendChild(criar("th", b.nome));
  cabeca.appendChild(linhaCab);
  tabela.appendChild(cabeca);

  var corpo = criar("tbody");
  for (var i = 0; i < LINHAS.length; i++) {
    // linha do nome do campo, ocupando as duas colunas
    var rotulo = criar("tr");
    var th = criar("th", LINHAS[i][0], "rotulo-linha");
    th.colSpan = 2;
    rotulo.appendChild(th);
    corpo.appendChild(rotulo);
    // linha com os valores (um recurso em cada coluna)
    var valores = criar("tr");
    valores.appendChild(criar("td", a[LINHAS[i][1]]));
    valores.appendChild(criar("td", b[LINHAS[i][1]]));
    corpo.appendChild(valores);
  }
  tabela.appendChild(corpo);
  area.appendChild(tabela);
}

iniciarComparacao();
