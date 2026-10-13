/* ==========================================================
   comum.js - código usado por todas as páginas:
   - leitura/gravação segura no localStorage
   - perfil (paciente ou fisioterapeuta) e proteção de acesso
   - favoritos do fisioterapeuta
   - pequenas funções de ajuda
   Este arquivo é carregado no <head>, por isso a proteção de
   acesso roda antes da página aparecer.
   ========================================================== */

/* ---------- localStorage (sempre dentro de try/catch) ---------- */

// Guarda o que não conseguiu gravar, para o app continuar funcionando
var memoriaTemporaria = {};

function lerDado(chave, padrao) {
  try {
    var texto = localStorage.getItem(chave);
    if (texto === null) return padrao;
    return JSON.parse(texto);
  } catch (erro) {
    return (chave in memoriaTemporaria) ? memoriaTemporaria[chave] : padrao;
  }
}

function gravarDado(chave, valor) {
  memoriaTemporaria[chave] = valor;
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    // sem localStorage: segue só na memória da página
  }
}

function removerDado(chave) {
  delete memoriaTemporaria[chave];
  try {
    localStorage.removeItem(chave);
  } catch (erro) { }
}

// Apaga tudo do app (menos o perfil escolhido)
function apagarTodosOsDados() {
  var chaves = ["termo_triagem", "termo_ultima", "termo_lembretes", "termo_registros", "termo_favoritos"];
  for (var i = 0; i < chaves.length; i++) removerDado(chaves[i]);
}

/* ---------- Perfil e proteção de acesso ---------- */

function obterPerfil() {
  return lerDado("termo_perfil", null);
}

function definirPerfil(perfil) {
  gravarDado("termo_perfil", perfil);
}

function trocarPerfil() {
  removerDado("termo_perfil");
}

// Cada página interna declara o perfil dela no <html data-perfil="...">.
// Se o perfil salvo for outro (ou não existir), volta para a escolha de perfil.
function protegerAcesso() {
  var exigido = document.documentElement.getAttribute("data-perfil");
  if (!exigido) return; // index.html não precisa de perfil
  if (obterPerfil() !== exigido) {
    window.location.replace("../index.html");
  }
}
protegerAcesso();

/* ---------- Ajudas gerais ---------- */

// Lê um parâmetro da URL (ex.: ?recurso=frio)
function parametroUrl(nome) {
  var busca = window.location.search.replace("?", "").split("&");
  for (var i = 0; i < busca.length; i++) {
    var par = busca[i].split("=");
    if (decodeURIComponent(par[0]) === nome) {
      return decodeURIComponent((par[1] || "").replace(/\+/g, " "));
    }
  }
  return "";
}

// Cria um elemento com texto e classe (evita montar HTML por texto)
function criar(tag, texto, classe) {
  var el = document.createElement(tag);
  if (texto !== undefined && texto !== null) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}

function buscarPorId(lista, id) {
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === id) return lista[i];
  }
  return null;
}

// Nome de uma ficha pelo id (ou o próprio id se não existir)
function nomeDaFicha(id) {
  return DADOS.fichas[id] ? DADOS.fichas[id].nome : id;
}

/* ---------- Favoritos (fisioterapeuta) ---------- */

function listarFavoritos() {
  return lerDado("termo_favoritos", []);
}

function ehFavorito(id) {
  return listarFavoritos().indexOf(id) !== -1;
}

// Liga/desliga um favorito. Os mais novos ficam no começo da lista.
function alternarFavorito(id) {
  var lista = listarFavoritos();
  var posicao = lista.indexOf(id);
  if (posicao === -1) lista.unshift(id);
  else lista.splice(posicao, 1);
  gravarDado("termo_favoritos", lista);
}

// Atualiza o texto de todos os botões "Favoritar" da página
function atualizarBotoesFavorito() {
  var botoes = document.querySelectorAll("[data-favorito]");
  for (var i = 0; i < botoes.length; i++) {
    var id = botoes[i].getAttribute("data-favorito");
    botoes[i].textContent = ehFavorito(id) ? "★ Favorito" : "Favoritar";
    botoes[i].setAttribute("aria-pressed", ehFavorito(id) ? "true" : "false");
  }
}

// Faz um botão [data-favorito] funcionar
function ligarBotaoFavorito(botao) {
  botao.addEventListener("click", function () {
    alternarFavorito(botao.getAttribute("data-favorito"));
    atualizarBotoesFavorito();
  });
  atualizarBotoesFavorito();
}

/* ---------- Comportamentos ligados por atributos ---------- */

document.addEventListener("DOMContentLoaded", function () {
  var i, itens;

  // Tela 1: botões "Sou paciente" / "Sou fisioterapeuta" salvam o perfil
  itens = document.querySelectorAll("[data-escolher-perfil]");
  for (i = 0; i < itens.length; i++) {
    itens[i].addEventListener("click", function () {
      definirPerfil(this.getAttribute("data-escolher-perfil"));
    });
  }

  // "Trocar perfil" apaga o perfil salvo (o link segue para index.html)
  itens = document.querySelectorAll("[data-trocar-perfil]");
  for (i = 0; i < itens.length; i++) {
    itens[i].addEventListener("click", trocarPerfil);
  }

  // "Voltar" que volta para a página anterior (se houver)
  itens = document.querySelectorAll("[data-voltar]");
  for (i = 0; i < itens.length; i++) {
    itens[i].addEventListener("click", function (evento) {
      if (document.referrer && window.history.length > 1) {
        evento.preventDefault();
        window.history.back();
      }
    });
  }
});
