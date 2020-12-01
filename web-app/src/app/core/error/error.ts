import * as Sentry from '@sentry/browser';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { environment } from '../../../environments/environment';

Sentry.init({
  dsn: "https://2041093e66b8441997a2dc50b5a66ebc@o485348.ingest.sentry.io/5540575",
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
