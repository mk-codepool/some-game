import * as THREE from "three";
import { GameConfig } from ".";

export class EngineRenderer extends THREE.WebGLRenderer {
  constructor(gameConfig: GameConfig) {
    super({
      canvas: gameConfig.canvasElement,
    });
    this.setSize(gameConfig.canvasWidth, gameConfig.canvasHeight);
    this.shadowMap.enabled = true;
  }
}