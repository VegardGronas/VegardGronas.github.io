class FullscreenCanvas extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        shadow.appendChild(canvas);

        const style = document.createElement('style');
        style.textContent = `
            canvas {
                display: block;
                background-color: #f0f0f0;
            }
        `;
        shadow.appendChild(style);

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    connectedCallback() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    disconnectedCallback() {
        window.removeEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw();
    }

    draw() {
        this.context.fillStyle = '#007bff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Public method to access the canvas
    getCanvas() {
        return this.canvas;
    }
}

customElements.define('fullscreen-canvas', FullscreenCanvas);