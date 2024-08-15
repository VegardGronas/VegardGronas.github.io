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
        this.gravity = 500;
        this.jumpStrength = 350;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    move(vector) {
        this.position.x += vector.x;
        this.position.y += vector.y;
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

class Wall extends GameObject {
    constructor(position = new Vector2(0, 0), scale = new Vector2(50, 200)) {
        super(position, scale, "wall");
        this.velocity = new Vector2(-100, 0); // Move left at 100 units per second
    }

    // Update position based on velocity
    update(deltaTime) {
        this.updatePosition(deltaTime);

        // If wall is off-screen, you might want to reset or remove it
        if (this.position.x + this.scale.x < 0) {
            // Handle wall going off-screen
        }
    }
}