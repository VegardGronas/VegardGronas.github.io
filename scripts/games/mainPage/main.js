class ThreeScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.loader = new THREE.TextureLoader();
        this.setSkybox('/images/skybox/sky.jpg');

        this.setRenderSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.objects = []; // Array to store references to objects

        // Bind the animate method to the current instance
        this.animate = this.animate.bind(this);
    }

    setSkybox(pathToTexture) {
        const texture = this.loader.load(pathToTexture);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
    }

    setRenderSize(width, height) {
        this.renderer.setSize(width, height);
    }

    addObjectToScene(object) {
        this.scene.add(object.getMesh());
        this.objects.push(object); // Store reference in array
    }

    updateObjects() {
        this.objects.forEach(object => {
            // Update each object (if it has an update method)
            if (object.update) {
                object.update();
            }
        });
    }

    animate() {
        requestAnimationFrame(this.animate);

        this.updateObjects(); // Update all objects

        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = function() {
    const scene = new ThreeScene();
    
    const boxMesh = new BoxMesh();
    scene.addObjectToScene(boxMesh);
    
    scene.animate();
}
