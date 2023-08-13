import { Path } from "@/gameObjects/path";
import { Game } from "@/index";

type Mouse = {
    x: number,
    y: number,
    overPath?: Path | null | undefined
}

export class InputManager {
    game: Game;
    mouse: Mouse = {
        x: 0,
        y: 0,
    };

    constructor(game: Game) {
        this.game = game;
        window.addEventListener("mousemove", (e) => {
            const target = e.target as HTMLCanvasElement;
            if (target.nodeName === "CANVAS") {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        });
    }
}