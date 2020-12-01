import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchUserComponent } from './search-user.component';
import { FormModule } from 'src/app/common/modules/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule
  ],
  exports: [SearchUserComponent],
  declarations: [SearchUserComponent],
})
export class SearchUserModule { }
