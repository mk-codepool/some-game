import * as THREE from "three";
import { Axes } from "../interfaces";
import { EngineMaterials } from "../materials";

interface BasicShapeConfig {
  axes: Axes
}

const axes: Axes = {
  x: 0,
  y: 0,
  z: 0
}

export class BasicShapes {
  public static getBasicBox(basicShapeConfig: BasicShapeConfig = { axes }): THREE.Mesh {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(cubeGeometry, EngineMaterials.standardMaterial);

    cube.receiveShadow = true;
    cube.castShadow = true;
    cube.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return cube;
  }

  public static getBasicSphere(basicShapeConfig: BasicShapeConfig = { axes }): THREE.Mesh {
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const sphere = new THREE.Mesh(sphereGeometry, EngineMaterials.standardMaterial);

    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return sphere;
  }

  public static getBasicSurface(basicShapeConfig: BasicShapeConfig = { axes }): THREE.Mesh {
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100);
    const plane = new THREE.Mesh(planeGeometry, EngineMaterials.standardMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    return plane;
  }
}