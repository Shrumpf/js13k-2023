import { Game } from "@/index";

export class DrawManager {
    game: Game;
    context: CanvasRenderingContext2D;

    constructor(game: Game) {
        this.game = game;
        this.context = c2d.getContext("2d");
        this.context.imageSmoothingEnabled = false;
    }

    get canvas() {
        return this.context.canvas;
    }

    get canvasWidth() {
        return this.canvas.width;
    }

    get canvasHeight() {
        return this.canvas.height;
    }

    drawText(text: string, fontSize: number, x: number, y: number, color = "white", textAlign: "center" | "left" | "right" = "center") {
        const context = this.context;

        context.font = `${fontSize}px Impact, sans-serif-black`;
        context.textAlign = textAlign;
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.strokeText(text, x, y);
        context.fillStyle = color;
        context.fillText(text, x, y);
    }
}