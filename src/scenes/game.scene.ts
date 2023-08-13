import { Scene } from "@/core/scene";
import { controls } from "@/core/controls";
import { countries } from "@/data/countries";
import { Country, GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";

import map from "@/data/map.min.png";

export class GameScene extends Scene {
    game: Game;
    entities: GameObject[] = [];
    backgroundImage: HTMLImageElement;

    constructor(game: Game) {
        super(game);
        this.backgroundImage = new Image();
        this.backgroundImage.src = map;
    }

    onEnter() {
        this.entities = countries.map(c => new Country(this.game, c.d, c.styles));
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
        this.game.drawManager.context.drawImage(this.backgroundImage, 0, 0, this.game.drawManager.canvasWidth, this.game.drawManager.canvasHeight);
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