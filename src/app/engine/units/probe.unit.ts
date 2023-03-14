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
    const dust = this.getDustEntity();
    // add halo
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      this.shaderHaloMaterial()
    );
    halo.position.set(0, 1, 0);

    this.currentRotation = this.sceneGroup.quaternion.clone();
    this.sceneGroup.add(dust);
    this.sceneGroup.add(probe);
    this.sceneGroup.add(halo);
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

    return mesh;
  }

  private getDustEntity(): THREE.Points {
    const dustGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 20; i++) {
      vertices.push(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      color.setRGB(Math.random(), Math.random(), Math.random());
      colors.push(color.r, color.g, color.b);
    }

    dustGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    dustGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    dust.receiveShadow = true;
    dust.castShadow = true;

    return dust;
  }

  private shaderHaloMaterial(): THREE.ShaderMaterial {
    const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `;
    const fragmentShader = `
    varying vec3 vNormal;
    void main() 
    {
      float intensity = pow( 0.002 - dot( vNormal, vec3( 0.0, 0.0, 1 ) ), 6.0 ); 
      gl_FragColor = vec4(140.0/255.0, 103.0/255.0, 83.0/255.0, 0.5) * intensity;
    }
    `;

    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    return customMaterial;
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
}
