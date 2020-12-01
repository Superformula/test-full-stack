import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { FormModule } from 'src/app/common/modules/form.module';
import { DialogModule } from '../../components/dialog/dialog.module'
import { SearchUserModule } from '../../components/users/search-user/search-user.module';
import { EditUserModule } from '../../components/users/edit-user/edit-user.module';

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

    // User
    SearchUserModule,
    EditUserModule,

    FormModule,
    DialogModule
  ],
  declarations: [UsersComponent],
})
export class UsersModule { }
