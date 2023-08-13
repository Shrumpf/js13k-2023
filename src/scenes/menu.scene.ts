import { controls } from "@/core/controls";
import { Scene } from "@/core/scene";
import { Game } from "@/index";

import map from "@/data/map.min.png";

export class MenuScene extends Scene {
    private isStartSelected = true;
    image: HTMLImageElement;

    constructor(game: Game) {
        super(game);
        this.image = new Image();
        this.image.src = map;
    }

    onUpdate() {
        this.game.drawManager.context.drawImage(this.image, 0, 0, this.game.drawManager.canvasWidth, this.game.drawManager.canvasHeight);
        const xCenter = this.game.drawManager.canvasWidth / 2;
        this.game.drawManager.drawText("Menu", 80, xCenter, 90);
        this.game.drawManager.drawText("Start Game", 60, xCenter, 600, this.isStartSelected ? "white" : "gray");
        this.game.drawManager.drawText("Toggle Fullscreen", 60, xCenter, 700, this.isStartSelected ? "gray" : "white");
        this.updateControls();
    }

    updateControls() {
        if ((controls.isUp && !controls.previousState.isUp)
            || (controls.isDown && !controls.previousState.isDown)) {
            this.isStartSelected = !this.isStartSelected;
        }

        if (controls.isConfirm && !controls.previousState.isConfirm) {
            if (this.isStartSelected) {
                this.game.sceneManager.setScene("game");
            } else {
                this.toggleFullscreen();
            }
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}