import * as THREE from "three";
import { AXES } from "../scenes/default-scene.scene";
import { BasicShapeConfig } from "../interfaces.engine";

export class BasicLights {
  public static getDirectionalLight(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.DirectionalLight {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.radius = 8;
    directionalLight.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return directionalLight;
  }

  public static getPointLight(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.PointLight {
    const light = new THREE.PointLight(0xffffff, 1);
    light.castShadow = true;
    light.shadow.radius = 8;
    light.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return light;
  }

  public static getAmbientLight(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.AmbientLight {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    ambientLight.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return ambientLight;
  }
}