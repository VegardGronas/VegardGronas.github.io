let canvas;
let ctx;

const scoreCounter = document.getElementById("scoreCounter");

let bird, ground;
let lastTime = 0; // Track the last frame time
let deltaTime = 0; // Time elapsed between frames

let wall = []; 
let background = null;

let gameObjects = [];

let gameOver = false;
let gameStarted = false;

let updateCollision = true;

let score = 0;

function initializeGameObjects() {
    // Initialize all game objects and reset the game state
    bird = new GameObject(new Vector2(50, canvas.height / 2 - 100), new Vector2(50, 50), "bird", true, "/images/flappy/bridSheet.png");
    ground = new GameObject(new Vector2(0, canvas.height - 100), new Vector2(canvas.width, 200), "Ground", true, "/images/flappy/GRASS.png");


    background = new GameObject(
        new Vector2(0, 0),
        new Vector2(canvas.width, canvas.height),
        "background",
        true,
        "/images/flappy/BLUE_ROSE.png"
    )

    ground.tag = "obstacle";

    wall = [];
    gameObjects = [];


    for (let i = 0; i < 4; i++) {
        // Initialize each wall with the correct position and spacing
        let w = new Wall(
            new Vector2(canvas.width + i * 300, Math.random() * (canvas.height - 400) + 100), // Random Y within range
            new Vector2(50, 100), // Wall size
            200, // Gap size
            300  // Horizontal spacing between walls
        );

        w.lowerWall.useSprite = true;
        w.lowerWall.spriteSrc = "/images/flappy/BRICKS.png";
    
        w.upperWall.useSprite = true;
        w.upperWall.spriteSrc = "/images/flappy/BRICKS.png";

        wall.push(w); // Store the wall object
        gameObjects.push(w.upperWall);
        gameObjects.push(w.lowerWall);
        gameObjects.push(w.scoreTrigger.gameObject);
    }

    gameObjects.push(ground);

    ground.setColor(new Vector3(150, 255, 200));

    score = 0;

    gameOver = false;
}

function start() {
    initializeGameObjects();

    // Start the game loop
    requestAnimationFrame(update);
}

function restartGame() {
    // Clear the canvas to avoid any old frames
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset lastTime to avoid sudden jumps in deltaTime
    lastTime = 0;
    deltaTime = 0;
    currentTime = 0;

    bird = null;

    // Reinitialize the game objects
    initializeGameObjects();

    gameStarted = true;

}

function update(currentTime) {
    if(gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.drawStaticSprite();

    // Calculate deltaTime
    if (lastTime) {
        deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    }
    lastTime = currentTime;

    for(let j = 0; j < wall.length; j++)
    {
        wall[j].lowerWall.drawStaticSprite();
        wall[j].upperWall.drawStaticSprite();
    }

    ground.drawRollingSprite();

    bird.drawAnimatedSprit();

    if(gameStarted)
    {
        
        for(let j = 0; j < wall.length; j++)
        {
            wall[j].update(deltaTime);
        }

        if(updateCollision)
        {
            for(let i = 0; i < gameObjects.length; i++)
                {
                    if(Collision.checkCollision(bird, gameObjects[i]))
                    {
                        if(gameObjects[i].tag == "pointTrigger")
                        {
                            if(!gameObjects[i].disabled)
                            {
                                score++;
                                scoreCounter.innerHTML = score.toString();
                            }
                            gameObjects[i].disabled = true;
                        }
                        else{
                            gameOver = true;
                            gameStarted = false;
                        }
                    }
                }
        }
        
        bird.updateGravity(deltaTime);
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    const canvasComponent = document.querySelector('fullscreen-canvas');

    if (canvasComponent) {
        canvas = canvasComponent.getCanvas();
        
        ctx = canvas.getContext('2d');

        start();
    }
});

document.onkeydown = function(event) {
    const keyCode = event.keyCode;

    if (keyCode == 32) { // Space bar
        if (!gameStarted) {
            gameStarted = true;
            start();
        } else if (!gameOver) {
            bird.jump();
        }
    } else if (keyCode == 82 && gameOver) { // 'R' key for restarting
        restartGame();
    }
}
