import { KeyboardController } from "./keyboard.controller";
import { MouseController } from "./mouse.controller";

export class EngineController {
  public keyboardController: KeyboardController = new KeyboardController();
  public mouseController!: MouseController;

  constructor(_canvas: HTMLCanvasElement, _camera: THREE.Camera, _scene: THREE.Scene) {
    this.mouseController = new MouseController(_canvas, _camera, _scene);
  }
}