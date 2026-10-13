# Protótipo navegável: Termoterapia (A3 Fisioterapia)

Protótipo de baixa fidelidade em HTML, CSS e JavaScript puro. Sem servidor, sem internet, sem bibliotecas.

## Como abrir
Dê dois cliques em `index.html` (Chrome ou Edge). Em telas largas o app aparece dentro de uma moldura de celular; em celular de verdade ocupa a tela toda.

## Telas
| Tela | Arquivo |
|---|---|
| 1. Login (escolha de perfil) | `index.html` |
| 2. Início do paciente | `paciente/inicio.html` |
| 3. Triagem breve | `paciente/triagem.html` (+ `triagem-alerta.html`) |
| 4. Passo a passo | `paciente/orientacao.html?recurso=frio` ou `calor` |
| 5. Registro e evolução | `paciente/registro.html` |
| Apoio (paciente) | `tratamentos.html`, `informacoes.html`, `contato.html`, `perfil.html` |
| 6. Home e busca do fisioterapeuta | `fisioterapeuta/busca.html` |
| 7. Resultado da busca | `fisioterapeuta/resultado.html?modo=condicao&condicao=...&objetivo=...` |
| 8. Ficha científica | `fisioterapeuta/ficha.html?id=crioterapia` |
| Apoio (fisioterapeuta) | `comparar.html`, `favoritos.html`, `evolucao.html`, `perfil.html` |

## Arquivos
- `css/estilo.css`: único CSS (cores e medidas em variáveis no `:root`).
- `js/dados.js`: todo o conteúdo de exemplo (objeto global `DADOS`). É aqui que o grupo troca as perguntas, a regra da triagem e preenche as fichas (`[a preencher]`).
- `js/comum.js`: perfil, proteção de acesso, localStorage e favoritos.
- `js/login.js`: tela de login (valida e-mail e senha, grava o perfil e abre a interface dele).
- Um JS por tela (`triagem.js`, `orientacao.js`, `registro.js`, `busca.js`, `resultado.js`, `ficha.js`, `favoritos.js`, `comparar.js`) e `paciente.js` (lembretes e apagar dados).

## O que fica salvo no navegador (localStorage)
| Chave | Conteúdo |
|---|---|
| `termo_perfil` | perfil escolhido (`paciente` ou `fisioterapeuta`) |
| `termo_triagem` | respostas e resultado da última triagem |
| `termo_ultima` | última orientação vista (frio ou calor) |
| `termo_lembretes` | lembretes criados (não disparam notificação) |
| `termo_registros` | registros "Como me senti" |
| `termo_favoritos` | fichas favoritadas |

Se o `localStorage` falhar, o app continua navegando (os dados só não ficam salvos).

## Como apagar os dados
- Paciente: **Perfil → Apagar meus dados deste aparelho** (mantém o perfil escolhido).
- Perfil: **Trocar perfil** apaga só o perfil e volta para a escolha.
- Tudo: limpe os dados do site no navegador (F12 → Application → Local Storage → Clear), ou execute `localStorage.clear()` no console.

## Proteção de acesso
Cada página interna declara o perfil dela em `<html data-perfil="...">`. Sem perfil salvo, ou com o perfil da outra interface, `comum.js` redireciona para `index.html`.
