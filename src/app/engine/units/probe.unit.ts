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

    this.currentRotation = this.sceneGroup.quaternion.clone();
    this.sceneGroup.add(dust);
    this.sceneGroup.add(probe);
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
    
    const material = new THREE.PointsMaterial({ color: 0xf38ba0, size: 10 });
    const dust = new THREE.Points(dustGeometry, this.shaderHaloMaterial());

    return dust;
  }

  private shaderHaloMaterial(): THREE.ShaderMaterial {
    const vertexShader = `
    varying vec3 vNormal;
    
    void main() {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = 10.0;
    }
    `;
    const fragmentShader = `
    varying vec3 vNormal;
    void main() 
    {
      float intensity = pow( 0.002 - dot( vNormal, vec3( 0.0, 0.0, 1 ) ), 1.0 );
      gl_FragColor = vec4(140.0/255.0, 103.0/255.0, 83.0/255.0, 1) * intensity;
    }
    `;

    const shaderPoint = THREE.ShaderLib.points
    const uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms)
    uniforms.size.value = 60
    uniforms.scale.value = 350

    const customMaterial = new THREE.ShaderMaterial({
      uniforms,
      defines: {
          USE_MAP: "",
          USE_SIZEATTENUATION: ""
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: false,
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
