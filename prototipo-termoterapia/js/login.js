/* ==========================================================
   login.js - tela de login (index.html)
   Protótipo: não há servidor nem contas. Qualquer e-mail válido
   e senha preenchida entram; o perfil escolhido define a interface.
   ========================================================== */

var PAGINA_INICIAL = {
  paciente: "paciente/inicio.html",
  fisioterapeuta: "fisioterapeuta/busca.html"
};

document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("form-login");
  var campoEmail = document.getElementById("email");
  var campoSenha = document.getElementById("senha");
  var mensagem = document.getElementById("msg-erro");
  var botoes = document.querySelectorAll("[data-perfil-login]");
  var perfil = obterPerfil() === "fisioterapeuta" ? "fisioterapeuta" : "paciente";
  var i;

  function marcarPerfil() {
    for (i = 0; i < botoes.length; i++) {
      var ativo = botoes[i].getAttribute("data-perfil-login") === perfil;
      botoes[i].setAttribute("aria-pressed", ativo ? "true" : "false");
    }
  }

  function mostrarErro(texto, campo) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
    campo.focus();
  }

  for (i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
      perfil = this.getAttribute("data-perfil-login");
      marcarPerfil();
    });
  }
  marcarPerfil();

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagem.hidden = true;

    var email = campoEmail.value.replace(/^\s+|\s+$/g, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarErro("Digite um e-mail válido.", campoEmail);
      return;
    }
    if (campoSenha.value === "") {
      mostrarErro("Digite sua senha.", campoSenha);
      return;
    }

    definirPerfil(perfil);
    window.location.href = PAGINA_INICIAL[perfil];
  });
});
