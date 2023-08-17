
import { Scene } from "@/core/scene";
import { controls } from "@/core/controls";
import { GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";

import map from "@/data/map.json";

type Tile = {
    sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number
}

export class DebugScene extends Scene {
    game: Game;
    entities: GameObject[] = [];

    tileset: HTMLImageElement;
    mapData;
    tiles: Tile[] = [];
    foo: ImageBitmap;


    constructor(game: Game) {
        super(game, "debug");
        this.tileset = new Image();
        this.tileset.src = "/tileset.png";

        this.mapData = {
            tileWidth: map.tilewidth,
            tileHeight: map.tileheight,
            height: map.height,
            width: map.width,
        };



    }

    onEnter() {
        setTimeout(() => {

            for (let layer = 0; layer < map.layers.length; layer++) {
                for (let y = 0; y < this.mapData.height; y += 1) {
                    for (let x = 0; x < this.mapData.width; x += 1) {
                        const tileMapIndex = map.layers[layer].data[x + map.layers[layer].width * y] ?? 14;

                        const spriteLocationOnTileSet = {
                            x: (tileMapIndex % 10) * this.mapData.tileWidth,
                            y: Math.floor(tileMapIndex / 10) * this.mapData.tileHeight
                        };

                        this.game.drawManager.offscreenContext.drawImage(this.tileset, spriteLocationOnTileSet.x, spriteLocationOnTileSet.y, this.mapData.tileWidth, this.mapData.tileHeight, x * this.mapData.tileWidth, y * this.mapData.tileHeight, this.mapData.tileWidth, this.mapData.tileHeight);
                        // this.tiles.push({
                        //     sx: spriteLocationOnTileSet.x,
                        //     sy: spriteLocationOnTileSet.y,
                        //     sw: this.mapData.tileWidth,
                        //     sh: this.mapData.tileHeight,
                        //     dx: x * this.mapData.tileWidth,
                        //     dy: y * this.mapData.tileHeight,
                        //     dw: this.mapData.tileWidth,
                        //     dh: this.mapData.tileHeight
                        // });
                    }
                }
            }

            // for (let index = 0; index < this.tiles.length; index++) {
            //     const element = this.tiles[index];
            //     this.game.drawManager.offscreenContext.drawImage(this.tileset, element.sx, element.sy, element.sw, element.sh, element.dx, element.dy, element.dw, element.dh);
            // }

            this.foo = this.game.drawManager.offscreenCanvas.transferToImageBitmap();

        }, 1);



    }

    onUpdate(delta: number) {


        if (this.foo) {

            this.game.drawManager.context.drawImage(this.foo, 0, 0);
        }
        // this.game.drawManager.context.getImageData(0, 0, this.game.drawManager.canvasWidth, this.game.drawManager.canvasHeight);
        // this.game.drawManager.context.drawImage(this.game.drawManager.offscreenCanvas, 0, 0);
        if (controls.isEscape) {
            this.game.sceneManager.setScene("menu");
        }
    }

}