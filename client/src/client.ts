export default class OpenRts {
    private readonly webgl: WebGL2RenderingContext;

    private readonly eventListeners: string[] = [];

    constructor(webgl: WebGL2RenderingContext) {
        this.webgl = webgl;
        this.init();

        window.addEventListener('resize', () => {
            this.resize();
        });
        this.eventListeners.push('resize');
    }

    /**
     * Initialize the canvas and webgl context.
     */
    private init() {
        this.resize();
        this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
    }

    /**
     * Resize the canvas.
     */
    public resize() {
        this.webgl.canvas.width = window.innerWidth;
        this.webgl.canvas.height = window.innerHeight;
        this.webgl.viewport(0, 0, window.innerWidth, window.innerHeight);
    }

    /**
     * Render the scene.
     */
    public render() {
        this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);

        requestAnimationFrame(() => this.render());
    }
}