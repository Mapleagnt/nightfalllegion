// ===== LINK DO JOGO =====
// Troque aqui sempre que quiser mudar o link
let linkJogo = "https://play.google.com/store/apps/details?id=com.farlightgames.callofdragons";

function abrirJogo() {
    window.open(linkJogo, "_blank");
}

// ===== DADOS INICIAIS =====
let jogadores = [
    { nome: "Player1", poder: 90000 },
    { nome: "Player2", poder: 85000 },
    { nome: "Player3", poder: 80000 },
    { nome: "Player4", poder: 75000 },
    { nome: "Player5", poder: 70000 },
    { nome: "Player6", poder: 65000 },
    { nome: "Player7", poder: 60000 },
    { nome: "Player8", poder: 55000 },
    { nome: "Player9", poder: 50000 },
    { nome: "Player10", poder: 45000 }
];

// ===== TROCAR PÁGINA =====
function trocarPagina(id) {
    document.querySelectorAll(".pagina").forEach(p => p.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    document.querySelectorAll(".menu a").forEach(a => a.classList.remove("ativo"));
    event.target.classList.add("ativo");

    // ===== Mostrar ou esconder social-box =====
    const social = document.querySelector(".social-box");
    if(id === "inicio") {
        social.style.display = "block";
    } else {
        social.style.display = "none";
    }
}

// ===== ATUALIZAR RANKING =====
function atualizarRanking() {
    const top3 = document.getElementById("top3");
    const top10 = document.getElementById("top10");

    top3.innerHTML = "";
    top10.innerHTML = "";

    jogadores.sort((a, b) => b.poder - a.poder);

    // TOP 3
    jogadores.slice(0,3).forEach((j, i) => {
        top3.innerHTML += `
            <div class="card">
                <h3>#${i+1} ${j.nome}</h3>
                <p>${j.poder}</p>
            </div>
        `;
    });

    // TOP 10
    jogadores.forEach((j, i) => {
        top10.innerHTML += `
            <div class="linha">
                <span>#${i+1} ${j.nome}</span>
                <span>${j.poder}</span>
            </div>
        `;
    });
}

// ===== LOGIN =====
function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("painel").style.display = "block";

        carregarRankingTexto();
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

// ===== CARREGAR TEXTO =====
function carregarRankingTexto() {
    let dados = localStorage.getItem("ranking");

    if (!dados) {
        dados = JSON.stringify(jogadores, null, 2);
    }

    document.getElementById("dadosRanking").value = dados;
}

// ===== SALVAR =====
function salvarRanking() {
    const texto = document.getElementById("dadosRanking").value;

    try {
        const novoRanking = JSON.parse(texto);

        localStorage.setItem("ranking", texto);

        jogadores = novoRanking;

        atualizarRanking();

        alert("Ranking atualizado com sucesso!");
    } catch (e) {
        alert("Erro! Formato inválido.");
    }
}

// ===== INICIAR SITE =====
window.onload = function() {
    let dados = localStorage.getItem("ranking");
    if (dados) {
        jogadores = JSON.parse(dados);
    }
    atualizarRanking();

    // Certifica que social-box aparece só no início
    const social = document.querySelector(".social-box");
    social.style.display = "block";
};