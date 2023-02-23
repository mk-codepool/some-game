import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

// Create unit tests for this class
export class ProbeUnit {
  public mesh!: THREE.Mesh;
  public moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private isAnimating: boolean = false;


  constructor() {
    this.setMesh();
  }

  public update() {
    TWEEN.update();
  }

  private setMesh(): void {
    const geometry = this.getProbeGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // add axes helper
    const axesHelper = new THREE.AxesHelper(5);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.rotateX(Math.PI / -2);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.add(axesHelper);

    this.bindKeys();
  }

  // Method that returns only the probe geometry of cone shape
  public getProbeGeometry(): THREE.ConeGeometry {
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);

    return coneGeometry;
  }

  // Method that smooth move the probe straight forward
  public moveForward(): void {
    if (this.isAnimating) {
      return;
    }
    
    const distance = .001; // distance to move the object
    const duration = 1000; // duration of the animation in milliseconds
    const startPosition = this.mesh.position.clone();
    const endPosition = this.mesh.position
      .clone()
      .add(new THREE.Vector3(0, distance, 0));

    this.moveTween = new TWEEN.Tween(startPosition)
      .to(endPosition, duration)
      .onUpdate(() => {
        const position = this.mesh.position.clone();
        this.mesh.translateOnAxis(
          new THREE.Vector3(0, distance, 0),
          position.y + startPosition.y
        );
      })
      .onComplete(() => this.isAnimating = false)
      .start();
  }

  // Method that smooth move the probe straight backward
  public moveBackward(): void {
    if (this.isAnimating) {
      return;
    }

    const distance = .1; // distance to move the object
    const duration = 1000; // duration of the animation in milliseconds
    const startPosition = this.mesh.position.clone();
    const endPosition = this.mesh.position
      .clone()
      .add(new THREE.Vector3(0, distance, 0));

    this.moveTween = new TWEEN.Tween(startPosition)
    .to(endPosition, duration)
    .onUpdate(() => {
      const position = this.mesh.position.clone();
      this.mesh.translateOnAxis(
        new THREE.Vector3(0, distance, 0),
        position.y - startPosition.y
      );
    })
    .onComplete(() => this.isAnimating = false)
    .start();
  }

  // Method that smoothly rotate the probe by Z axis to the left
  public turnLeft(): void {
    this.moveTween = new TWEEN.Tween(this.mesh.rotation)
      .to({ z: this.mesh.rotation.z + 0.5 }, 1000)
      .start();
  }

  // Method that smoothly rotate the probe by Z axis to the right
  public turnRight(): void {
    this.moveTween = new TWEEN.Tween(this.mesh.rotation)
      .to({ z: this.mesh.rotation.z - 0.5 }, 1000)
      .start();
  }

  // Method that bind the keyboard keys to the probe move methods, turning methods can be used while moving forward or backward
  public bindKeys(): void {
    document.addEventListener('keydown', (event) => {
      console.log(event.code)
      if (event.code === 'ArrowUp') {
        this.moveForward();
      } else if (event.code === 'ArrowDown') {
        this.moveBackward();
      } else if (event.code === 'ArrowLeft') {
        this.turnLeft();
      } else if (event.code === 'ArrowRight') {
        this.turnRight();
      }
    });
  }
}
