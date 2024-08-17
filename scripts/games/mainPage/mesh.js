class BoxMesh
{
    constructor() {
        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, -5);
    }
    getMesh() {
        return this.mesh;
    }
    
    update() {
        // Example update: Rotate the mesh

    }
}

class CustomMesh {
    constructor(meshData) {
        this.mesh = null; // This will hold the loaded mesh
        this.loader = new THREE.OBJLoader(); // Initialize the OBJLoader

        // Load the model
        this.loader.load(
            meshData.path,
            (object) => {
                this.mesh = object; // Assign the loaded object to the mesh
                this.mesh.position.set(0, 0, -5); // Set the initial position

                // Create a PBR material
                const pbrMaterial = new THREE.MeshStandardMaterial({
                    color: parseInt(meshData.color), // Green color
                    metalness: parseFloat(meshData.metalness),  // Adjust metalness
                    roughness: parseFloat(meshData.roughness),  // Adjust roughness
                    // You can add maps here, like:
                    map: new THREE.TextureLoader().load(meshData.baseTex),
                    metalnessMap: new THREE.TextureLoader().load(meshData.baseTex),
                    roughnessMap: new THREE.TextureLoader().load(meshData.baseTex),
                    normalMap: new THREE.TextureLoader().load(meshData.normalTex)
                });

                // Apply the material to all meshes in the object
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = pbrMaterial;
                    }
                });
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the OBJ model:', error);
            }
        );
    }

    getMesh() {
        return this.mesh;
    }

    update() {
        if (this.mesh) {
            // Update logic here
        }
    }

    isLoaded() {
        return this.mesh !== null;
    }
}


class RotatingObject extends CustomMesh
{
    constructor(meshData, xSpeed = 0, ySpeed = 0)
    {
        super(meshData);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update()
    {
        if (this.mesh) {
            // Rotate the mesh on both axes
            this.mesh.rotation.x += this.xSpeed;
            this.mesh.rotation.y += this.ySpeed;
        }
    }
}