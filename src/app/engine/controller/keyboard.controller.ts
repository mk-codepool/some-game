export interface PressedKeys {
  [key: string]: boolean;
}

export class KeyboardController {
  public pressedKeys: PressedKeys = {};

  constructor() {
    this.bindKeys();
  }

  public bindKeys(): void {
    document.addEventListener('keydown', event => this.onKeyDown(event), false);
    document.addEventListener('keyup', event => this.onKeyUp(event), false);
  }

  public isKeyPressed(key: string): boolean {
    return this.pressedKeys[key];
  }

  public keyPressed(cb: Function): void {
    if (Object.keys(this.pressedKeys).length > 0) {
      cb(this.pressedKeys);
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.pressedKeys[event.key] = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    delete this.pressedKeys[event.key];
  }
}