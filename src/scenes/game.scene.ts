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
        this.drawSelector();

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

    drawSelector() {
        const mouse = this.game.inputManager.mouse;
        for (let x = 0; x < 1920; x += 24) {
            for (let y = 0; y < 1080; y += 24) {
                if (mouse.x > x && mouse.x < x + 24 && mouse.y > y && mouse.y < y + 24) {
                    this.game.ctx.fillStyle = "white";
                    this.game.ctx.fillRect(x, y, 25, 25);
                }
            }
        }

    }
}