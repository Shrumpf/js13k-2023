import {Game} from "..";
import {ResourceManager} from "./ResourceManager";

export class UIManager {
    game: Game;
    ctx: CanvasRenderingContext2D;

    resourceManager: ResourceManager;
    nextUIPosition = 1;

    constructor(game: Game) {
        const ratio = window.devicePixelRatio;
        cUI.width = 1920 * ratio;
        cUI.height = 1080 * ratio;
        cUI.style.width = "1920px";
        cUI.style.height = "1080px";
        this.ctx = cUI.getContext("2d");
        this.ctx.scale(ratio, ratio);
        this.resourceManager = game.resourceManager;
        this.ctx.font = "32px Segoe UI, sans-serif";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 4;
        this.ctx.fillStyle = "white";


    }

    get canvas() {
        return this.ctx.canvas;
    }

    update(time: number) {


        this.nextUIPosition = 1;

        this.resourceManager.resources.forEach((res, k) => {
            // const f = ~~(this.c++ * 0.001 * time);
            // this.ctx.strokeText(`${k}: ${res.current}`, 100, this.nextUIPosition * 40);
            this.ctx.fillText(`${k}: ${res.current}`, 100, this.nextUIPosition * 40);

            this.nextUIPosition++;
        });
    }
}