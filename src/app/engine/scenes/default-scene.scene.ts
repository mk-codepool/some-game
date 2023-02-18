import * as THREE from "three";
import { Axes } from "../interfaces.engine";

export const AXES: Axes = {
  x: 0,
  y: 0,
  z: 0
}

export class DefaultScene extends THREE.Scene{
  constructor() {
    super();
    this.fog = new THREE.Fog( 0xffffff, 20, 60);
  }

  public addItemsToScene(items: any[]): void {
    items.forEach((item) => this.add(item));
  }
}