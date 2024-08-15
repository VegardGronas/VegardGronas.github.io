class GameObject {
    constructor(position = new Vector2(10, 10), scale = new Vector2(20, 20), tag = "default") {
        this.position = position;
        this.scale = scale;
        this.color = new Vector3(0, 0, 0);
        this.collider = new Collision();
        this.tag = tag;

        this.setColor(this.color);

        // Movement variables
        this.velocity = new Vector2(0, 0); // Default no movement
        this.isGrounded = false;
        this.gravity = 300;
        this.jumpStrength = 200;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    move(vector) {
        this.position.x += vector.x;
        this.position.y += vector.y;
    }

    smoothMove(vector, deltaTime) {
        this.position.x += vector.x * deltaTime;
        this.position.y += vector.y * deltaTime;
    }

    setColor(color) {
        this.color = `rgb(${color.x}, ${color.y}, ${color.z})`;
    }

    updateGravity(deltaTime) {
        if (!this.isGrounded) {
            this.velocity.y += this.gravity * deltaTime;
        }
        this.position.y += this.velocity.y * deltaTime;
    }

    jump() {
        this.velocity.y = -this.jumpStrength;
        this.isGrounded = false;
    }

    checkGroundCollision(ground) {
        if (this.position.y + this.scale.y > ground.position.y) {
            this.position.y = ground.position.y - this.scale.y;
            this.velocity.y = 0;
            this.isGrounded = true;
        }
    }

    // Method to update position based on velocity
    updatePosition(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }
}

class Wall {
    constructor(position = new Vector2(0, 0), scale = new Vector2(50, 200), gapSize = 100) {
        this.gap = gapSize;
        this.wallWidth = scale.x;
        this.wallHeight = scale.y;

        // Initialize the position of the wall segments
        this.resetPosition(position);
        
        this.velocity = new Vector2(-100, 0); // Move left at 100 units per second
    }

    resetPosition(position) {
        // Reset the upper wall segment
        this.upperWall = new GameObject(
            new Vector2(position.x, 0), // Start at the top
            new Vector2(this.wallWidth, position.y) // Height from the top to the gap
        );
        this.upperWall.setColor(new Vector3(0, 255, 0)); // Color for the upper wall

        // Reset the lower wall segment
        this.lowerWall = new GameObject(
            new Vector2(position.x, position.y + this.gap), // Position below the gap
            new Vector2(this.wallWidth, canvas.height - (position.y + this.gap)) // Height from the gap to the bottom
        );
        this.lowerWall.setColor(new Vector3(0, 255, 0)); // Color for the lower wall
    }

    update(deltaTime) {
        // Move both wall segments
        this.upperWall.position.x += this.velocity.x * deltaTime;
        this.lowerWall.position.x += this.velocity.x * deltaTime;

        // Check if the wall is off-screen
        if (this.upperWall.position.x + this.upperWall.scale.x < 0) {
            // Reposition the wall and update the gap

            this.velocity.x -= 10;

            this.resetPosition(new Vector2(canvas.width, this.randomGapPosition()));
        }
    }

    // Randomly select a new position for the gap
    randomGapPosition() {
        // Ensure gap is not too close to the top or bottom
        const minGapY = 100; // Minimum distance from the top
        const maxGapY = canvas.height - this.wallHeight - this.gap - 100; // Maximum distance from the bottom

        return Math.random() * (maxGapY - minGapY) + minGapY;
    }

    draw() {
        this.upperWall.draw();
        this.lowerWall.draw();
    }
}