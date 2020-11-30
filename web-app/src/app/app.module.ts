import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExtraOptions, NoPreloading, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { appRoutes } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { appConfig } from './core/layout/config/layout.config';
import { LayoutServiceModule } from './core/layout/services/layout.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: NoPreloading,
  useHash: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Core
    CoreModule,

    // Layout
    LayoutServiceModule.forRoot(appConfig),
    LayoutModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
