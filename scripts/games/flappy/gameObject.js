class GameObject {
    constructor(position = new Vector2(10, 10), scale = new Vector2(20, 20), tag = "default", useSprite = false, spriteSrc = "") {
        this.position = position;
        this.scale = scale;
        this.color = new Vector3(0, 0, 0);
        this.collider = new Collision();
        this.tag = tag;

        this.setColor(this.color);

        // Movement variables
        this.velocity = new Vector2(0, 0); // Default no movement
        this.isGrounded = false;
        this.gravity = 1000;
        this.jumpStrength = 400;

        this.useSprite = useSprite;

        this.spriteSrc = spriteSrc;

        if(this.useSprite)
        {
            this.sprite = new Sprite(spriteSrc);
        }

        this.disabled = false;
    }

    drawStaticSprite()
    {
        if(this.sprite == null) this.sprite = new Sprite(this.spriteSrc);
        this.sprite.drawStatic(this.position, this.scale);
    }

    drawAnimatedSprit()
    {
        this.sprite.draw(this.position);
    }

    drawRollingSprite()
    {
        this.sprite.roll(this.position, this.scale);
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

class Sprite
{
    constructor(src, scale = new Vector2(100, 100))
    {
        this.scale = scale;
        this.img = new Image();
        this.img.src = src;
        this.spriteWidth = new Vector2(200, 200);
        this.animPos = new Vector2(0, 0);

        this.time = 0;
    }

    drawStatic(position, scale)
    {
        ctx.drawImage(this.img, position.x, position.y, scale.x, scale.y);
    }

    roll(position, scale)
    {
        ctx.drawImage(
            this.img, 
            this.time * 100 % 250, 
            0, 
            1500, 
            1500,
            position.x, 
            position.y, 
            scale.x, 
            scale.y
        );

        this.time += deltaTime;
    }

    draw(position)
    {
        ctx.drawImage(
            this.img,          // The source image (spritesheet)
            this.animPos.x,                 // The x-coordinate of the top-left corner of the source rectangle (start at 0 for the first image)
            this.animPos.y,                 // The y-coordinate of the top-left corner of the source rectangle (start at 0 for the first image)
            this.spriteWidth.x,       // The width of the individual sprite (cut out the first image)
            this.spriteWidth.y,      // The height of the individual sprite (cut out the first image)
            position.x,        // The x-coordinate on the canvas where the image will be placed
            position.y,        // The y-coordinate on the canvas where the image will be placed
            this.scale.x,      // The width of the image on the canvas (scaling if needed)
            this.scale.y,       // The height of the image on the canvas (scaling if needed)
            this.frameStep = [0, 190, 190 * 2],
            this.animSpeed = 5
        );

        this.time += deltaTime * this.animSpeed;
        let step = Math.round(this.time);
        if(step >= this.frameStep.length)
        {
            this.time = 0;
        }
        this.animPos.y = this.frameStep[step];
    }
}

class Wall {
    constructor(position = new Vector2(0, 0), scale = new Vector2(50, 200), gapSize = 100, spacing = 200) {
        this.gap = gapSize;
        this.wallWidth = scale.x;
        this.wallHeight = scale.y;
        this.spacing = spacing; // Spacing between consecutive walls

        this.upperWall = new GameObject(new Vector2(10, 10), new Vector2(this.wallWidth, canvas.height - (position.y + this.gap)));
        this.lowerWall = new GameObject(new Vector2(10, 10), new Vector2(this.wallWidth, canvas.height - (position.y + this.gap)));

        this.scoreTrigger = new ScoreTrigger(
            new Vector2(position.x, position.y + this.gap / 2 - 10), 
            new Vector2(40, this.gap) // Small trigger box in the gap
        );

        // Initialize the position of the wall segments
        this.resetPosition(position);
        
        this.velocity = new Vector2(-100, 0); // Move left at 100 units per second
    
        this.startPos = position;
        
    }

    resetPosition(position) {

        const gapY = position.y;

        // Reset the upper wall segment
        this.upperWall.position  = new Vector2(position.x + this.spacing, 0);
        this.upperWall.scale = new Vector2(this.wallWidth, gapY);
        // Reset the lower wall segment
        this.lowerWall.position = new Vector2(position.x + this.spacing, position.y + this.gap);
        this.lowerWall.scale =  new Vector2(this.wallWidth, canvas.height - (position.y + this.gap));
        
        this.scoreTrigger.gameObject.position = new Vector2(position.x + this.spacing + this.wallWidth / 2 - 20, gapY + this.gap / 2 - 100);
    
        this.scoreTrigger.gameObject.disabled = false;
    }

    update(deltaTime) {
        // Move both wall segments
        this.upperWall.position.x += this.velocity.x * deltaTime;
        this.lowerWall.position.x += this.velocity.x * deltaTime;
        this.scoreTrigger.gameObject.position.x += this.velocity.x * deltaTime;

        this.scoreTrigger.draw();

        // Check if the wall is off-screen
        if (this.upperWall.position.x + this.upperWall.scale.x < 0) {
            let newX = canvas.width;
            // Reposition the wall and update the gap
            this.resetPosition(new Vector2(newX, this.randomGapPosition()));
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

class ScoreTrigger {
    constructor(position, scale) {
        this.gameObject = new GameObject(position, scale, "pointTrigger");
    }

    // Method to draw the trigger (for debugging purposes)
    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Semi-transparent red
        ctx.fillRect(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.scale.x, this.gameObject.scale.y);
    }
}