import * as THREE from "three";
import { Mesh, OrthographicCamera } from "three";
import { Axes } from "../interfaces.engine";

export class DefaultCamera extends OrthographicCamera {
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
    this.position.set(150, 125, 150);
    this.lookAt(new THREE.Vector3(0, 0, 0));
    
    this.addKeyMoveController();
    this.addWheelController();
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
    if (event.deltaY < 0 && this.position.y < 300) {
      this.position.y += 10;
    } else if (event.deltaY > 0 && this.position.y > 15) {
      this.position.y -= 10;
    }

    this.lookAt(new THREE.Vector3(this._lookAtVector.x, this._lookAtVector.y, this._lookAtVector.z));
  }
}
