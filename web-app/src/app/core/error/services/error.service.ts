import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ErrorService {
  constructor(
    private zone: NgZone) { }

  public openErrorMessage(): void {
    this.zone.run(() => {
      // TODO: this is where we could implement a generic error notification
    });
  }
}
