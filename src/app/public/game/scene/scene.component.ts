import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements AfterViewInit {
  public scene: Scene = new Scene();
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  ngAfterViewInit() {
    const { clientWidth, clientHeight } = this.canvasContainer.nativeElement;
    this.canvas.nativeElement.setAttribute('height', clientHeight);
    this.canvas.nativeElement.setAttribute('width', clientWidth);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
    });
    renderer.setSize(clientWidth, clientHeight);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    camera.position.z = 5;
    renderer.render(scene, camera);
  }
}
