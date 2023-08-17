import { Game } from "@/index";
import { Scene } from "./scene";

export class Camera {
    canvas;
    ctx;
    cameraOffset: {
        x: number, //1920 / 2,
        y: number // 1080 / 2,
    };
    isDragging = false;
    dragStart: { x: number, y: number };
    lastZoom: number;
    cameraZoom = 5;
    maxZoom = 10;
    minZoom = 1;
    scrollSensivity = 0.0005;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, minZoom = 1, maxZoom = 10, scrollSensivity = 0.0005) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.scrollSensivity = scrollSensivity;

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
        window.addEventListener("wheel", (e: WheelEvent) => this.adjustZoom(e.deltaY * this.scrollSensivity));

    }

    update() {
        this.ctx.scale(this.cameraZoom, this.cameraZoom);
        this.ctx.translate(
            -this.canvas.width / 2 + this.cameraOffset.x,
            -this.canvas.height / 2 + this.cameraOffset.y);

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
            this.cameraOffset.x = this.getEventLocation(e).x / this.cameraZoom - this.dragStart.x;
            this.cameraOffset.y = this.getEventLocation(e).y / this.cameraZoom - this.dragStart.y;
        }
    }

    adjustZoom(zoomAmount: number) {
        if (!this.isDragging) {
            if (zoomAmount) {
                this.cameraZoom += zoomAmount;
            }

            this.cameraZoom = Math.min(this.cameraZoom, this.maxZoom);
            this.cameraZoom = Math.max(this.cameraZoom, this.minZoom);
        }
    }

    getEventLocation(e: MouseEvent) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }


}

export class CameraManager {
    game: Game;
    scene: Scene;
    mainCamera: Camera;
    currentCamera: Camera;
    cameras: Camera[];

    constructor() {
    }
}