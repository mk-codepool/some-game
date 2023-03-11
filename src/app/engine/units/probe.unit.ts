import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { EngineController } from '../controller';
import { PressedKeys } from '../controller/keyboard.controller';

export interface IProbeUnit {
  engineController: EngineController;
}

export class ProbeUnit {
  public mesh!: THREE.Mesh;
  private _engineController!: EngineController;
  private moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private currentRotation: THREE.Quaternion = new THREE.Quaternion();


  constructor({ engineController }: IProbeUnit) {
    this.setMesh();
    this._engineController = engineController;
  }

  private setMesh(): void {
    const geometry = this.getProbeGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const axesHelper = new THREE.AxesHelper(5);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.add(axesHelper);
    this.currentRotation = this.mesh.quaternion.clone();
  }

  public getProbeGeometry(): THREE.ConeGeometry {
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);

    return coneGeometry;
  }

  public updateByAnimation(): void {
    if(this._engineController.keyboardController.areAnyKeysPressed) {
      this.updatePosition(this._engineController.keyboardController.pressedKeys);
      this.updateRotation(this._engineController.keyboardController.pressedKeys);
    }
  }

  private updatePosition(pressedKeys: PressedKeys) {
    console.log('updatePosition')
    let direction = new THREE.Vector3();
  
    if (pressedKeys['ArrowUp']) {
      direction.z += 1;
      direction.normalize().multiplyScalar(0.6);
    } else if (pressedKeys['ArrowDown']) {
      direction.z -= 1;
      direction.normalize().multiplyScalar(0.3);
    }
  
    let newPosition = this.mesh.position.clone().add(direction.applyQuaternion(this.mesh.quaternion));
  
    if (this.moveTween) this.moveTween.stop();
    this.moveTween = new TWEEN.Tween(this.mesh.position)
      .to(newPosition, 200)
      .easing(TWEEN.Easing.Linear.None)
      .start();
  }

  private updateRotation(pressedKeys: PressedKeys) {
    let angle = 0;
    const rotationSpeed = .05;
  
    if (pressedKeys['ArrowLeft']) angle += rotationSpeed;
    if (pressedKeys['ArrowRight']) angle -= rotationSpeed;
    
    this.currentRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.mesh.rotation.setFromQuaternion(this.currentRotation.multiply(this.mesh.quaternion));
  }
}
