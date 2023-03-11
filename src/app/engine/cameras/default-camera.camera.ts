import * as THREE from "three";
import { OrthographicCamera } from "three";
import { EngineController } from "../controller";
import { PressedKeys } from "../controller/keyboard.controller";
import { Axes } from "../interfaces.engine";

interface IDefaultCamera {
  height: number;
  width: number;
}

interface IDefaultCameraConfig {
  controller: EngineController;
}

export class DefaultCamera extends OrthographicCamera {
  private _initRotation!: THREE.Euler;
  private _lookAtVector: Axes = { x: 0, y: 0, z: 0 };
  private _engineController!: EngineController;

  constructor({
    height,
    width,
  }: IDefaultCamera) {
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
  }

  public updateByAnimation(): void {
    if(this._engineController.keyboardController.areAnyKeysPressed) {
      this.move(this._engineController.keyboardController.pressedKeys);
    }

    if(this._engineController.mouseController.wheelDelta !== 0) {
      this.onWheel(this._engineController.mouseController.wheelDelta);
    }
  }

  public setConfig({ controller }: IDefaultCameraConfig): void {
    this._engineController = controller;
  }

  private get lookAtVector(): THREE.Vector3 {
    return new THREE.Vector3(this._lookAtVector.x, this._lookAtVector.y, this._lookAtVector.z);
  }

  private set lookAtVector(axes: Axes) {
    this._lookAtVector = axes;
  }

  private move(pressedKeys: PressedKeys) {
    const moveFactor: number = 0.1;
    console.log(pressedKeys)

    if(pressedKeys['w']) {
      this.position.z -= moveFactor;
      this.position.x -= moveFactor;
      this._lookAtVector.z -= moveFactor
      this._lookAtVector.x -= moveFactor
    }

    if(pressedKeys['s']) {
      this.position.z += moveFactor;
      this.position.x += moveFactor;
      this._lookAtVector.z += moveFactor;
      this._lookAtVector.x += moveFactor;
    }

    if(pressedKeys['a']) {
      this.position.x -= moveFactor;
      this.position.z += moveFactor;
      this._lookAtVector.x -= moveFactor;
      this._lookAtVector.z += moveFactor;
    }

    if(pressedKeys['d']) {
      this.position.x += moveFactor;
      this.position.z -= moveFactor;
      this._lookAtVector.x += moveFactor;
      this._lookAtVector.z -= moveFactor;
    }
  }

  private onWheel(mouseWheelDelta: number): void {
    console.log(mouseWheelDelta)
    if (mouseWheelDelta < 0 && this.position.y < 30) {
      this.position.y += 1;
    } else if (mouseWheelDelta > 0 && this.position.y > 6) {
      this.position.y -= 1;
    }
    this.lookAt(this.lookAtVector);
  }
}
