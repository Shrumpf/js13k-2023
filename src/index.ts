import { controls } from "@/core/controls";
import { SceneManager } from "./core/SceneManager";
import { InputManager } from "./core/InputManager";
import { ResourceManager } from "./core/ResourceManager";
import { DrawManager } from "./core/DrawManager";
import { UIManager } from "./core/UIManager";

// import Stats from "stats.js";
// const stats = new Stats();
// stats.showPanel(1);
// document.body.appendChild(stats.dom);

export class Game {
    previousTime = 0;
    interval = 1000 / 60;
    sceneManager: SceneManager;
    inputManager: InputManager;
    resourceManager: ResourceManager;
    drawManager: DrawManager;
    uiManager: UIManager;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor() {
        this.drawManager = new DrawManager(this);
        this.ctx = this.drawManager.context;
        this.canvas = this.drawManager.canvas;

        this.inputManager = new InputManager(this);
        this.resourceManager = new ResourceManager(this);
        this.sceneManager = new SceneManager(this);
        this.uiManager = new UIManager(this);

        this.draw = this.draw.bind(this);
        this.draw(0);
    }

    draw(currentTime: number) {
        const delta = currentTime - this.previousTime;

        if (delta >= this.interval) {
            this.previousTime = currentTime - (delta % this.interval);

            controls.queryController();
            this.ctx.clearRect(0, 0, this.drawManager.canvasWidth, this.drawManager.canvasHeight);
            this.uiManager.ctx.clearRect(0, 0, this.uiManager.canvas.width, this.uiManager.canvas.height);
            // Although the game is currently set at 60fps, the state machine accepts a time passed to onUpdate
            // If you'd like to unlock the framerate, you can instead use an interval passed to onUpdate to 
            // adjust your physics so they are consistent across all frame rates.
            // If you do not limit your fps or account for the interval your game will be far too fast or far too 
            // slow for anyone with a different refresh rate than you.
            this.sceneManager.getScene().onUpdate(delta);
            this.uiManager.update(delta / 600);
            this.resourceManager.update(1);
        }
        // stats.end();
        requestAnimationFrame(this.draw);
    }
}

export default new Game();
