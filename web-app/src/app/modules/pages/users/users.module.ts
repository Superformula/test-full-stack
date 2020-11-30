import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { UsersComponent } from './users.component';
import { FormModule } from 'src/app/common/modules/form.module';
import { DialogModule } from '../../components/dialog/dialog.module';
import { environment } from 'src/environments/environment';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API
    }),

    FormModule,
    DialogModule
  ],
  declarations: [UsersComponent],
})
export class UsersModule { }
