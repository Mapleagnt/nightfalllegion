const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const app = express();
app.use(express.json());
const PORT = 3000;

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = 'ID_DO_CANAL_DO_DISCORD';

let messages = []; // guarda todas as mensagens

// Bot Discord
client.on('ready', () => {
    console.log(`Bot logado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.channel.id === CHANNEL_ID) {
        // Adiciona a mensagem do Discord
        messages.push({
            autor: message.author.username,
            texto: message.content,
            origem: 'discord',
            hora: new Date().toLocaleTimeString()
        });
        console.log(`[Discord] ${message.author.username}: ${message.content}`);
    }
});

client.login(TOKEN);

// Receber mensagem do site e enviar pro Discord
app.post('/send', async (req, res) => {
    const { texto, autor } = req.body;
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return res.status(404).send('Canal não encontrado');

    // Envia para Discord
    await channel.send(`${autor}: ${texto}`);

    // Adiciona no histórico local
    messages.push({
        autor,
        texto,
        origem: 'site',
        hora: new Date().toLocaleTimeString()
    });

    res.send('Mensagem enviada para Discord');
});

// Site pega todas as mensagens
app.get('/receive', (req, res) => {
    res.json(messages);
});

// Rodar servidor HTTP
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});