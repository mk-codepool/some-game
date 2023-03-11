export interface PressedKeys {
  [key: string]: boolean;
}

export class KeyboardController {
  public areAnyKeysPressed: boolean = false;
  
  private _pressedKeys: PressedKeys = {};

  constructor() {
    this.bindKeys();
  }

  public bindKeys(): void {
    document.addEventListener('keydown', event => this.onKeyDown(event), false);
    document.addEventListener('keyup', event => this.onKeyUp(event), false);
  }

  public isKeyPressed(key: string): boolean {
    return this._pressedKeys[key];
  }

  public get pressedKeys(): PressedKeys {
    return this._pressedKeys;
  }

  private onKeyDown(event: KeyboardEvent): void {
    this._pressedKeys[event.key] = true;
    this.areAnyKeysPressed = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    delete this._pressedKeys[event.key];
    Object.keys(this._pressedKeys).length === 0 ? this.areAnyKeysPressed = false : null;
  }
}