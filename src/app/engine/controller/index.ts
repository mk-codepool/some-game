import { KeyboardController } from "./keyboard.controller";
import { MouseController } from "./mouse.controller";

export class EngineController {
  public keyboardController: KeyboardController = new KeyboardController();
  public mouseController!: MouseController;

  constructor() {
    this.mouseController = new MouseController();
  }
}