let canvas;
let ctx;

let bird, ground;
let lastTime = 0; // Track the last frame time
let deltaTime = 0; // Time elapsed between frames

let wall;

const gameObjects = [];

let gameOver = false;

function start() {
    // Start the update loop
    bird = new GameObject(new Vector2(50, canvas.height / 2 - 100), new Vector2(50, 50));
    ground = new GameObject(new Vector2(0, canvas.height - 100), new Vector2(canvas.width, 200));

    ground.tag = "obstacle";

    wall = new Wall(new Vector2(canvas.width - 100, 300), new Vector2(50, 100), 200);

    gameObjects.push(ground);
    gameObjects.push(wall.upperWall);
    gameObjects.push(wall.lowerWall);

    ground.setColor(new Vector3(150, 255, 200));

    requestAnimationFrame(update);
}

function update(currentTime) {
    if(gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate deltaTime
    if (lastTime) {
        deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    }
    lastTime = currentTime;

    wall.draw();
    wall.update(deltaTime);

    ground.draw();

    bird.draw();
    

    for(let i = 0; i < gameObjects.length; i++)
    {
        if(!Collision.checkCollision(bird, gameObjects[i]))
        {
            bird.updateGravity(deltaTime);
        }
        else{
            gameOver = true;
        }
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

document.onkeydown = function(event)
{
    const keyCode = event.keyCode;

    if(keyCode == 32)
    {
        bird.jump();
    }
}
