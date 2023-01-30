import * as THREE from "three";
import { standardMaterial } from "./materials/standard.material";

export interface GameConfig {
  canvasElement: HTMLElement;
  canvasHeight: number;
  canvasWidth: number;
}

export class SomeGameEngine {
  private _scene: THREE.Scene = new THREE.Scene();
  private _camera!: THREE.PerspectiveCamera;
  private _canvas!: HTMLElement;
  private _renderer!: THREE.WebGLRenderer;
  private _cube!: THREE.Mesh;
  private _animate: FrameRequestCallback = this.animate.bind(this);

  constructor(_gameConfig: GameConfig) {
    this._canvas = _gameConfig.canvasElement;
    this.setCamera(_gameConfig);
    this.setRenderer(_gameConfig);
  }

  public render() {
    this.animate();
  }

  public setSceneObjects(): void {
    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    this._cube = new THREE.Mesh(cubeGeometry, standardMaterial);
    this._cube.position.y = 1;
    this._cube.castShadow = true;
    // Flat surface
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
    const plane = new THREE.Mesh(planeGeometry, standardMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    // direct Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
    directionalLight.castShadow = true;
    directionalLight.shadow.radius = 8;
    directionalLight.position.set(1, 1, 1);
    // light
    const light = new THREE.PointLight(0xffffff, .5);
    light.castShadow = true;
    light.shadow.radius = 8;
    light.position.set(3, 3, 2);

    this._scene.add(this._cube);
    this._scene.add(plane);
    this._scene.add(directionalLight);
    this._scene.add(light);
  }
  
  private animate(): void {
    requestAnimationFrame(this._animate);
    this._cube.rotation.x += 0.01;
    this._cube.rotation.y += 0.01;
    this._renderer.render(this._scene, this._camera);
  }

  private setCamera(_gameConfig: GameConfig): void {
    this._camera = new THREE.PerspectiveCamera(75, _gameConfig.canvasWidth / _gameConfig.canvasHeight, 0.1, 1000);
    this._camera.position.z = 5;
  }

  private setRenderer(_gameConfig: GameConfig): void {
    this._renderer = new THREE.WebGLRenderer({ canvas: _gameConfig.canvasElement });
    this._renderer.setSize(_gameConfig.canvasWidth, _gameConfig.canvasHeight);
    this._renderer.shadowMap.enabled = true;
  }
}