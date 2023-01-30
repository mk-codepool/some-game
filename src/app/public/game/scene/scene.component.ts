import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Phaser from 'phaser';
import { MainScene } from 'src/app/engine/game';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements AfterViewInit {
  public phaserGame!: Phaser.Game;
  
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;

  public ngAfterViewInit() {
    const gameConfig: Phaser.Types.Core.GameConfig = this.getGameConfig();
    this.phaserGame = new Phaser.Game(gameConfig);
  }

  private getGameConfig(): Phaser.Types.Core.GameConfig {
    const element = this.gameContainer.nativeElement;
    
    return {
      type: Phaser.AUTO,
      height: element.offsetHeight - 1,
      width: element.offsetWidth,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      }
    };
  }
}
