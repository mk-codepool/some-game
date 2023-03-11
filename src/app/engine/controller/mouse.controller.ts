import * as THREE from "three";

interface MouseControllerConfig {
  canvas: HTMLCanvasElement;
}

export class MouseController {
  private _wheelDelta: number = 0;
  private _mouse: THREE.Vector2 = new THREE.Vector2();
  private _raycaster: THREE.Raycaster = new THREE.Raycaster();
  private _canvas!: HTMLCanvasElement;
  private _camera!: THREE.Camera;
  private _scene!: THREE.Scene;
  private _intersects: THREE.Intersection[] = [];
  private _intersected: THREE.Intersection | null = null;
  private _onMouseDown: (event: MouseEvent) => void = this.onMouseDown.bind(this);
  private _onMouseMove: (event: MouseEvent) => void = this.onMouseMove.bind(this);
  private _onMouseUp: (event: MouseEvent) => void = this.onMouseUp.bind(this);
  private _onMouseOut: (event: MouseEvent) => void = this.onMouseOut.bind(this);

  public setConfig(mouseControllerConfig: MouseControllerConfig): void {
    this._canvas = mouseControllerConfig.canvas;
    this._canvas.addEventListener('wheel', (event: WheelEvent) => {
      this.wheelDelta = event.deltaY;
    }, false);
  }

  public bindEvents(): void {
    this._canvas.addEventListener('mousedown', this._onMouseDown, false);
    this._canvas.addEventListener('mousemove', this._onMouseMove, false);
    this._canvas.addEventListener('mouseup', this._onMouseUp, false);
    this._canvas.addEventListener('mouseout', this._onMouseOut, false);
  }

  public unbindEvents(): void {
    this._canvas.removeEventListener('mousedown', this._onMouseDown, false);
    this._canvas.removeEventListener('mousemove', this._onMouseMove, false);
    this._canvas.removeEventListener('mouseup', this._onMouseUp, false);
    this._canvas.removeEventListener('mouseout', this._onMouseOut, false);
  }

  public onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this._raycaster.setFromCamera(this._mouse, this._camera);
    this._intersects = this._raycaster.intersectObjects(this._scene.children, true);
    if (this._intersects.length > 0) {
      this._intersected = this._intersects[0];
    }
  }

  public onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    this._mouse.x = (event.clientX / this._canvas.clientWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / this._canvas.clientHeight) * 2 + 1;
  }

  public onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    if (this._intersected) {
      this._intersected = null;
    }
  }

  public onMouseOut(event: MouseEvent): void {
    event.preventDefault();
    if (this._intersected) {
      this._intersected = null;
    }
  }
  
  public get wheelDelta(): number {
    return this._wheelDelta;
  }

  private set wheelDelta(wheelDelta: number) {
    this._wheelDelta = wheelDelta;
    setTimeout(() => this._wheelDelta = 0, 100);
  }
}