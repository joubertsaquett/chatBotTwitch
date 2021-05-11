const tmi = require('tmi.js');
require('dotenv').config()

console.log(`BOT ${process.env.BOT} ESTÁ SENDO INICIADO!`);

// Definir opções de configuração
const opts = {
  identity: {
    username: process.env.BOT,
    password: process.env.TOKEN
  },
  channels: [process.env.CANAL]
};

// Cria um cliente tmi com  nossas opções
const client = new tmi.client(opts);

//IDENTIFICA AS MENSAGENS DO CHAT
function message(alvo, contexto, mensagem, ehBot) {
  if (ehBot) {
    return;
  } //se for mensagens do nosso bot ele não faz nada

  // remove espaço em branco da mensagem para verificar o comando
  const nomeDoComando = mensagem.trim();
  // checando o nosso comando
  if (nomeDoComando === '!ola') {
    let resposta = `* Olá, eu sou o bot ${process.env.BOT}`;
    console.log(resposta);
    client.say(alvo, resposta);
  } else {
    console.log(`* Não conheço o comando: ${nomeDoComando}`);
  }
}

function entrouNoChat(endereco, porta) {
  console.log(`* Bot entrou no chat da live pelo endereço: ${endereco}:${porta}`);
}

// Registra nossas funções
client.on('message', message);
client.on('connected', entrouNoChat);

// Connecta na Twitch:
client.connect();