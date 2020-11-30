import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { BasicLayoutModule } from './layouts/vertical/basic/basic.module';
import { CommonModule } from '@angular/common';

const modules = [
  // Empty
  EmptyLayoutModule,

  // Vertical navigation
  BasicLayoutModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ],
  declarations: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
