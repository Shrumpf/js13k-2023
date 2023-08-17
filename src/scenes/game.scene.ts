import { Scene } from "@/core/scene";
import { controls } from "@/core/controls";
import { GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";

export class GameScene extends Scene {
    game: Game;
    entities: GameObject[] = [];

    constructor(game: Game) {
        super(game, "game");
    }

    onEnter() {
        // empty
    }

    onUpdate(delta: number) {

        this.drawBackground();
        this.drawEntities(delta);

        if (controls.isEscape) {
            this.game.sceneManager.setScene("menu");
        }
    }

    drawBackground() {
        // em
    }

    drawEntities(delta: number) {
        const entityCount = this.entities.length;
        for (let i = 0; i < entityCount; i++) {
            this.entities[i].update(delta);
        }
    }
}