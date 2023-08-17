import { Clickable } from "@/core/InputManager";
import { controls } from "@/core/controls";
import { Scene } from "@/core/scene";
import { Game } from "@/index";

interface MenuPoint {
    text: string;
    fontSize: number;
    x: number;
    y: number;
    color?: string;
    size?: TextMetrics;
    click: (event?: MouseEvent) => void;
    hover: (event?: MouseEvent, mp?: any) => void;
}

export class MenuScene extends Scene {
    private isStartSelected = true;

    menuPoints: MenuPoint[] = [];
    xCenter: number;


    constructor(game: Game) {
        super(game, "menu");
        this.xCenter = 200;
        this.menuPoints.push({
            text: "Start Game",
            fontSize: 60,
            x: this.xCenter,
            y: 600,
            color: "gray",
            click: () => {
                this.game.sceneManager.setScene("game");
            },
            hover: (e, mp) => {
                console.log(e, mp);
                //mp!.color = "white";
            },
        });

        this.menuPoints.push({
            text: "Debug mode",
            fontSize: 60,
            x: this.xCenter,
            y: 700,
            color: "gray",
            click: () => {
                this.game.sceneManager.setScene("debug");
            },
            hover: (e, mp) => {
                console.log(e, mp);
                //mp!.color = "white";
            }
        });

        this.menuPoints.forEach((mp) => {
            this.game.drawManager.drawText(mp.text, mp.fontSize, mp.x, mp.y, mp.color);
            mp.size = this.game.ctx.measureText(mp.text);
            console.log(mp);
            this.game.inputManager.listener.push({
                top: mp.y - mp.size.actualBoundingBoxAscent,
                left: mp.x - mp.size.width / 2,
                height: mp.size.actualBoundingBoxAscent,
                width: mp.size.width,
                parent: this,
                click: mp.click,
                hover: (e?: MouseEvent, ele?: Clickable) => mp.hover(e, ele),
            });
        });
    }

    onUpdate() {
        // const mouse = this.game.inputManager.mouse;

        this.game.drawManager.drawText("Menu", 80, this.xCenter, 90);
        // this.game.drawManager.drawText("Start Game", 60, this.xCenter, 600, this.isStartSelected ? "white" : "gray");
        this.menuPoints.forEach((mp) => {
            this.game.drawManager.drawText(mp.text, mp.fontSize, mp.x, mp.y, mp.color);

            // mp.size = this.game.ctx.measureText(mp.text);

            // if (mouse.x > mp.x - mp.size.width && mouse.x < mp.x + mp.size.width
            //     && mouse.y > mp.y - mp.fontSize && mouse.y < mp.y) {
            //     mp.color = "white";
            // } else {
            //     mp.color = "grey";
            // }
        });
        //this.game.drawManager.drawText("Toggle Fullscreen", 60, this.xCenter, 700, this.isStartSelected ? "gray" : "white");
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