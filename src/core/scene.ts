import { GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";

interface IScene {
    game: Game;
    onUpdate: (time?: number) => void
    onEnter?: () => void;
    onLeave?: () => void;
}

export class Scene implements IScene {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    onUpdate(_time?: number) {
        // empty
    }

    onEnter(): void {
        // empty
    }

    onLeave(): void {
        // empty
    }
}