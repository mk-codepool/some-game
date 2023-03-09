import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { EngineController } from '../controller';
import { PressedKeys } from '../controller/keyboard.controller';

export class ProbeUnit {
  public mesh!: THREE.Mesh;
  public engineController!: EngineController;
  private moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private currentRotation: THREE.Quaternion = new THREE.Quaternion();


  constructor({ engineController }: { engineController: EngineController}) {
    this.setMesh();
    this.engineController = engineController;
  }

  private setMesh(): void {
    const geometry = this.getProbeGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const axesHelper = new THREE.AxesHelper(5);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.rotateX(Math.PI / 2);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.add(axesHelper);
    this.currentRotation = this.mesh.quaternion.clone();
  }

  public getProbeGeometry(): THREE.ConeGeometry {
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);

    return coneGeometry;
  }

  public animate(): void {
    this.engineController.keyboardController.keyPressed((pressedKeys: PressedKeys) => {
      this.updatePosition(pressedKeys);
      this.updateRotation(pressedKeys);
    });
  }

  private updatePosition(pressedKeys: PressedKeys) {
    let direction = new THREE.Vector3();
  
    if (pressedKeys['ArrowUp']) {
      direction.y += 1;
      direction.normalize().multiplyScalar(0.6);
    } else if (pressedKeys['ArrowDown']) {
      direction.y -= 1;
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
  
    if (pressedKeys['ArrowLeft']) angle += 0.1;
    if (pressedKeys['ArrowRight']) angle -= 0.1;
    
    this.currentRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.mesh.rotation.setFromQuaternion(this.currentRotation.multiply(this.mesh.quaternion));
  }
}
