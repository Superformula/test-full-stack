import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasicLayoutComponent } from './basic.component';
@NgModule({
  declarations: [
    BasicLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BasicLayoutComponent
  ]
})
export class BasicLayoutModule {
}
