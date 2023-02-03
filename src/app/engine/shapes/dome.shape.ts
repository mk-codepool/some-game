import * as THREE from "three";

export class DomeShape extends THREE.Mesh {
  constructor() {
    const skyGeometry = new THREE.SphereGeometry(100, 100, 100);
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('../../../assets/blue-sky-texture.jpg'),
      side: THREE.BackSide,
    });
    super(skyGeometry, skyMaterial);
  }
}