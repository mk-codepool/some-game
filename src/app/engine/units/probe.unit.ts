import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { EngineController } from '../controller';
import { PressedKeys } from '../controller/keyboard.controller';

export interface IProbeUnit {
  engineController: EngineController;
}

export class ProbeUnit {
  public sceneGroup: THREE.Group = new THREE.Group();

  private _engineController!: EngineController;
  private moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private currentRotation: THREE.Quaternion = new THREE.Quaternion();
  private _dust: THREE.Points = this.getDustEntity();

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
    }
  }

  private setSceneGroupEntity(): void {
    const probe = this.getProbeEntity();

    this.currentRotation = this.sceneGroup.quaternion.clone();
    this.sceneGroup.add(this._dust);
    this.sceneGroup.add(probe);
    
    if (this._dust.morphTargetInfluences) {
      console.log(this._dust.morphTargetInfluences[0])
    }
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

  private getDustEntity(): THREE.Points {
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.morphAttributes['position'] = [];
    const vertices = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 20; i++) {
      // set random position for each vertex, but y is greater than 0 and less than .2, z and x are greater than -1 and less than 1
      vertices.push(
        Math.random() * 2 - 1,
        Math.random() * 0.2,
        Math.random() * 2 - 1
      );
      color.setRGB(Math.random(), Math.random(), Math.random());
      colors.push(255, 255, 255);
    }

    dustGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    dustGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    
    const map = new THREE.TextureLoader().load( '../../../assets/game-engine/textures/dust-particle/map.png' );
    const material = new THREE.PointsMaterial( { size: 15, sizeAttenuation: false, map, alphaTest: 0.1, transparent: true } );
    const dust = new THREE.Points(dustGeometry, material);

    return dust;
  }

  private updatePosition(pressedKeys: PressedKeys) {
    let direction = new THREE.Vector3();
    
    this.updateDust();

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

  private updateDust() {
    if (this._dust.morphTargetInfluences) {
      this._dust.morphTargetInfluences[0] = Math.random();
    }
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
}
