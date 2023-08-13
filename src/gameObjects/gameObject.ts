import { Styles, Path } from "@/gameObjects/path";
import { Game } from "@/index";

export interface GameObject {
    update: (delta: number) => void;
}

export class Country extends Path implements GameObject {
    name: string;

    constructor(game: Game, path: string, styles: Styles) {
        super(game, path, styles);
    }

    update(delta: number): void {
        super.update(delta);
    }
}