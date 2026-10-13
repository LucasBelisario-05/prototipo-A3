/* ==========================================================
   dados.js - todo o conteúdo de exemplo do protótipo.
   Fica num objeto global DADOS (sem fetch, sem módulos),
   para o protótipo abrir direto do computador.
   "[a preencher]" = conteúdo científico que o grupo vai inserir.
   ========================================================== */

var DADOS = {

  /* ---------- PACIENTE: triagem (uma pergunta por vez) ---------- */
  perguntas: [
    { texto: "Onde você sente o incômodo?",
      opcoes: ["Joelho", "Costas", "Ombro / pescoço", "Mão / outro"] },
    { texto: "Quando o incômodo começou?",
      opcoes: ["Há poucos dias (pancada, torção ou esforço)", "Há semanas ou meses", "Não lembro"] },
    { texto: "Como está o local agora?",
      opcoes: ["Inchado, vermelho ou quente", "Duro, tenso ou rígido", "Nenhuma dessas"] },
    { texto: "No local, você tem ferida aberta, dormência ou problema de circulação?",
      opcoes: ["Não", "Sim", "Não sei"] }
  ],

  /* Regra do resultado da triagem (fácil de trocar).
     Recebe a lista com os textos das 4 respostas.
     Devolve "frio", "calor" ou "alerta". */
  decidirRecurso: function (r) {
    if (r[3] === "Sim" || r[3] === "Não sei") return "alerta";
    if (r[2] === "Inchado, vermelho ou quente") return "frio";
    if (r[2] === "Duro, tenso ou rígido") return "calor";
    // "Nenhuma dessas": decide pelo tempo do incômodo
    if (r[1] === "Há poucos dias (pancada, torção ou esforço)") return "frio";
    if (r[1] === "Há semanas ou meses") return "calor";
    return "alerta"; // "Não lembro"
  },

  /* ---------- PACIENTE: orientações liberadas pelo fisioterapeuta ---------- */
  orientacoes: {
    frio: {
      nome: "FRIO",
      minutos: 15,
      passos: [
        "Enrole a bolsa de gelo em uma toalha fina.",
        "Sente ou deite de forma confortável e apoie a bolsa sobre o local.",
        "Retire quando der o tempo e olhe a pele."
      ],
      atencao: "Atenção: nunca coloque o gelo direto na pele. Se a pele ficar muito branca, doer ou formigar, retire na hora."
    },
    calor: {
      nome: "CALOR",
      minutos: 20,
      passos: [
        "Encha a bolsa com água morna, não fervendo, e enrole em uma toalha.",
        "Sente ou deite de forma confortável e apoie a bolsa sobre o local.",
        "Retire quando der o tempo e olhe a pele."
      ],
      atencao: "Atenção: não deixe direto na pele e não durma com a bolsa. Não use em local inchado ou com ferida. Se arder, retire na hora."
    }
  },

  /* ---------- PACIENTE: textos da tela Informações ---------- */
  informacoes: [
    { titulo: "O que é termoterapia?",
      texto: "É o uso de calor ou de frio para cuidar do corpo. Pode ajudar a aliviar a dor. O seu fisioterapeuta mostra qual usar." },
    { titulo: "Quando o frio costuma ajudar",
      texto: "Logo depois de uma pancada, torção ou esforço. Quando o local está inchado, vermelho ou quente." },
    { titulo: "Quando o calor costuma ajudar",
      texto: "Quando o local está duro, tenso ou rígido. Em dores que duram semanas ou meses." },
    { titulo: "Quando não usar sem falar com o profissional",
      texto: "Se tiver ferida aberta, dormência ou problema de circulação. Se a dor piorar. Se tiver dúvida." }
  ],

  /* ---------- FISIOTERAPEUTA: listas de busca ---------- */
  condicoes: [
    { id: "lombalgia", nome: "Lombalgia" },
    { id: "cervicalgia", nome: "Cervicalgia" },
    { id: "osteoartrite-joelho", nome: "Osteoartrite de joelho" },
    { id: "osteoartrite-mao", nome: "Osteoartrite de mão" },
    { id: "entorse-tornozelo", nome: "Entorse de tornozelo" },
    { id: "dor-muscular-tardia", nome: "Dor muscular tardia" },
    { id: "tendinopatia", nome: "Tendinopatia" },
    { id: "fibromialgia", nome: "Fibromialgia" },
    { id: "artrite-reumatoide", nome: "Artrite reumatoide" },
    { id: "pos-artroplastia-joelho", nome: "Pós-operatório de artroplastia de joelho" }
  ],

  objetivos: [
    { id: "analgesia", nome: "Analgesia" },
    { id: "reducao-edema", nome: "Redução de edema" },
    { id: "ganho-adm", nome: "Ganho de amplitude de movimento" },
    { id: "relaxamento", nome: "Relaxamento muscular" },
    { id: "recuperacao", nome: "Recuperação pós-exercício" }
  ],

  recursos: [
    { id: "crioterapia", nome: "Crioterapia" },
    { id: "calor-superficial", nome: "Calor superficial" },
    { id: "ultrassom", nome: "Ultrassom terapêutico" },
    { id: "parafina", nome: "Parafina" },
    { id: "banho-contraste", nome: "Banho de contraste" }
  ],

  /* Combinações com dados nesta versão.
     itens: recurso (id) + porCondicao:true quando a evidência
     depende da condição (cartão menor, sem ficha). */
  combinacoes: [
    { condicao: "osteoartrite-joelho", objetivo: "analgesia",
      itens: [
        { recurso: "crioterapia" },
        { recurso: "calor-superficial" },
        { recurso: "ultrassom", porCondicao: true }
      ] },
    { condicao: "lombalgia", objetivo: "analgesia",
      itens: [
        { recurso: "calor-superficial" },
        { recurso: "crioterapia" }
      ] },
    { condicao: "entorse-tornozelo", objetivo: "reducao-edema",
      itens: [
        { recurso: "crioterapia" },
        { recurso: "banho-contraste" }
      ] }
  ],

  /* ---------- FISIOTERAPEUTA: fichas científicas ----------
     O id da ficha é o mesmo id do recurso.
     Tudo que é resultado de estudo fica "[a preencher]".
     Só a segurança tem texto geral de exemplo. */
  fichas: {
    "crioterapia": {
      nome: "Crioterapia superficial",
      categoria: "frio superficial",
      certeza: "[a preencher]",
      revisado: "[a preencher]",
      beneficio: "[a preencher]",
      limitacoes: "[a preencher]",
      evidencia: "[a preencher]",
      parametros: "[a preencher]",
      seguranca: "Não aplicar direto na pele; atenção à sensibilidade reduzida e a problemas de circulação.",
      referencias: "[a preencher]"
    },
    "calor-superficial": {
      nome: "Calor superficial",
      categoria: "calor superficial",
      certeza: "[a preencher]",
      revisado: "[a preencher]",
      beneficio: "[a preencher]",
      limitacoes: "[a preencher]",
      evidencia: "[a preencher]",
      parametros: "[a preencher]",
      seguranca: "Risco de queimadura; evitar em áreas com inflamação aguda ou sensibilidade reduzida.",
      referencias: "[a preencher]"
    },
    "banho-contraste": {
      nome: "Banho de contraste",
      categoria: "calor e frio alternados",
      certeza: "[a preencher]",
      revisado: "[a preencher]",
      beneficio: "[a preencher]",
      limitacoes: "[a preencher]",
      evidencia: "[a preencher]",
      parametros: "[a preencher]",
      seguranca: "Risco de queimadura e de desconforto; atenção à sensibilidade reduzida e a problemas de circulação.",
      referencias: "[a preencher]"
    }
  }
};
