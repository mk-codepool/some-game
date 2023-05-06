import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { EngineController } from '../controller';
import { PressedKeys } from '../controller/keyboard.controller';
const Nebula = require('three-nebula');
const { System, Emitter, BoxZone, Rate, Span, Position, Color, Alpha, Scale, Life } = Nebula;

export interface IProbeUnit {
  engineController: EngineController;
}

export class ProbeUnit {
  public sceneGroup: THREE.Group = new THREE.Group();
  private particleSystem: typeof System;

  private _engineController!: EngineController;
  private moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private currentRotation: THREE.Quaternion = new THREE.Quaternion();

  constructor({ engineController }: IProbeUnit) {
    this.setSceneGroupEntity();
    this._engineController = engineController;
  }

  public updateByAnimation(): void {
    if (this._engineController.keyboardController.areAnyKeysPressed) {
      this.updatePosition(
        this._engineController.keyboardController.pressedKeys
      );
      this.updateRotation(
        this._engineController.keyboardController.pressedKeys
      );
      
      this.particleSystem.update();
    }
  }

  private setSceneGroupEntity(): void {
    const probe = this.getProbeEntity();

    this.currentRotation = this.sceneGroup.quaternion.clone();
    this.sceneGroup.add(probe);
    this.createDustEffect();
  }

  private getProbeEntity(): THREE.Mesh {
    const axesHelper = new THREE.AxesHelper(5);
    const geometry = new THREE.ConeGeometry(0.1, 0.5, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 2, 0);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.add(axesHelper);
    this.rotateMesh(mesh);

    return mesh;
  }

  private updatePosition(pressedKeys: PressedKeys) {
    let direction = new THREE.Vector3();

    if (pressedKeys['ArrowUp']) {
      direction.z += 1;
      direction.normalize().multiplyScalar(0.6);
    } else if (pressedKeys['ArrowDown']) {
      direction.z -= 1;
      direction.normalize().multiplyScalar(0.3);
    }

    let newPosition = this.sceneGroup.position
      .clone()
      .add(direction.applyQuaternion(this.sceneGroup.quaternion));

    if (this.moveTween) this.moveTween.stop();
    this.moveTween = new TWEEN.Tween(this.sceneGroup.position)
      .to(newPosition, 200)
      .easing(TWEEN.Easing.Linear.None)
      .start();
  }

  private updateRotation(pressedKeys: PressedKeys) {
    let angle = 0;
    const rotationSpeed = 0.05;

    if (pressedKeys['ArrowLeft']) angle += rotationSpeed;
    if (pressedKeys['ArrowRight']) angle -= rotationSpeed;

    this.currentRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.sceneGroup.rotation.setFromQuaternion(
      this.currentRotation.multiply(this.sceneGroup.quaternion)
    );
  }

  // rotate mesh by 90 degrees on x axis withouth changing its rotation
  private rotateMesh(mesh: THREE.Mesh) {
    const rotation = mesh.rotation.clone();
    mesh.rotation.x += Math.PI / 2;
    mesh.updateMatrix();
    mesh.geometry.applyMatrix4(mesh.matrix);
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    mesh.matrix.identity();
    mesh.matrixAutoUpdate = false;
  }

  private createDustEffect() {
    this.particleSystem = new System();
    this.sceneGroup.add(this.particleSystem.mesh);

    const emitter = new Emitter()
      .setRate(new Rate(new Span(10, 20), new Span(0.1, 0.25)))
      .setInitializers([
        new Position(new BoxZone(1, 1, 1)),
        new Color(0xaaaaaa, 0xaaaaaa),
        new Alpha(0.5, 0),
        new Scale(0.1, 0.05),
        new Life(1, 3),
      ])
      .emit();

    this.particleSystem.addEmitter(emitter);
  }
}
