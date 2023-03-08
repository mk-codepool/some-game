export class KeyboardController {
  private _pressedKeys: { [key: string]: boolean } = {};

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

  private onKeyDown(event: KeyboardEvent): void {
    this._pressedKeys[event.key] = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    delete this._pressedKeys[event.key];
  }
}