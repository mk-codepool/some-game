import * as THREE from "three";
import { OrthographicCamera } from "three";
import { Axes } from "../interfaces.engine";

export class DefaultCamera extends OrthographicCamera {
  private _initRotation!: THREE.Euler;
  private _lookAtVector: Axes = { x: 0, y: 0, z: 0 };

  constructor(height: number, width: number) {
    const cameraPovFactor: number = 1 / 128;
    super(
      -1 * width * cameraPovFactor,
      width * cameraPovFactor,
      height * cameraPovFactor,
      -1 * height * cameraPovFactor,
      1,
      1000
    );
    this.position.set(15, 12, 15);
    this.lookAt(new THREE.Vector3(0, 0, 0));
    this._initRotation = this.rotation;
    console.log('angle: ', this._initRotation)
    
    this.addKeyMoveController();
    this.addWheelController();
  }

  private get lookAtVector(): THREE.Vector3 {
    return new THREE.Vector3(this._lookAtVector.x, this._lookAtVector.y, this._lookAtVector.z);
  }

  private set lookAtVector(axes: Axes) {
    this._lookAtVector = axes;
  }

  public addKeyMoveController(): void {
    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
  }

  public addWheelController(): void {
    document.addEventListener('wheel', this.onWheel.bind(this), false);
  }

  private onKeyDown(event: KeyboardEvent) {
    const moveFactor: number = 0.1;
    
    switch (event.code) {
      case 'KeyW': // W
        this.position.z -= moveFactor;
        this.position.x -= moveFactor;
        this._lookAtVector.z -= moveFactor
        this._lookAtVector.x -= moveFactor
        break;
      case 'KeyS': // S
        this.position.z += moveFactor;
        this.position.x += moveFactor;
        this._lookAtVector.z += moveFactor;
        this._lookAtVector.x += moveFactor;
        break;
      case 'KeyA': // A
        this.position.x -= moveFactor;
        this.position.z += moveFactor;
        this._lookAtVector.x -= moveFactor;
        this._lookAtVector.z += moveFactor;
        break;
      case 'KeyD': // D
        this.position.x += moveFactor;
        this.position.z -= moveFactor;
        this._lookAtVector.x += moveFactor;
        this._lookAtVector.z -= moveFactor;
        break;
    }
  }

  private onWheel(event: WheelEvent) {
    if (event.deltaY < 0 && this.position.y < 30) {
      this.position.y += 1;
    } else if (event.deltaY > 0 && this.position.y > 6) {
      this.position.y -= 1;
    }
  }
}
