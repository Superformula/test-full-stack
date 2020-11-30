import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmptyLayoutComponent } from './empty.component';

@NgModule({
  declarations: [
    EmptyLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    EmptyLayoutComponent
  ]
})
export class EmptyLayoutModule {
}
