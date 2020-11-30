import { ModuleWithProviders, NgModule } from '@angular/core';

import { LayoutService } from './layout.service';
import { LAYOUT_CONFIG } from '../constants/layout.constants';

@NgModule()
export class LayoutServiceModule {
  constructor(private layoutService: LayoutService) { }

  static forRoot(config: any): ModuleWithProviders<LayoutServiceModule> {
    return {
      ngModule: LayoutServiceModule,
      providers: [
        {
          provide: LAYOUT_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
