import { Game } from "@/index";
import { GameObject } from "./gameObject";

export type Style = {
    fillStyle?: string, strokeStyle?: string, lineWidth?: number
}

export type Styles = {
    default: Style,
    over: Style
}

export class Path extends Path2D implements GameObject {
    game: Game;
    styles!: Styles;
    style!: Style;
    x: number;
    y: number;

    constructor(game: Game, path: string, styles: Styles) {
        super(path);
        this.game = game;
        this.styles = styles;
        this.style = styles.default;
    }

    // createPath(path: number[] | string) {
    //     if (typeof path === "string") {
    //         return new Path2D(path);
    //     }

    //     var i = 0, p = new Path2D;
    //     while (i < path.length) { p.lineTo(path[i++], path[i++]) }
    //     p.closePath();
    //     return p;
    // }

    update(delta: number) {
        Object.assign(this.game.ctx, this.style);
        this.game.ctx.fill(this);
        this.checkMouseOver();
    }

    checkMouseOver() {
        const over = this.game.ctx.isPointInPath(this, this.game.inputManager.mouse.x!, this.game.inputManager.mouse.y!, "nonzero");


        if (over) {
            this.style = this.styles.over;
        } else {
            this.style = this.styles.default;
        }
    }
}