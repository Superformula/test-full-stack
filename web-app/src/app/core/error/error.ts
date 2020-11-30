import * as Sentry from '@sentry/browser';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { environment } from '../../../environments/environment';

Sentry.init({
  dsn: 'https://a@sentry.io/1'
});

@Injectable()
export class ErrorManager implements ErrorHandler {
  constructor(private injector: Injector) { }

  async handleError(error): Promise<void> {
    if (environment.production) {
      Sentry.captureException(error.originalError || error);
    } else {
      console.error(error);
    }
  }
}
