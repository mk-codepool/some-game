import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { store, devTools } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    store,
    devTools
  ],
  exports: []
})
export class AppStoreModule { }
