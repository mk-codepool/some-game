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
import { EngineUnits } from "./units";
import * as TWEEN from '@tweenjs/tween.js';
import { ProbeUnit } from "./units/probe.unit";
import { EngineController } from "./controller";
import { PressedKeys } from "./controller/keyboard.controller";

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
  private _controller!: EngineController;
  private _probe!: ProbeUnit;

  constructor(_gameConfig: GameConfig) {
    this.setRenderer(_gameConfig);
    this.setCamera(_gameConfig);
    this.setController(_gameConfig);
    this.setSceneObjects();
  }

  public render() {
    this.animate();
  }

  public setSceneObjects(): void {
    this._world.surface = new EndingSurroundings.DefaultSurface();
    const directionalLight = EngineLights.BasicLights.getDirectionalLight({ axes: { x: 10, y: 10, z: 10 }});
    const light = EngineLights.BasicLights.getPointLight({ axes: { x: 10, y: 10, z: 10 }});
    const sky = new EngineShapes.DomeShape();
    const ambientLight = EngineLights.BasicLights.getAmbientLight();
    this._probe = new EngineUnits.ProbeUnit({ engineController: this._controller });
    this._camera.setConfig({ controller: this._controller });
    this._controller.mouseController.setConfig({ canvas: this._renderer.domElement });

    this._scene.addItemsToScene([
      this._probe.mesh,
      this._world.surface.mesh,
      directionalLight,
      light,
      sky,
      ambientLight,
    ]);
  }

  private animate(): void {
    requestAnimationFrame(this._animate);
    TWEEN.update();
    this._probe.updateByAnimation()
    this._camera.updateByAnimation();
    this._renderer.render(this._scene, this._camera);
  }

  private setCamera(_gameConfig: GameConfig): void {
    this._camera = new EngineCameras.DefaultCamera({
      height:_gameConfig.canvasHeight,
      width: _gameConfig.canvasWidth,
    });
  }

  private setRenderer(_gameConfig: GameConfig): void {
    this._renderer = new EngineRenderer(_gameConfig);
  }

  private setController(_gameConfig: GameConfig): void {
    this._controller = new EngineController();
  }
}