import { Route } from '@angular/router';
// import { LayoutComponent } from './layout/layout.component';

import { BasicLayoutComponent } from './layout/layouts/vertical/basic/basic.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
  // Redirect empty path to '/home'
  // Redirect signed in user to the '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // No auth routes
  // {
  //   path: '',
  //   component: EmptyLayoutComponent,
  //   children: [
  //     {
  //       path: 'login', loadChildren: () => import('../app/modules/pages/auth/login/login.module').then(m => m.LoginModule), data: { title: 'Login' },
  //       // canActivate: [ProfileNotCreatedGuard]
  //     },
  //   ]
  // },
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: 'home', loadChildren: () => import('../app/modules/pages/users/users.module').then(m => m.UsersModule), data: { title: 'Users' },
      },

      // 404 & Catch all
      // {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/errors/error-404/error-404.module').then(m => m.Error404Module)},
      // {path: '**', redirectTo: '404-not-found'}
    ],
    // canActivate: [AuthGuard, ProfileGuard]
  }
];
