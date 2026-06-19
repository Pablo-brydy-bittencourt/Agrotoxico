// Função para iniciar o jogo
function startGame() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
}

// Banco de dados das perguntas do quiz
const perguntas = [
    {
        tema: "agrotoxicos",
        pergunta: "Qual é um dos principais riscos do uso excessivo de agrotóxicos?",
        opcoes: [
            "Aumentar a biodiversidade no campo",
            "Contaminar solo, água e alimentos",
            "Diminuir a produtividade agrícola",
            "Melhorar a qualidade do ar"
        ],
        correta: 1,
        explicacao: "O uso excessivo pode contaminar solo, água e alimentos, afetando a saúde e a biodiversidade."
    },
    {
        tema: "agrotoxicos",
        pergunta: "Por que muitos agricultores usam agrotóxicos?",
        opcoes: [
            "Para colorir as plantas",
            "Para controlar pragas e doenças",
            "Para diminuir a produção de alimentos",
            "Para substituir adubos orgânicos"
        ],
        correta: 1,
        explicacao: "Agrotóxicos são usados para controlar pragas, doenças e plantas invasoras."
    },
    {
        tema: "sustentabilidade",
        pergunta: "Sustentabilidade busca equilibrar:",
        opcoes: [
            "Economia, moda e esportes",
            "Tecnologia, política e arte",
            "Desenvolvimento econômico, ambiente e bem-estar social",
            "Internet, transporte e comunicação"
        ],
        correta: 2,
        explicacao: "Sustentabilidade é o equilíbrio entre economia, ambiente e sociedade."
    },
    {
        tema: "sustentabilidade",
        pergunta: "Qual é um exemplo de prática sustentável?",
        opcoes: [
            "Deixar torneiras abertas",
            "Desmatar para plantar mais",
            "Reutilizar e reciclar materiais",
            "Jogar lixo em rios"
        ],
        correta: 2,
        explicacao: "Reutilizar e reciclar materiais é uma prática que preserva recursos naturais."
    },
    {
        tema: "consumo",
        pergunta: "O que é consumo consciente?",
        opcoes: [
            "Comprar o máximo possível",
            "Comprar sem pensar no meio ambiente",
            "Escolher produtos considerando impactos sociais e ambientais",
            "Nunca comprar nada novo"
        ],
        correta: 2,
        explicacao: "Consumo consciente considera impactos ambientais e sociais de cada compra."
    },
    {
        tema: "consumo",
        pergunta: "Qual atitude representa consumo consciente?",
        opcoes: [
            "Desperdiçar alimentos",
            "Preferir produtos de produtores locais",
            "Usar sacolas plásticas sempre",
            "Trocar de celular todo mês"
        ],
        correta: 1,
        explicacao: "Apoiar produtores locais reduz impactos de transporte e fortalece a economia local."
    },
    {
        tema: "geral",
        pergunta: "Uma forma de reduzir o uso de agrotóxicos é:",
        opcoes: [
            "Plantar mais monoculturas",
            "Aumentar o uso de fertilizantes químicos",
            "Adotar agricultura orgânica e integrada",
            "Desmatar para expandir lavouras"
        ],
        correta: 2,
        explicacao: "Agricultura orgânica e integrada busca reduzir ou eliminar agrotóxicos."
    },
    {
        tema: "geral",
        pergunta: "Escolher alimentos orgânicos pode ajudar porque:",
        opcoes: [
            "Sempre são mais baratos",
            "Nunca usam água",
            "Geralmente têm menos agrotóxicos",
            "São feitos apenas em laboratório"
        ],
        correta: 2,
        explicacao: "A produção orgânica evita o uso de agrotóxicos sintéticos."
    }
];

const dicas = [
    "🌱 Agricultura orgânica reduz o uso de agrotóxicos.",
    "💧 Fechar a torneira ao escovar os dentes economiza água.",
    "♻️ Separar lixo reciclável ajuda a reduzir a poluição.",
    "🍎 Prefira alimentos de produtores locais e da estação.",
    "🌍 Pequenas escolhas diárias geram grandes impactos no meio ambiente."
];

let score = 0;
let respondidas = 0;
let perguntaAtual = null;
let perguntaRespondida = false;

// Seleção de elementos do DOM
const scoreSpan = document.getElementById("score");
const respSpan = document.getElementById("respondidas");
const totalSpan = document.getElementById("total-perguntas");
const caixas = document.querySelectorAll(".caixa");
const perguntaContainer = document.getElementById("pergunta-container");
const perguntaTexto = document.getElementById("pergunta-texto");
const opcoesDiv = document.getElementById("opcoes");
const feedbackDiv = document.getElementById("feedback");
const msgFinalDiv = document.getElementById("mensagem-final");
const mensagensLaterais = document.getElementById("mensagens-laterais");

// Define a quantidade total de perguntas no HUD
totalSpan.textContent = perguntas.length;

// Sorteia uma pergunta baseada no tema clicado
function pegarPerguntaPorTema(tema) {
    const filtradas = perguntas.filter(p => p.tema === tema || tema === "geral");
    if (filtradas.length === 0) return null;
    return filtradas[Math.floor(Math.random() * filtradas.length)];
}

function mostrarPergunta(tema) {
    perguntaAtual = pegarPerguntaPorTema(tema);
    if (!perguntaAtual) return;

    perguntaContainer.style.display = "block";
    feedbackDiv.textContent = "";
    perguntaRespondida = false;

    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = "";

    perguntaAtual.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.classList.add("opcao");
        btn.textContent = opcao;
        btn.onclick = () => responder(index);
        opcoesDiv.appendChild(btn);
    });
}

function responder(indice) {
    if (perguntaRespondida) return; 
    perguntaRespondida = true;
    respondidas++;
    respSpan.textContent = respondidas;

    if (indice === perguntaAtual.correta) {
        score += 10;
        feedbackDiv.style.color = "green";
        feedbackDiv.textContent = "✔ Resposta correta! " + perguntaAtual.explicacao;
    } else {
        score -= 5;
        feedbackDiv.style.color = "red";
        feedbackDiv.textContent = "✖ Resposta incorreta. " + perguntaAtual.explicacao;
    }
    scoreSpan.textContent = score;

    if (respondidas >= perguntas.length) {
        finalizarJogo();
    }
}

function finalizarJogo() {
    msgFinalDiv.style.display = "block";
    msgFinalDiv.innerHTML = `
        <strong>Fim do quiz!</strong><br>
        Sua pontuação final foi: <strong>${score}</strong> pontos.<br>
        Lembre-se: escolhas conscientes ajudam a construir um futuro sustentável! 🌱
    `;
}

// Configuração dos eventos de clique nos blocos de tema
caixas.forEach(caixa => {
    caixa.addEventListener("click", () => {
        const tema = caixa.getAttribute("data-tema");
        mostrarPergunta(tema);
    });
});

// Sistema rotativo de exibição de dicas (a cada 6 segundos)
setInterval(() => {
    const dica = dicas[Math.floor(Math.random() * dicas.length)];
    mensagensLaterais.textContent = dica;
}, 6000);
