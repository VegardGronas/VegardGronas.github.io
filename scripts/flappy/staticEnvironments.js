class StaticObjects
{
    constructor(posX = 10, posY = 10, sizeX = 10, sizeY = 10)
    {
        this.position = new Vector2(posX, posY);
        this.scale = new Vector2(sizeX, sizeY);
        this.color = new Vector3(150, 255, 200);
        this.collider = new Collision();

        this.setColor(this.color);
    }

    draw() {
        ctx.fillStyle = this.color; // Use the color to fill the rectangle
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    setColor(color) {
        // Set color as an RGB string
        this.color = `rgb(${color.x}, ${color.y}, ${color.z})`;
    }
}