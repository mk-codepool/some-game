import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js'

export class ProbeUnit {
  public mesh!: THREE.Mesh;
  private speed: number = 0.1;
  public moveTween: TWEEN.Tween<THREE.Vector3> | null = null;

  constructor() {
    this.setMesh();
  }
  
  public update() {
    TWEEN.update();
  }

  private setMesh(): void {
    // create a sphere geometry with the given radius
    const geometry = new THREE.SphereGeometry(.3, 32, 32);

    // create a standard material with the given color
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // create a mesh using the geometry and material
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.castShadow = true;

    // initialize the movement speed and key state variables
    this.speed = 1;

    // add an event listener to track keyboard key state
    document.addEventListener('keydown', (event) => {
      const moveTime = 200;
      if (!this.moveTween) {
        // start a new moveTween animation based on the key input
        switch (event.code) {
          case 'ArrowUp':
            this.moveTween = new TWEEN.Tween(this.mesh.position)
              .to({ z: this.mesh.position.z - this.speed }, moveTime)
              .onComplete(() => (this.moveTween = null))
              .start();
            break;
          case 'ArrowDown':
            this.moveTween = new TWEEN.Tween(this.mesh.position)
              .to({ z: this.mesh.position.z + this.speed }, moveTime)
              .onComplete(() => (this.moveTween = null))
              .start();
            break;
          case 'ArrowLeft':
            this.moveTween = new TWEEN.Tween(this.mesh.position)
              .to({ x: this.mesh.position.x - this.speed }, moveTime)
              .onComplete(() => (this.moveTween = null))
              .start();
            break;
          case 'ArrowRight':
            this.moveTween = new TWEEN.Tween(this.mesh.position)
              .to({ x: this.mesh.position.x + this.speed }, moveTime)
              .onComplete(() => (this.moveTween = null))
              .start();
            break;
        }
      }
    });
  }
}