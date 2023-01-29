import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./public/home/home.module').then(m => m.HomeModule)},
  { path: 'game', loadChildren: () => import('./public/game/game.module').then(m => m.GameModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
