class BoxMesh
{
    constructor() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, -5);
    }
    getMesh() {
        return this.mesh;
    }
    
    update() {
        // Example update: Rotate the mesh
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
}