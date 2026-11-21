// OFICINA IFCE: personalize as perguntas e registre suas mudanças com Git!
const perguntas = [
  {texto:"Você recebe uma mensagem dizendo que ganhou um celular. O que faz?",opcoes:["Clico no link imediatamente","Verifico a origem e desconfio da oferta","Compartilho com os amigos"],correta:1,explicacao:"Prêmios inesperados podem ser golpes de phishing. Verifique sempre a fonte.",debate:"Por que promoções boas demais para ser verdade convencem tanta gente?"},
  {texto:"Qual destas senhas é mais segura?",opcoes:["12345678","Meu nome e aniversário","Uma senha longa, única e difícil de adivinhar"],correta:2,explicacao:"Use senhas longas e diferentes para cada conta. Um gerenciador de senhas pode ajudar.",debate:"Por que reutilizar a mesma senha em vários aplicativos é arriscado?"},
  {texto:"O que é autenticação em dois fatores (2FA)?",opcoes:["Uma proteção adicional além da senha","Digitar a senha duas vezes","Ter duas contas iguais"],correta:0,explicacao:"A autenticação em dois fatores dificulta acessos indevidos, mesmo se a senha vazar.",debate:"Quem já viu a opção de verificação em duas etapas no WhatsApp ou Instagram?"},
  {texto:"Um amigo pede um Pix urgente pelo WhatsApp. O que você faz?",opcoes:["Envio o dinheiro imediatamente","Confirmo por ligação ou outro canal confiável","Peço a chave Pix e pago"],correta:1,explicacao:"Golpistas podem se passar por conhecidos. Confirme a identidade por outro meio.",debate:"Como identificar uma mensagem falsa que parece ter vindo de um familiar?"},
  {texto:"Você está conectado a um Wi-Fi público. Qual é a melhor atitude?",opcoes:["Evitar operações sensíveis em redes desconhecidas","Desativar a senha do celular","Aceitar qualquer aviso do navegador"],correta:0,explicacao:"Prefira conexões confiáveis e HTTPS. O cadeado HTTPS não prova que o site é legítimo.",debate:"Quais cuidados devemos ter ao usar Wi-Fi de praça, escola ou comércio?"},
  {texto:"Uma pessoa desconhecida pede seu endereço e o nome da escola no Instagram. O que fazer?",opcoes:["Enviar para fazer amizade","Não compartilhar e bloquear ou denunciar se necessário","Publicar os dados nos stories"],correta:1,explicacao:"Evite divulgar dados que permitam identificar sua localização e rotina.",debate:"Quais informações pessoais costumamos expor sem perceber?"},
  {texto:"Você recebe um arquivo APK de um jogo por mensagem. Qual é a melhor decisão?",opcoes:["Instalar porque veio de um amigo","Desativar as proteções do celular","Evitar instalar e buscar fontes oficiais"],correta:2,explicacao:"Aplicativos de fontes desconhecidas podem conter programas maliciosos.",debate:"Por que um jogo 'gratuito' enviado por mensagem pode representar risco?"},
  {texto:"Um vídeo viral mostra alguém famoso dizendo algo absurdo. Como verificar?",opcoes:["Consultar a fonte e buscar confirmação confiável","Acreditar porque parece real","Compartilhar antes que apaguem"],correta:0,explicacao:"Vídeos podem ser editados ou criados com IA. Confira o contexto e fontes independentes.",debate:"É possível confiar apenas na aparência de um vídeo?"},
  {texto:"Você recebe um código de verificação que não solicitou. O que fazer?",opcoes:["Enviar para quem pediu","Não compartilhar e verificar a segurança da conta","Publicar o código para pedir ajuda"],correta:1,explicacao:"Códigos de verificação são pessoais. Nunca os informe a terceiros.",debate:"Por que um golpista tentaria convencer alguém a revelar um código?"},
  {texto:"Você encontra uma senha real dentro de um projeto no GitHub. Qual é o problema?",opcoes:["Nenhum: o GitHub protege todas as senhas","A senha fica segura se o arquivo tiver outro nome","A credencial pode vazar e ser usada indevidamente"],correta:2,explicacao:"Nunca publique credenciais. Se uma senha real vazar, ela deve ser revogada ou trocada.",debate:"Qual é a diferença entre compartilhar código e compartilhar uma senha?"}
];

let atual = 0;
let pontos = 0;
let respondida = false;
const $ = id => document.getElementById(id);

function mostrarPergunta() {
  const pergunta = perguntas[atual];
  respondida = false;
  $("progress").textContent = `Pergunta ${atual + 1} de ${perguntas.length} • ${pontos} ponto(s)`;
  $("question").textContent = pergunta.texto;
  $("options").replaceChildren();
  $("feedback").textContent = "";
  $("debate").textContent = "";
  $("next").hidden = true;
  pergunta.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.textContent = `${String.fromCharCode(65 + indice)}) ${opcao}`;
    botao.addEventListener("click", () => responder(indice));
    $("options").appendChild(botao);
  });
}

function responder(indice) {
  if (respondida) return;
  respondida = true;
  const pergunta = perguntas[atual];
  const acertou = indice === pergunta.correta;
  if (acertou) pontos++;
  $("feedback").textContent = `${acertou ? "✅ Acertou!" : "💡 Boa tentativa!"} ${pergunta.explicacao}`;
  $("debate").textContent = `💬 Para conversar: ${pergunta.debate}`;
  $("options").querySelectorAll("button").forEach((botao, i) => {
    botao.disabled = true;
    if (i === pergunta.correta) botao.classList.add("correct");
    else if (i === indice) botao.classList.add("incorrect");
  });
  $("next").hidden = false;
  $("next").textContent = atual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
}

$("start").addEventListener("click", () => {
  atual = 0;
  pontos = 0;
  $("intro").hidden = true;
  $("start").hidden = true;
  mostrarPergunta();
});

$("next").addEventListener("click", () => {
  atual++;
  if (atual < perguntas.length) mostrarPergunta();
  else {
    $("progress").textContent = "Desafio concluído!";
    $("question").textContent = `Você acertou ${pontos} de ${perguntas.length}!`;
    $("options").replaceChildren();
    $("feedback").textContent = "Segurança digital começa com boas escolhas. 🔐";
    $("debate").textContent = "Qual dica de segurança você vai compartilhar com alguém hoje?";
    $("next").hidden = true;
    $("start").textContent = "Jogar novamente";
    $("start").hidden = false;
  }
});
