import * as _ from 'lodash';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LAYOUT_CONFIG } from '../constants/layout.constants';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private internal$: BehaviorSubject<any>;

  constructor(@Inject(LAYOUT_CONFIG) config: any) {
    this.internal$ = new BehaviorSubject(config);
  }

  set config(value: any) {
    const config = _.merge({}, this.internal$.getValue(), value);
    this.internal$.next(config);
  }

  get config$(): Observable<any> {
    return this.internal$.asObservable();
  }

  reset(): void {
    this.internal$.next(this.config);
  }
}
