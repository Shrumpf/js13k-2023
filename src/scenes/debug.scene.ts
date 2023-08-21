
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
    foo = 0;


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
        //d
    }

    onUpdate(delta: number) {
        this.foo += delta;



        for (let layer = 0; layer < map.layers.length; layer++) {
            for (let y = 0; y < this.mapData.height; y += 1) {
                for (let x = 0; x < this.mapData.width; x += 1) {
                    let tileMapIndex = map.layers[layer].data[x + map.layers[layer].width * y];
                    let flipped_horizontally = false;
                    let flipped_vertically = false;
                    let flipped_diagonally = false;
                    let rotated_hex120 = false;

                    if (tileMapIndex === 0) {
                        continue;
                    }

                    if (tileMapIndex === 48) {
                        this.game.drawManager.context.fillStyle = "#c3d657";
                        this.game.drawManager.context.fillRect(x * this.mapData.tileWidth,
                            y * this.mapData.tileHeight,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight);
                        continue;
                    }

                    if (tileMapIndex === 47) {
                        this.game.drawManager.context.fillStyle = "#4ebcb9";
                        this.game.drawManager.context.fillRect(x * this.mapData.tileWidth,
                            y * this.mapData.tileHeight,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight);
                        continue;
                    }

                    if (tileMapIndex > 48) {
                        const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
                        const FLIPPED_VERTICALLY_FLAG = 0x40000000;
                        const FLIPPED_DIAGONALLY_FLAG = 0x20000000;
                        const ROTATED_HEXAGONAL_120_FLAG = 0x10000000;

                        flipped_horizontally = (tileMapIndex & FLIPPED_HORIZONTALLY_FLAG) != 0;
                        flipped_vertically = (tileMapIndex & FLIPPED_VERTICALLY_FLAG) != 0;
                        flipped_diagonally = (tileMapIndex & FLIPPED_DIAGONALLY_FLAG) != 0;
                        rotated_hex120 = (tileMapIndex & ROTATED_HEXAGONAL_120_FLAG) != 0;

                        tileMapIndex &= ~(FLIPPED_HORIZONTALLY_FLAG |
                            FLIPPED_VERTICALLY_FLAG |
                            FLIPPED_DIAGONALLY_FLAG |
                            ROTATED_HEXAGONAL_120_FLAG);
                    }

                    const spriteLocationOnTileSet = {
                        x: ((tileMapIndex - 1) % 6) * this.mapData.tileWidth,
                        y: ~~((tileMapIndex - 1) / 6) * this.mapData.tileHeight
                    };

                    if (flipped_horizontally) {
                        this.game.drawManager.context.save();

                        this.game.ctx.translate(this.game.canvas.width, 0);
                        this.game.drawManager.context.scale(-1, 1);

                        const tX = this.mapData.width - x - 113;
                        const tY = this.mapData.height - y;

                        this.game.drawManager.context.drawImage(
                            this.tileset,
                            spriteLocationOnTileSet.x,
                            spriteLocationOnTileSet.y,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight,
                            tX * this.mapData.tileWidth,
                            y * this.mapData.tileHeight,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight);
                        this.game.drawManager.context.restore();

                    }
                    else {
                        this.game.drawManager.context.drawImage(
                            this.tileset,
                            spriteLocationOnTileSet.x,
                            spriteLocationOnTileSet.y,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight,
                            x * this.mapData.tileWidth,
                            y * this.mapData.tileHeight,
                            this.mapData.tileWidth,
                            this.mapData.tileHeight);
                    }
                }
            }
        }



        // this.game.drawManager.context.getImageData(0, 0, this.game.drawManager.canvasWidth, this.game.drawManager.canvasHeight);
        // this.game.drawManager.context.drawImage(this.game.drawManager.offscreenCanvas, 0, 0);
        if (controls.isEscape) {
            this.game.sceneManager.setScene("menu");
        }
    }

}