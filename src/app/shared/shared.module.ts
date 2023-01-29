import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  LayoutComponent,
  NavbarComponent,
  FooterComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [...sharedComponents],
  exports: [...sharedComponents]
})
export class SharedModule { }
