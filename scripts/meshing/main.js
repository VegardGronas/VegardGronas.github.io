const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

let mesh = null;

async function ReadMeshData()
{
    try{
        const response = await fetch("/scripts/json/mesh.json");

        if(!response.ok)
        {
            throw new Error("Failed to fetch mesh");
        }

        const meshData = await response.json();
    
        mesh = new Object(meshData);
    }
    catch (error) {
        console.error("Error reading mesh data:", error);
    }
}

class Object {
    constructor(meshData) {
        this.meshData = meshData;

        this.update = this.update.bind(this);

        this.update();
    }

    update() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        this.meshData.faces.forEach(face => {
            ctx.beginPath();

            const firstVertex = this.meshData.vertices[face.vertices[0] - 1];
            ctx.moveTo(firstVertex.x, firstVertex.y);
    
            for (let i = 1; i < face.vertices.length; i++) {
                const vertex = this.meshData.vertices[face.vertices[i] - 1];
    
                ctx.lineTo(vertex.x, vertex.y);
            }

            ctx.lineTo(firstVertex.x, firstVertex.y); 
            ctx.closePath();
            ctx.fillStyle = face.color || 'black'; 
            ctx.fill();
            ctx.stroke(); 
        });
    
        this.meshData.edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(this.meshData.vertices[edge.start - 1].x, this.meshData.vertices[edge.start - 1].y);
            ctx.lineTo(this.meshData.vertices[edge.end - 1].x, this.meshData.vertices[edge.end - 1].y);
            ctx.stroke();
        });

        requestAnimationFrame(() => this.update());
    }
}

ReadMeshData();