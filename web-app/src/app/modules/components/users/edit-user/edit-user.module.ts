import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { EditUserComponent } from './edit-user.component';
import { environment } from 'src/environments/environment';
import { FormModule } from 'src/app/common/modules/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,

    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API
    }),
  ],
  exports: [EditUserComponent],
  declarations: [EditUserComponent],
})
export class EditUserModule { }
