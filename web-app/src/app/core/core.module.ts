import { RouteReuseStrategy } from '@angular/router';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ErrorManager } from './error/error';
import { ErrorService } from './error/services/error.service';
import { UsersService } from './users/services/users.service';
import { UsersQueryService } from './users/services/users-query.service';
import { ReuseStrategy } from './cache/reuse-strategy/reuse-strategy';
import { LocationService } from './location/services/location.service';
import { HttpErrorInterceptor } from './error/interceptors/http-error.interceptor';
import { UsersEditService } from './users/services/users-edit.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ErrorService,

    UsersService,
    UsersEditService,
    UsersQueryService,
    LocationService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorManager
    },
    {
      provide: RouteReuseStrategy,
      useClass: ReuseStrategy
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
