# 🎮 Bubble Killer Game - Documentation Technique

Ce projet est un jeu web interactif où le joueur doit cliquer sur des bulles flottantes pour marquer des points. Voici une explication détaillée du fonctionnement du code.

## 📂 Structure du Projet

Le projet est composé de trois fichiers principaux :
1.  **`index.html`** : La structure de la page.
2.  **`style.css`** : La mise en forme et les animations.
3.  **`script.js`** : La logique du jeu.

---

## 1. HTML (`index.html`)
C'est le squelette de l'application.

-   **`<div class="controls">`** : Contient les boutons "Démarrer" et "Arrêter".
-   **`<div class="game-container">`** : Le conteneur principal qui regroupe :
    -   **`#game-area`** : La zone où les bulles apparaissent.
    -   **`.score-sidebar`** : Le panneau latéral affichant la légende des points.
-   **Liens** : Importe la police "Poppins", les icônes FontAwesome, et lie les fichiers CSS/JS.

---

## 2. CSS (`style.css`)
Gère l'apparence visuelle. J'ai utilisé une approche **moderne et épurée**.

### Variables Globales (`:root`)
Nous utilisons des variables pour faciliter la maintenance des couleurs.
```css
:root {
    --couleur-fond: #1a1a2e;       /* Bleu nuit */
    --couleur-primaire: #00d4ff;   /* Cyan néon */
    /* ... */
}
```

### Mise en Page (Flexbox)
Le `body` et `.game-container` utilisent `display: flex` pour centrer et organiser les éléments facilement, que ce soit sur ordinateur ou mobile.

### Animations
L'animation clé est le mouvement des bulles :
```css
@keyframes monter {
    0% { transform: translateY(0); }
    100% { transform: translateY(-800px); } /* La bulle monte vers le haut */
}
```
Chaque bulle reçoit cette animation pour flotter du bas vers le haut de l'écran.

---

## 3. JavaScript (`script.js`)
C'est le cerveau du jeu.

### Variables Principales
-   `score` : Stocke le score actuel.
-   `gameInterval` : Stocke l'identifiant du timer qui crée les bulles (pour pouvoir l'arrêter plus tard).
-   `bubbleTypes` : Un objet définissant les couleurs et leurs points associés.

### Fonctions Clés

#### `startGame()`
1.  Réinitialise le score à 0.
2.  Vide la zone de jeu.
3.  Lance la musique (`bgMusic.play()`).
4.  Utilise `setInterval` pour appeler `createBubble()` toutes les 700ms.

#### `createBubble()`
1.  Crée une `div` HTML.
2.  Choisit une couleur aléatoire parmi les clés de `bubbleTypes`.
3.  Ajoute la classe CSS correspondante (ex: `.red`) pour la couleur.
4.  Positionne la bulle aléatoirement sur l'axe horizontal (`left`).
5.  Ajoute un écouteur d'événement `click` :
    -   Si on clique, on ajoute les points au score.
    -   On supprime la bulle (`bubble.remove()`).

#### `stopGame()`
1.  Arrête la création de bulles avec `clearInterval(gameInterval)`.
2.  Supprime toutes les bulles restantes.
3.  Arrête et rembobine la musique.

### Musique
La musique est gérée via l'objet `Audio` natif :
```javascript
const bgMusic = new Audio('music/music.mp3');
bgMusic.loop = true; // Lecture en boucle
```

---

## 🚀 Comment jouer ?
1.  Ouvrez `index.html` dans votre navigateur.
2.  Cliquez sur **Démarrer**.
3.  Cliquez sur les bulles pour gagner des points avant qu'elles ne disparaissent !
4.  Cliquez sur **Arrêter** pour finir la partie.
