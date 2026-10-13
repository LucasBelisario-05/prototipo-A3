/* ==========================================================
   registro.js - Tela 5: como me senti + evolução
   ========================================================== */

var respostaEscolhida = "";   // "Melhor", "Igual" ou "Pior"

// Marca um dos três botões (escolha única)
function escolherResposta(botao) {
  respostaEscolhida = botao.getAttribute("data-resposta");
  var botoes = document.querySelectorAll("[data-resposta]");
  for (var i = 0; i < botoes.length; i++) {
    var marcado = botoes[i] === botao;
    botoes[i].classList.toggle("escolhido", marcado);
    botoes[i].setAttribute("aria-pressed", marcado ? "true" : "false");
  }
}

// Lê os sintomas marcados
function sintomasMarcados() {
  var lista = [];
  var caixas = document.querySelectorAll("input[name='sintoma']");
  for (var i = 0; i < caixas.length; i++) {
    if (caixas[i].checked) lista.push(caixas[i].value);
  }
  return lista;
}

function mostrarMensagem(texto, comoAviso) {
  var msg = document.getElementById("msg");
  msg.textContent = texto;
  msg.className = comoAviso ? "aviso" : "msg-ok";
}

// Salva o registro no localStorage
function salvarRegistro() {
  if (!respostaEscolhida) {
    mostrarMensagem("Escolha Melhor, Igual ou Pior antes de salvar.", true);
    return;
  }
  var sintomas = sintomasMarcados();
  var ultima = lerDado("termo_ultima", null);
  var recurso = ultima ? ultima.recurso : "Não informado";

  var registros = lerDado("termo_registros", []);
  registros.unshift({            // o mais novo fica no começo
    data: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
    recurso: recurso,
    resposta: respostaEscolhida,
    sintomas: sintomas
  });
  gravarDado("termo_registros", registros);

  // Piorou? Destaca o aviso e mostra o botão de contato
  var piorou = respostaEscolhida === "Pior" ||
               sintomas.indexOf("Dor aumentou") !== -1 ||
               sintomas.indexOf("Ardência") !== -1;
  destacarAviso(piorou);

  limparFormulario();
  mostrarMensagem("✓ Registro salvo", false);
  mostrarRegistros();
}

function destacarAviso(ligado) {
  document.getElementById("aviso-piora").classList.toggle("destaque", ligado);
  document.getElementById("btn-contato").hidden = !ligado;
}

function limparFormulario() {
  respostaEscolhida = "";
  var botoes = document.querySelectorAll("[data-resposta]");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("escolhido");
    botoes[i].setAttribute("aria-pressed", "false");
  }
  var caixas = document.querySelectorAll("input[name='sintoma']");
  for (var j = 0; j < caixas.length; j++) caixas[j].checked = false;
}

// Mostra o resumo e a lista de registros
function mostrarRegistros() {
  var registros = lerDado("termo_registros", []);
  var resumo = document.getElementById("resumo");
  var lista = document.getElementById("lista-registros");
  lista.innerHTML = "";

  if (registros.length === 0) {
    resumo.textContent = "Você ainda não tem registros.";
    return;
  }

  var contagem = { Melhor: 0, Igual: 0, Pior: 0 };
  var ultimos = registros.slice(0, 10);
  for (var i = 0; i < ultimos.length; i++) contagem[ultimos[i].resposta]++;
  resumo.textContent = "Últimos registros: " + contagem.Melhor + " melhor, " +
                       contagem.Igual + " igual, " + contagem.Pior + " pior";

  for (var j = 0; j < registros.length; j++) {
    var r = registros[j];
    var nome = DADOS.orientacoes[r.recurso] ? DADOS.orientacoes[r.recurso].nome.toLowerCase() : r.recurso;
    var sintomas = r.sintomas.length ? r.sintomas.join(", ") : "sem sintomas";
    lista.appendChild(criar("li", r.data + " · " + nome + " · " + r.resposta + " · " + sintomas));
  }
}

// Liga os botões
var botoesResposta = document.querySelectorAll("[data-resposta]");
for (var k = 0; k < botoesResposta.length; k++) {
  botoesResposta[k].addEventListener("click", function () { escolherResposta(this); });
}
document.getElementById("btn-salvar").addEventListener("click", salvarRegistro);
mostrarRegistros();
