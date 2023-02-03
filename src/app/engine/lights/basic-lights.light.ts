import * as THREE from "three";
import { AXES, BasicSceneObject } from "../basics/basic-scene-object.basic";
import { BasicShapeConfig } from "../interfaces";

export class BasicLights extends BasicSceneObject {
  public static getDirectionalLight(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.DirectionalLight {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.radius = 8;
    directionalLight.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return directionalLight;
  }

  public static getPointLight(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.PointLight {
    const light = new THREE.PointLight(0xffffff, 0.5);
    light.castShadow = true;
    light.shadow.radius = 8;
    light.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return light;
  }
}