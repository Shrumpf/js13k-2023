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
    ident: string;

    constructor(game: Game, ident: string) {
        this.game = game;
        this.ident = ident;
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