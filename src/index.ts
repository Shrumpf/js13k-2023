import { controls } from "@/core/controls";
import { SceneManager } from "./core/SceneManager";
import { InputManager } from "./core/InputManager";
import { ResourceManager } from "./core/ResourceManager";
import { DrawManager } from "./core/DrawManager";
import { UIManager } from "./core/UIManager";
import { CameraManager } from "./core/CameraManager";

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
    cameraManager: CameraManager;

    constructor() {
        this.drawManager = new DrawManager(this);
        this.ctx = this.drawManager.context;
        this.canvas = this.drawManager.canvas;

        this.inputManager = new InputManager(this);
        this.resourceManager = new ResourceManager(this);
        this.sceneManager = new SceneManager(this);
        this.uiManager = new UIManager(this);
        this.cameraManager = new CameraManager();




        this.draw = this.draw.bind(this);
        // this.onPointerDown.bind(this);
        // this.onPointerUp.bind(this);
        this.draw(0);
    }

    draw(currentTime: number) {

        const delta = currentTime - this.previousTime;

        if (delta >= this.interval) {
            this.previousTime = currentTime - (delta % this.interval);
            c2d.height = this.drawManager.canvas.height;
            c2d.width = this.drawManager.canvas.width;

            // console.log(this.canvas.width, this.canvas.height);
            // this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.cameraManager.currentCamera.update();
            c2d.getContext("2d")!.imageSmoothingEnabled = false;
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.uiManager.ctx.clearRect(0, 0, this.uiManager.canvas.width, this.uiManager.canvas.height);
            // Although the game is currently set at 60fps, the state machine accepts a time passed to onUpdate
            // If you'd like to unlock the framerate, you can instead use an interval passed to onUpdate to 
            // adjust your physics so they are consistent across all frame rates.
            // If you do not limit your fps or account for the interval your game will be far too fast or far too 
            // slow for anyone with a different refresh rate than you.
            controls.queryController();
            this.sceneManager.getScene().onUpdate(delta);
            this.uiManager.update(delta / 600);
            this.resourceManager.update(1);
            this.inputManager.update();
        }
        // stats.end();
        requestAnimationFrame(this.draw);
    }


}



export default new Game();
