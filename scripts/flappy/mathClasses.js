class Collision {
    static checkCollision(obj1, obj2) {
        return !(obj1.position.x > obj2.position.x + obj2.scale.x ||
                 obj1.position.x + obj1.scale.x < obj2.position.x ||
                 obj1.position.y > obj2.position.y + obj2.scale.y ||
                 obj1.position.y + obj1.scale.y < obj2.position.y);
    }
}

class Vector2
{
    constructor(x1 = 0, y1 = 0)
    {
        this.x = x1;
        this.y = y1;
    }
}

class Vector3
{
    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}