
import { Scene } from "@/core/scene";
import { controls } from "@/core/controls";
import { GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";

import map from "@/data/map.json";
import tileset from "@/data/tileset.png";

export class DebugScene extends Scene {
    game: Game;
    entities: GameObject[] = [];

    tileset: HTMLImageElement;
    mapData;


    constructor(game: Game) {
        super(game, "debug");
        this.tileset = new Image();
        this.tileset.src = tileset;

        this.mapData = {
            tileWidth: map.tilewidth,
            tileHeight: map.tileheight,
            height: map.height,
            width: map.width,
        };
    }

    onEnter() {
        // empty
    }

    onUpdate(delta: number) {

        // const tileWidth = 16;
        // const tileHeight = 16;
        // const mapWidth = 3 * tileWidth;
        // const mapHeight = 4 * tileHeight;


        for (let layer = 0; layer < map.layers.length; layer++) {
            for (let y = 0; y < this.mapData.height; y += 1) {
                for (let x = 0; x < this.mapData.width; x += 1) {
                    // console.log();
                    const tileMapIndex = map.layers[layer].data[x + map.layers[layer].width * y] ?? 14;

                    const spriteLocationOnTileSet = {
                        x: (tileMapIndex % 10) * this.mapData.tileWidth,
                        y: Math.floor(tileMapIndex / 10) * this.mapData.tileHeight
                    };

                    this.game.ctx.drawImage(this.tileset, spriteLocationOnTileSet.x, spriteLocationOnTileSet.y, this.mapData.tileWidth, this.mapData.tileHeight, x * this.mapData.tileWidth, y * this.mapData.tileHeight, this.mapData.tileWidth, this.mapData.tileHeight);
                    // this.game.ctx.drawImage(
                    //     this.tileset, x, y, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
                }
            }
        }



        if (controls.isEscape) {
            this.game.sceneManager.setScene("menu");
        }
    }
}