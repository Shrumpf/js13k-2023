import { controls } from "@/core/controls";
import { SceneManager } from "./core/SceneManager";
import { InputManager } from "./core/InputManager";
import { ResourceManager } from "./core/ResourceManager";
import { DrawManager } from "./core/DrawManager";
import { UIManager } from "./core/UIManager";
import { roundTo } from "./utils/round";

// import Stats from "stats.js";
// const stats = new Stats();
// stats.showPanel(1);
// document.body.appendChild(stats.dom);


const MAX_ZOOM = 10;
const MIN_ZOOM = 1;
const SCROLL_SENSITIVITY = 0.005;

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
    cameraOffset = {
        x: 1920 / 2,
        y: 1080 / 2,
    };
    cameraZoom = 1;
    isDragging = false;
    dragStart: { x: number, y: number };
    lastZoom: number;

    constructor() {
        this.drawManager = new DrawManager(this);
        this.ctx = this.drawManager.context;
        this.canvas = this.drawManager.canvas;

        this.inputManager = new InputManager(this);
        this.resourceManager = new ResourceManager(this);
        this.sceneManager = new SceneManager(this);
        this.uiManager = new UIManager(this);

        this.cameraOffset = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };

        this.isDragging = false;
        this.dragStart = {
            x: 0,
            y: 0
        };
        this.lastZoom = this.cameraZoom;

        window.addEventListener("mousedown", this.onPointerDown.bind(this));
        window.addEventListener("mouseup", this.onPointerUp.bind(this));
        window.addEventListener("mousemove", this.onPointerMove.bind(this));
        window.addEventListener("wheel", (e: WheelEvent) => this.adjustZoom(e.deltaY * SCROLL_SENSITIVITY));


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
            this.ctx.scale(this.cameraZoom, this.cameraZoom);
            this.ctx.translate(
                -this.canvas.width / 2 + this.cameraOffset.x,
                -this.canvas.height / 2 + this.cameraOffset.y);
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.clearRect(0, 0, this.drawManager.canvasWidth, this.drawManager.canvasHeight);
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

    getEventLocation(e: MouseEvent) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    onPointerDown(e: MouseEvent) {
        this.isDragging = true;
        this.dragStart.x = this.getEventLocation(e).x / this.cameraZoom - this.cameraOffset.x;
        this.dragStart.y = this.getEventLocation(e).y / this.cameraZoom - this.cameraOffset.y;
    }

    onPointerUp(e: MouseEvent) {
        this.isDragging = false;
        this.lastZoom = this.cameraZoom;

    }

    onPointerMove(e: MouseEvent) {
        if (this.isDragging) {
            this.cameraOffset.x = ~~(this.getEventLocation(e).x / this.cameraZoom - this.dragStart.x);
            this.cameraOffset.y = ~~(this.getEventLocation(e).y / this.cameraZoom - this.dragStart.y);

            // zoom 1 2 3 4
            // offset x 1280 1792 2005 2112

            // left
            if (this.cameraOffset.x > this.canvas.width / 2) {
                this.cameraOffset.x = this.canvas.width / 2;
            }

            //right
            if (this.cameraOffset.x < -this.canvas.width) {
                this.cameraOffset.x = -this.canvas.width;
            }

            //up
            if (this.cameraOffset.y > this.canvas.height / 2) {
                this.cameraOffset.y = this.canvas.height / 2;
            }

            // down
            if (this.cameraOffset.y < -(this.canvas.height)) {
                this.cameraOffset.y = -(this.canvas.height);
            }
        }
    }

    adjustZoom(zoomAmount: number) {

        if (!this.isDragging) {
            if (zoomAmount) {
                this.cameraZoom += roundTo(zoomAmount, 0);
            }

            this.cameraZoom = Math.min(this.cameraZoom, MAX_ZOOM);
            this.cameraZoom = Math.max(this.cameraZoom, MIN_ZOOM);
        }
    }

}



export default new Game();
