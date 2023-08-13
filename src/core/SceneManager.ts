import { Game } from "@/index";
import { Scene } from "./scene";
import { MenuScene } from "@/scenes/menu.scene";
import { GameScene } from "@/scenes/game.scene";

export class SceneManager {
    private currentScene: Scene;
    game: Game;
    scenes: Map<string, Scene> = new Map();

    constructor(game: Game) {
        this.game = game;
        this.scenes.set("menu", new MenuScene(game));
        this.scenes.set("game", new GameScene(game));
        this.currentScene = this.scenes.get("menu")!;
        this.currentScene.onEnter?.();

    }

    setScene(newScene: string) {
        if (!this.scenes.has(newScene)) {
            throw Error("Scene not found");
        }

        const scene = this.scenes.get(newScene)!;
        this.currentScene.onLeave?.();
        this.currentScene = scene;
        this.currentScene.onEnter?.();
    }

    getScene() {
        return this.currentScene;
    }
}
