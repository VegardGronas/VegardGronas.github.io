class ThreeScene {
    constructor(sceneSettings) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(sceneSettings.camera.fov, window.innerWidth / window.innerHeight, sceneSettings.camera.near, sceneSettings.camera.far);
        this.camera.position.set(sceneSettings.camera.position[0], sceneSettings.camera.position[1], sceneSettings.camera.position[2]);
        this.loader = new THREE.TextureLoader();
        this.setSkybox(sceneSettings.skybox.path);

        this.setRenderSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.objects = []; // Array to store references to objects

        this.animate = this.animate.bind(this);

        // Add a Directional Light (like sunlight)
        if(sceneSettings.globalLight.directionalLight.enabled)
        {
            this.directionalLight = new THREE.DirectionalLight(parseInt(sceneSettings.globalLight.directionalLight.color), sceneSettings.globalLight.directionalLight.intensity); // Color and intensity
            this.directionalLight.position.set(sceneSettings.globalLight.directionalLight.position[0], sceneSettings.globalLight.directionalLight.position[1], sceneSettings.globalLight.directionalLight.position[2]); // Position the light
            this.scene.add(this.directionalLight);    
        }

        if(sceneSettings.globalLight.ambientLight.enabled)
        {
            this.ambientLight = new THREE.AmbientLight(parseInt(sceneSettings.globalLight.ambientLight.color)); // Soft white light
            this.scene.add(this.ambientLight);
        }    
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
        if (object.isLoaded && !object.isLoaded()) {
            // If the object is not yet loaded, wait until it is
            const checkLoaded = setInterval(() => {
                if (object.isLoaded()) {
                    this.scene.add(object.getMesh());
                    this.objects.push(object);
                    clearInterval(checkLoaded); // Stop checking once loaded
                }
            }, 100); // Check every 100ms
        } else {
            this.scene.add(object.getMesh());
            this.objects.push(object);
        }
    }

    updateObjects() {
        this.objects.forEach(object => {
            if (object.update) {
                object.update();
            }
        });
    }

    animate() {
        requestAnimationFrame(this.animate);

        this.updateObjects();

        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = function() {
    ReadMeshData();
}

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return await response.json();
}

async function ReadMeshData()
{
    try{
        const [modelData, sceneSettings] = await Promise.all([
            fetchJSON("/scripts/games/mainPage/models.json"),
            fetchJSON("/scripts/games/mainPage/sceneSettings.json")
        ])

        const scene = new ThreeScene(sceneSettings);

        scene.animate();    

        const customMesh = new RotatingObject(modelData.models[0], 0, .005);
        scene.addObjectToScene(customMesh);    
    }
    catch (error) {
        console.error("Error reading mesh data:", error);
    }
}