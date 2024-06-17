// Seleciona o elemento da área do jogo
const gameArea = document.getElementById('gameArea');

// Seleciona o elemento da pontuação
const scoreDisplay = document.getElementById('score');

// Define o tamanho de cada "tile" (quadrado) e o tamanho total da área do jogo
const tileSize = 20;
const areaSize = 400;

// Inicializa a cobra com uma posição inicial
let snake = [{ x: 100, y: 100 }];

// Define a direção inicial da cobra (parada)
let direction = { x: 0, y: 0 };

// Inicializa a comida em uma posição específica
let food = { x: 200, y: 200 };

// Inicializa a pontuação
let score = 0;

// Função para desenhar a cobra na tela
function drawSnake() {
    // Limpa a área do jogo
    gameArea.innerHTML = '';

    // Para cada segmento da cobra, cria um elemento div e o adiciona na área do jogo
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = segment.x + 'px';
        snakeElement.style.top = segment.y + 'px';
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });
}

// Função para desenhar a comida na tela
function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

// Função para mover a cobra
function moveSnake() {
    // Cria uma nova cabeça com base na direção atual
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Adiciona a nova cabeça ao início da cobra
    snake.unshift(head);

    // Verifica se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        // Aumenta a pontuação
        score++;
        // Atualiza a exibição da pontuação
        scoreDisplay.textContent = score;
        // Coloca a comida em uma nova posição
        placeFood();
    } else {
        // Remove o último segmento da cobra (movimento)
        snake.pop();
    }
}

// Função para colocar a comida em uma nova posição aleatória
function placeFood() {
    food.x = Math.floor(Math.random() * (areaSize / tileSize)) * tileSize;
    food.y = Math.floor(Math.random() * (areaSize / tileSize)) * tileSize;
}

// Função para verificar colisões
function checkCollision() {
    const head = snake[0];

    // Verifica colisão com as bordas da área do jogo
    if (head.x < 0 || head.x >= areaSize || head.y < 0 || head.y >= areaSize) {
        return true;
    }

    // Verifica colisão com o próprio corpo da cobra
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Função principal de atualização do jogo
function update() {
    // Move a cobra
    moveSnake();

    // Verifica colisões
    if (checkCollision()) {
        // Se houver colisão, reinicia o jogo
        alert('Game Over! Pontuação: ' + score);
        snake = [{ x: 100, y: 100 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.textContent = score;
        placeFood();
    }

    // Desenha a cobra e a comida na tela
    drawSnake();
    drawFood();
}

// Adiciona um evento de teclado para controlar a direção da cobra
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -tileSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: tileSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -tileSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: tileSize, y: 0 };
            break;
    }
});

// Define um intervalo para atualizar o jogo a cada 100ms
setInterval(update, 100);
