import * as THREE from "three";
import { EngineBasics } from "./basics";
import { BasicSceneObject } from "./basics/basic-scene-object.basic";
import { EngineCameras } from "./cameras";
import { DefaultCamera } from "./cameras/default-camera.camera";
import { EngineLights } from "./lights";
import { EngineRenderer } from "./renderer.engine";
import { EngineShapes } from "./shapes";

export interface GameConfig {
  canvasElement: HTMLElement;
  canvasHeight: number;
  canvasWidth: number;
}

export class SomeGameEngine {
  private _animate: FrameRequestCallback = this.animate.bind(this);
  private _scene: BasicSceneObject = new EngineBasics.BasicSceneObject();
  private _camera!: DefaultCamera;
  private _renderer!: THREE.WebGLRenderer;
  private _animateCounter: number = 0;

  constructor(_gameConfig: GameConfig) {
    this.setRenderer(_gameConfig);
    this.setCamera(_gameConfig);
  }

  public render() {
    this.animate();
  }

  public setSceneObjects(): void {
    // Cube
    const cube = EngineShapes.BasicShapes.getBasicBox({ axes: { x: 0, y: 0.5, z: 0 }});
    // Sphere
    const sphere = EngineShapes.BasicShapes.getBasicSphere({ axes: { x: 2, y: 2, z: 0 }});
    // Flat surface
    const plane = EngineShapes.BasicShapes.getBasicSurface();
    // direct Light
    const directionalLight = EngineLights.BasicLights.getDirectionalLight({ axes: { x: 10, y: 10, z: 10 }});
    // light
    const light = EngineLights.BasicLights.getPointLight({ axes: { x: 10, y: 10, z: 10 }});
    // Sky sphere
    const sky = new EngineShapes.DomeShape();
    // Ambient light
    const ambientLight = EngineLights.BasicLights.getAmbientLight();

    this._scene.addItemsToScene([
      cube,
      sphere,
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

  private countAnimation(): void {
    this._animateCounter += 1;

    if (this._animateCounter > 60) {
      this._animateCounter = 0;
    }
  }

  private setCamera(_gameConfig: GameConfig): void {
    this._camera = new EngineCameras.DefaultCamera(_gameConfig.canvasHeight, _gameConfig.canvasWidth);
  }

  private setRenderer(_gameConfig: GameConfig): void {
    this._renderer = new EngineRenderer(_gameConfig);
  }
}