// let score = 0;
// let gameInterval;
// const scoreDisplay = document.getElementById("score");
// const gameArea = document.getElementById("game-area");
// const startBtn = document.getElementById("start-btn");
// const stopBtn = document.getElementById("stop-btn");
// const bubbleValuesElement = document.getElementById("bubble-values");

// // Musique de fond
// const bgMusic = new Audio('music/music.mp3');
// bgMusic.loop = true; // La musique tourne en boucle

// // Objet pour suivre les scores par couleur
// const bubbleScores = {
//     red: 0,
//     blue: 0,
//     green: 0,
//     yellow: 0
// };

// // Dictionnaire des couleurs et points
// const bubbleTypes = {
//     red: 10,
//     blue: 5,
//     green: 15,
//     yellow: 20
// };

// function createBubble() {
//     const bubble = document.createElement("div");

//     // Choisir une couleur aléatoire
//     const colors = Object.keys(bubbleTypes);
//     const color = colors[Math.floor(Math.random() * colors.length)];

//     // Stocker la couleur comme attribut de la bulle
//     bubble.dataset.color = color;

//     const size = Math.random() * 40 + 30; // 30–70px
//     const x = Math.random() * (window.innerWidth - size);

//     bubble.classList.add("bubble", color);
//     // bubble.style.background = color; // Removed: handled by CSS
//     bubble.style.width = size + "px";
//     bubble.style.height = size + "px";
//     bubble.style.left = x + "px";

//     // Quand on clique sur une bulle
//     bubble.addEventListener("click", () => {
//         const bubbleColor = bubble.dataset.color;
//         const points = bubbleTypes[bubbleColor];

//         // Mettre à jour le score total
//         score += points;
//         scoreDisplay.textContent = "Score : " + score;

//         bubble.remove();
//     });

//     // Retirer la bulle quand elle sort de l'écran
//     bubble.addEventListener("animationend", () => {
//         bubble.remove();
//     });

//     gameArea.appendChild(bubble);
// }

// // Fonction pour afficher les VALEURS FIXES des bulles
// function displayBubbleValues() {
//     bubbleValuesElement.innerHTML = '';

//     for (const [color, value] of Object.entries(bubbleTypes)) {
//         const valueElement = document.createElement('div');
//         valueElement.className = 'bubble-score';

//         const input = document.createElement('input');
//         input.type = 'text';
//         input.readOnly = true;
//         input.value = `${value} pts`;
//         input.className = 'bubble-score-input';

//         valueElement.innerHTML = `
//             <div class="bubble-score-color ${color}"></div>
//             <div class="bubble-info">
//                 <div class="bubble-name">${color.charAt(0).toUpperCase() + color.slice(1)}</div>
//             </div>
//         `;
//         valueElement.appendChild(input);
//         bubbleValuesElement.appendChild(valueElement);
//     }
// }

// // Fonction pour démarrer le jeu
// function startGame() {
//     // Réinitialiser les scores
//     score = 0;
//     scoreDisplay.textContent = "Score : 0";

//     // Réinitialiser les scores par couleur
//     for (const color in bubbleScores) {
//         bubbleScores[color] = 0;
//     }

//     // Vider la zone de jeu
//     gameArea.innerHTML = '';

//     // Démarrer la création de bulles
//     gameInterval = setInterval(createBubble, 700);

//     // Activer/désactiver les boutons
//     startBtn.disabled = true;
//     stopBtn.disabled = false;

//     // Lancer la musique
//     bgMusic.play().catch(error => console.log("Lecture auto bloquée :", error));
// }

// // Fonction pour arrêter le jeu
// function stopGame() {
//     clearInterval(gameInterval);

//     // Supprimer toutes les bulles
//     const bubbles = document.querySelectorAll('.bubble');
//     bubbles.forEach(bubble => {
//         bubble.remove();
//     });

//     // Activer/désactiver les boutons
//     startBtn.disabled = false;
//     stopBtn.disabled = true;

//     // Arrêter la musique
//     bgMusic.pause();
//     bgMusic.currentTime = 0; // Remettre au début
// }

// // Événements des boutons
// startBtn.addEventListener('click', startGame);
// stopBtn.addEventListener('click', stopGame);

// // Démarrer le jeu automatiquement au chargement de la page
// // startGame(); // Décommentez cette ligne si vous voulez que le jeu démarre automatiquement

// // Afficher les valeurs des bulles au chargement de la page
// document.addEventListener('DOMContentLoaded', () => {
//     displayBubbleValues();
// });

let score = 0;
let gameInterval;
let currentSpeed = 700;  /** vitesse initiale (en ms) **/
let isPaused = false;  // État de pause

const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const bubbleValuesElement = document.getElementById("bubble-values");

// Musique de fond
const bgMusic = new Audio('music/music.mp3');
bgMusic.loop = true;

// Scores par couleur
const bubbleScores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
};

// Valeurs fixes des bulles
const bubbleTypes = {
    red: 10,
    blue: 5,
    green: 15,
    yellow: 20
};

