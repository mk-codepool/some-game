import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { SceneComponent } from './scene/scene.component';

const routes: Routes = [
  { path: '', component: GameComponent, data: { preload: true } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GameComponent,
    SceneComponent
  ]
})
export class GameModule { }
