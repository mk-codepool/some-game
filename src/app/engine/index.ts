import * as THREE from "three";
import { DefaultScene } from "./scenes/default-scene.scene";
import { EngineCameras } from "./cameras";
import { DefaultCamera } from "./cameras/default-camera.camera";
import { EngineLights } from "./lights";
import { EngineRenderer } from "./renderer.engine";
import { EngineShapes } from "./shapes";
import { EngineScenes } from "./scenes";
import { DefaultSurface } from "./surroundings/surface.surrounding";
import { EndingSurroundings } from "./surroundings";

export interface GameConfig {
  canvasElement: HTMLElement;
  canvasHeight: number;
  canvasWidth: number;
}

export interface GameWorld {
  surface?: DefaultSurface;
}

export class SomeGameEngine {
  private _animate: FrameRequestCallback = this.animate.bind(this);
  private _scene: DefaultScene = new EngineScenes.DefaultScene();
  private _camera!: DefaultCamera;
  private _renderer!: THREE.WebGLRenderer;
  private _world: GameWorld = {};

  constructor(_gameConfig: GameConfig) {
    this.setRenderer(_gameConfig);
    this.setCamera(_gameConfig);
  }

  public render() {
    this.animate();
  }

  public setSceneObjects(): void {
    this._world.surface = new EndingSurroundings.DefaultSurface();
    // Cube
    const cube = EngineShapes.BasicShapes.getBasicBox({ axes: { x: 0, y: 0.5, z: 0 }});
    // Sphere
    const sphere = EngineShapes.BasicShapes.getBasicSphere({ axes: { x: 2, y: 2, z: 0 }});
    // direct Light
    const directionalLight = EngineLights.BasicLights.getDirectionalLight({ axes: { x: 10, y: 10, z: 10 }});
    // light
    const light = EngineLights.BasicLights.getPointLight({ axes: { x: 10, y: 10, z: 10 }});
    // Sky sphere
    const sky = new EngineShapes.DomeShape();
    // Ambient light
    const ambientLight = EngineLights.BasicLights.getAmbientLight();

    this._scene.addItemsToScene([
      this._world.surface.mesh,
      cube,
      sphere,
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
  }

  private setRenderer(_gameConfig: GameConfig): void {
    this._renderer = new EngineRenderer(_gameConfig);
  }
}