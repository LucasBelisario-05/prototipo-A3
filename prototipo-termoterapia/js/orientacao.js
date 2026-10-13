/* ==========================================================
   orientacao.js - Tela 4: passo a passo de calor ou frio
   O conteúdo vem de DADOS.orientacoes, conforme ?recurso=
   ========================================================== */

function mostrarOrientacao() {
  var recurso = parametroUrl("recurso");
  var orientacao = DADOS.orientacoes[recurso];

  // Parâmetro faltando ou inválido: mensagem simples
  if (!orientacao) {
    document.getElementById("conteudo").hidden = true;
    document.getElementById("invalido").hidden = false;
    return;
  }

  // Guarda qual foi a última orientação vista (usado no registro)
  gravarDado("termo_ultima", { recurso: recurso });

  document.getElementById("recurso-nome").textContent = orientacao.nome;

  // "Para: joelho" se a triagem salvou o local
  var triagem = lerDado("termo_triagem", null);
  if (triagem && triagem.local) {
    var local = document.getElementById("recurso-local");
    local.textContent = "Para: " + triagem.local.toLowerCase();
    local.hidden = false;
  }

  document.getElementById("tempo").textContent =
    "Tempo: " + orientacao.minutos + " min (definido pelo fisioterapeuta)";

  var lista = document.getElementById("passos");
  for (var i = 0; i < orientacao.passos.length; i++) {
    lista.appendChild(criar("li", (i + 1) + ". " + orientacao.passos[i]));
  }

  document.getElementById("cuidados").textContent = orientacao.atencao;

  // Lembrete
  document.getElementById("btn-lembrar").addEventListener("click", function () {
    document.getElementById("form-lembrete").hidden = false;
    document.getElementById("hora").focus();
  });
  document.getElementById("btn-confirmar").addEventListener("click", function () {
    confirmarLembrete(recurso);
  });
}

// Salva o lembrete (recurso + horário) e mostra a confirmação
function confirmarLembrete(recurso) {
  var hora = document.getElementById("hora").value;
  var msg = document.getElementById("msg-lembrete");
  if (!hora) {
    msg.textContent = "Escolha um horário para o lembrete.";
    msg.className = "aviso";
    return;
  }
  var lembretes = lerDado("termo_lembretes", []);
  lembretes.push({ id: Date.now(), recurso: recurso, horario: hora });
  gravarDado("termo_lembretes", lembretes);
  msg.textContent = "✓ Lembrete criado para " + hora + ".";
  msg.className = "msg-ok";
}

mostrarOrientacao();