/** 
 * Fonction qui crée une bulle 
 */
function createBubble() {
    const bubble = document.createElement("div");

    const colors = Object.keys(bubbleTypes);
    const color = colors[Math.floor(Math.random() * colors.length)];

    bubble.dataset.color = color;

    const size = Math.random() * 40 + 30;
    // Récupérer la largeur de la zone de jeu
    const gameAreaWidth = gameArea.offsetWidth;
    // Positionner la bulle aléatoirement dans la largeur de la zone de jeu
    const x = Math.random() * (gameAreaWidth - size);

    bubble.classList.add("bubble", color);
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = x + "px";

    /** Quand on clique une bulle */
    bubble.addEventListener("click", () => {
        const points = bubbleTypes[color];

        score += points;
        scoreDisplay.textContent = "Score : " + score;

        updateGameSpeed();   /** Vérifier si on doit augmenter la vitesse **/

        bubble.remove();
    });

    bubble.addEventListener("animationend", () => {
        bubble.remove();
    });

    gameArea.appendChild(bubble);
}

/**
 * Affiche les valeurs fixes des bulles
 */
function displayBubbleValues() {
    bubbleValuesElement.innerHTML = '';

    for (const [color, value] of Object.entries(bubbleTypes)) {
        const valueElement = document.createElement('div');
        valueElement.className = 'bubble-score';

        const input = document.createElement('input');
        input.type = 'text';
        input.readOnly = true;
        input.value = `${value} pts`;
        input.className = 'bubble-score-input';

        valueElement.innerHTML = `
            <div class="bubble-score-color ${color}"></div>
            <div class="bubble-info">
                <div class="bubble-name">${color.charAt(0).toUpperCase() + color.slice(1)}</div>
            </div>
        `;

        valueElement.appendChild(input);
        bubbleValuesElement.appendChild(valueElement);
    }
}

/**
 * Change la vitesse selon le score :
 * > 100 → vitesse x2
 * > 200 → vitesse x3
 */
function updateGameSpeed() {

    /** Sauvegarder l’ancienne vitesse */
    let oldSpeed = currentSpeed;

    if (score > 200) {
        currentSpeed = 300;     /** vitesse très rapide **/
    } else if (score > 100) {
        currentSpeed = 500;     /** vitesse moyenne **/
    } else {
        currentSpeed = 700;     /** vitesse normale **/
    }

    /** Si la vitesse a changé, relancer l’intervalle */

    
    if (oldSpeed !== currentSpeed) {
        clearInterval(gameInterval);
        gameInterval = setInterval(createBubble, currentSpeed);
    }
}

/**
 * Démarrer le jeu
 */
function startGame() {
    score = 0;
    currentSpeed = 700;  /** vitesse reset **/
    scoreDisplay.textContent = "Score : 0";

    for (const color in bubbleScores) {
        bubbleScores[color] = 0;
    }

    gameArea.innerHTML = '';

    gameInterval = setInterval(createBubble, currentSpeed);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;

    bgMusic.play().catch(err => console.log("Audio bloqué :", err));
}

/**
 * Arrêter le jeu
 */
/**
 * Mettre le jeu en pause ou le reprendre
 */
function togglePause() {
    isPaused = !isPaused;
    
    if (isPaused) {
        // Mettre en pause
        clearInterval(gameInterval);
        pauseBtn.textContent = 'Reprendre';
        
        // Arrêter les animations des bulles
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.animationPlayState = 'paused';
        });
        
        bgMusic.pause();
    } else {
        // Reprendre le jeu
        gameInterval = setInterval(createBubble, currentSpeed);
        pauseBtn.textContent = 'Pause';
        
        // Reprendre les animations des bulles
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.style.animationPlayState = 'running';
        });
        
        bgMusic.play().catch(err => console.log("Audio bloqué :", err));
    }
}

/**
 * Arrêter le jeu
 */
function stopGame() {
    clearInterval(gameInterval);
    isPaused = false; // Réinitialiser l'état de pause
    pauseBtn.textContent = 'Pause'; // Réinitialiser le texte du bouton
    pauseBtn.disabled = true; // Désactiver le bouton pause

    document.querySelectorAll('.bubble').forEach(b => b.remove());

    startBtn.disabled = false;
    stopBtn.disabled = true;

    bgMusic.pause();
    bgMusic.currentTime = 0;
}

// Événements
startBtn.addEventListener('click', () => {
    startGame();
    pauseBtn.disabled = false; // Activer le bouton pause quand le jeu commence
});

// Démarrer le jeu avec la touche 's'
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 's' && startBtn.disabled === false) {
        startGame();
        pauseBtn.disabled = false; // Activer le bouton pause
    } else if (event.key.toLowerCase() === 'p' && pauseBtn.disabled === false) {
        togglePause();
    } else if (event.key.toLowerCase() === 'e' && stopBtn.disabled === false) {
        stopGame();
    }
});

pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', stopGame);

document.addEventListener('DOMContentLoaded', displayBubbleValues);
