import { Game } from "@/index";
import { Resource } from "@/resources/resource";
import { Stone } from "@/resources/stone";
import { Wood } from "@/resources/wood";

export class ResourceManager {
    game: Game;
    resources: Map<string, Resource> = new Map();

    constructor(game: Game) {
        this.game = game;
        this.resources.set("wood", new Wood());
        this.resources.set("stone", new Stone());
    }

    update(time: number) {
        this.resources.forEach((v) => {
            v.current += ~~(v.value * time);
        });
    }
}