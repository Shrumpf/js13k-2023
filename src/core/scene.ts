import { GameObject } from "@/gameObjects/gameObject";
import { Game } from "@/index";
import { Camera } from "./CameraManager";

interface IScene {
    game: Game;
    onUpdate: (time?: number) => void
    onEnter?: () => void;
    onLeave?: () => void;
}

export class Scene implements IScene {
    game: Game;
    ident: string;
    camera: Camera;

    constructor(game: Game, ident: string, camera?: Camera) {
        this.game = game;
        this.ident = ident;
        this.camera = camera ?? this.game.cameraManager.mainCamera;
        this.game.cameraManager.currentCamera = this.camera;
    }

    onUpdate(_time?: number) {
        // empty
    }

    onEnter(): void {
        // empty
    }

    onLeave(): void {
        // empty
    }
}