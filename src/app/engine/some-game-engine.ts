import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { EngineCameras } from "./cameras";
import { DefaultCamera } from "./cameras/default-camera.camera";
import { standardMaterial } from "./materials/standard.material";

export interface GameConfig {
  canvasElement: HTMLElement;
  canvasHeight: number;
  canvasWidth: number;
}

export class SomeGameEngine {
  private _animate: FrameRequestCallback = this.animate.bind(this);
  private _raycaster: THREE.Raycaster = new THREE.Raycaster();
  private _scene: THREE.Scene = new THREE.Scene();
  private _camera!: DefaultCamera;
  private _canvas!: HTMLElement;
  private _renderer!: THREE.WebGLRenderer;
  private _cube!: THREE.Mesh;
  private readonly _aboveSurface = new THREE.Vector3(0, 1, 0);
  private readonly _surfaceMinimumDistance = 0.5;

  constructor(_gameConfig: GameConfig) {
    this._canvas = _gameConfig.canvasElement;
    this.setRenderer(_gameConfig);
    this.setCamera(_gameConfig);
  }

  public render() {
    this.animate();
  }

  public setSceneObjects(): void {
    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    this._cube = new THREE.Mesh(cubeGeometry, standardMaterial);
    this._cube.position.y = 0.5;
    this._cube.castShadow = true;
    // Flat surface
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
    const plane = new THREE.Mesh(planeGeometry, standardMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = 0;
    plane.name = 'surface';
    // direct Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.radius = 8;
    directionalLight.position.set(1, 1, 1);
    // light
    const light = new THREE.PointLight(0xffffff, 0.5);
    light.castShadow = true;
    light.shadow.radius = 8;
    light.position.set(3, 3, 2);
    // Sky sphere
    const skyGeometry = new THREE.SphereGeometry(100, 100, 100);
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('../../assets/blue-sky-texture.jpg'),
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);

    this.addItemsToScene([
      this._cube,
      plane,
      directionalLight,
      light,
      sky,
      ambientLight,
    ]);
  }

  private animate(): void {
    requestAnimationFrame(this._animate);
    this._renderer.render(this._scene, this._camera);
  }

  private setCamera(_gameConfig: GameConfig): void {
    this._camera = new EngineCameras.DefaultCamera(_gameConfig.canvasHeight, _gameConfig.canvasWidth);
    this._camera.addKeyMoveController();
    this._camera.addWheelController();
  }

  private setRenderer(_gameConfig: GameConfig): void {
    this._renderer = new THREE.WebGLRenderer({
      canvas: _gameConfig.canvasElement,
    });
    this._renderer.setSize(_gameConfig.canvasWidth, _gameConfig.canvasHeight);
    this._renderer.shadowMap.enabled = true;
  }

  private addItemsToScene(items: any[]): void {
    items.forEach((item) => this._scene.add(item));
  }
}