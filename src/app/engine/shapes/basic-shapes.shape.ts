import * as THREE from "three";
import { AXES } from "../scenes/default-scene.scene";
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
    // texture
    const textureRepeatFactor = 300;
    const textureLoader = new THREE.TextureLoader();
    const texturePathName = 'ground-flat-rocks';
    const map = textureLoader.load(`../../../assets/game-engine/textures/${texturePathName}/map.jpg`);
    const normalMap = textureLoader.load(`../../../assets/game-engine/textures/${texturePathName}/normal.png`);
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(textureRepeatFactor, textureRepeatFactor);
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(textureRepeatFactor, textureRepeatFactor);
    // material
    const material = new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(3, 3),
      emissive: 0x66461a,
      emissiveIntensity: 0.5,
      metalness: 0.5,
      roughness: 0.5,
    });
    // geometry
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, textureRepeatFactor);
    planeGeometry.computeVertexNormals();
    // mesh
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(basicShapeConfig.axes.x, basicShapeConfig.axes.y, basicShapeConfig.axes.z);

    // return
    return plane;
  }
}