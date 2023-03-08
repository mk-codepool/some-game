import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SomeGameEngine } from 'src/app/engine';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  public someGameEngine!: SomeGameEngine;

  ngAfterViewInit() {
    this.someGameEngine = new SomeGameEngine({
      canvasElement: this.canvas.nativeElement as HTMLElement,
      canvasHeight: this.canvasContainer.nativeElement.clientHeight,
      canvasWidth: this.canvasContainer.nativeElement.clientWidth
    });

    this.someGameEngine.render();
  }
}
