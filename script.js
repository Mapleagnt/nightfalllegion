// Elementos do chat
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// Função para enviar mensagem
async function enviarMensagem() {
    const texto = input.value.trim();
    if (!texto) return;

    // Aqui você manda para o seu backend / Node.js
    await fetch('http://192.168.1.245:3000/send', { // substituído pelo seu IP
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, autor: 'Você' })
    });

    // Limpa input
    input.value = '';
}

// Função para atualizar mensagens
async function atualizarMensagens() {
    const res = await fetch('http://192.168.1.245:3000/receive'); // substituído pelo seu IP
    const msgs = await res.json();

    messagesDiv.innerHTML = '';

    msgs.forEach(m => {
        const p = document.createElement('p');
        p.classList.add('message');
        p.innerHTML = `<span class="author">[${m.origem}] ${m.autor}:</span> ${m.texto}`;
        messagesDiv.appendChild(p);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Eventos
sendBtn.addEventListener('click', enviarMensagem);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
});

// Atualiza automaticamente a cada 2 segundos
setInterval(atualizarMensagens, 2000);
