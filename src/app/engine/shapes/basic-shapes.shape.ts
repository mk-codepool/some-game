import * as THREE from "three";
import { AXES } from "../basics/basic-scene-object.basic";
import { BasicShapeConfig } from "../interfaces.engine";
import { EngineMaterials } from "../materials";

export class BasicShapes {
  public static getBasicBox(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.Mesh {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(cubeGeometry, EngineMaterials.standardMaterial);

    cube.receiveShadow = true;
    cube.castShadow = true;
    cube.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return cube;
  }

  public static getBasicSphere(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.Mesh {
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const sphere = new THREE.Mesh(sphereGeometry, EngineMaterials.standardMaterial);

    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return sphere;
  }

  public static getBasicSurface(basicShapeConfig: BasicShapeConfig = { axes: AXES }): THREE.Mesh {
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
    const plane = new THREE.Mesh(planeGeometry, EngineMaterials.standardMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return plane;
  }
}