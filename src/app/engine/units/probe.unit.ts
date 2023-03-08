import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

// Create unit tests for this class
export class ProbeUnit {
  public mesh!: THREE.Mesh;
  private moveTween:
    | TWEEN.Tween<THREE.Euler>
    | TWEEN.Tween<THREE.Vector3>
    | null = null;
  private rotateTween: TWEEN.Tween<THREE.Quaternion> | null = null;
  private isAnimating: boolean = false;
  private pressedKeys: { [key: string]: boolean } = {};
  private currentRotation!: THREE.Quaternion;


  constructor() {
    this.setMesh();
  }

  private setMesh(): void {
    const geometry = this.getProbeGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // add axes helper
    const axesHelper = new THREE.AxesHelper(5);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 2, 0);
    this.mesh.rotateX(Math.PI / 2);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.add(axesHelper);
    this.currentRotation = this.mesh.quaternion.clone();

    this.bindKeys();
  }

  // Method that returns only the probe geometry of cone shape
  public getProbeGeometry(): THREE.ConeGeometry {
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);

    return coneGeometry;
  }

  // Method that bind the keyboard keys to the probe move methods, turning methods can be used while moving forward or backward
  public bindKeys(): void {
    document.addEventListener('keydown', event => this.onKeyDown(event), false);
    document.addEventListener('keyup', event => this.onKeyUp(event), false);
  }

  public animate(): void {
    this.updatePosition();
    this.updateRotation();
  }

  private updatePosition() {
    let direction = new THREE.Vector3();
  
    if (this.pressedKeys[38]) {
      direction.y += 1; // strzałka w górę
      direction.normalize().multiplyScalar(0.6);
    } else if (this.pressedKeys[40]) {
      direction.y -= 1; // strzałka w dół
      direction.normalize().multiplyScalar(0.3);
    }
  
  
    // Aktualizacja pozycji obiektu według jego osi
    let newPosition = this.mesh.position.clone().add(direction.applyQuaternion(this.mesh.quaternion));
  
    // Animacja ruchu obiektu
    if (this.moveTween) this.moveTween.stop();
    this.moveTween = new TWEEN.Tween(this.mesh.position)
      .to(newPosition, 200) // krótszy czas trwania animacji
      .easing(TWEEN.Easing.Linear.None) // jednostajna funkcja wygładzania
      .start();
  }

  private updateRotation() {
    let angle = 0;
  
    if (this.pressedKeys[37]) angle += 0.1; // strzałka w lewo
    if (this.pressedKeys[39]) angle -= 0.1; // strzałka w prawo
  
    // Tworzenie nowego kwaternionu reprezentującego obrot o podany kąt wokół osi Z
    let rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
  
    // Mnożenie aktualnego kwaternionu obrotu przez nowy kwaternion reprezentujący obrot o podany kąt
    this.currentRotation.multiply(rotationQuaternion);
  
    // Animacja obrotu obiektu
    if (this.rotateTween) this.rotateTween.stop();
    this.rotateTween = new TWEEN.Tween(this.currentRotation)
      .to(this.mesh.quaternion.clone(), 200) // krótszy czas trwania animacji
      .easing(TWEEN.Easing.Linear.None) // jednostajna funkcja wygładzania
      .onUpdate(() => {
        // Aktualizacja kwaternionu obrotu meshu na bieżąco podczas animacji
        this.mesh.setRotationFromQuaternion(this.currentRotation);
      })
      .start();
  }  

  private onKeyDown(event: { keyCode: string | number; }) {
    this.pressedKeys[event.keyCode] = true;
    console.log(this.pressedKeys)
    this.updatePosition();
  }
  
  private onKeyUp(event: { keyCode: string | number; }) {
    this.pressedKeys[event.keyCode] = false;
  }
}
