import { Path } from "@/gameObjects/path";
import { Game } from "@/index";
import { Scene } from "./scene";

type Mouse = {
    x: number,
    y: number,
    mousedown: boolean;
    overPath?: Path | null | undefined
}

export type Clickable = {
    top: number;
    left: number;
    height: number;
    width: number;
    parent: Scene;
    click: (event?: MouseEvent) => void;
    hover: (event?: MouseEvent, element?: Clickable) => void;
}

export class InputManager {
    game: Game;
    mouse: Mouse = {
        x: 0,
        y: 0,
        mousedown: false
    };
    listener: Clickable[] = [];

    constructor(game: Game) {
        this.game = game;
        window.addEventListener("mousemove", (e) => {
            const target = e.target as HTMLCanvasElement;
            // Update global mouse coordinates on mousemove
            if (target.nodeName === "CANVAS") {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }

            // check for any added listeners
            // TODO: check for hover listener?
            for (let i = 0; i < this.listener.length; i++) {
                const element = this.listener[i];

                // if the listener isn't part of the current scene, ignore it
                if (element.parent.ident !== this.game.sceneManager.getScene().ident) {
                    break;
                }

                // is our mouse within boundaries of the listening element
                // trigger hover
                if (this.mouse.y > element.top && this.mouse.y < element.top + element.height
                    && this.mouse.x > element.left && this.mouse.x < element.left + element.width) {
                    element.hover(e, element);
                }
            }
        });

        window.addEventListener("click", (e) => {
            for (let i = 0; i < this.listener.length; i++) {
                const element = this.listener[i];
                if (element.parent.ident !== this.game.sceneManager.getScene().ident) {
                    break;
                }
                if (this.mouse.y > element.top && this.mouse.y < element.top + element.height
                    && this.mouse.x > element.left && this.mouse.x < element.left + element.width) {
                    element.click(e);
                }
            }
        });
    }

    update() {
        this.listener.forEach((l) => {
            this.game.drawManager.context.strokeStyle = "red";
            this.game.drawManager.context.strokeRect(l.left, l.top, l.width, l.height);
        });
    }
}