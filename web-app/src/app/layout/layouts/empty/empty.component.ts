import { Subject } from 'rxjs';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmptyLayoutComponent implements OnDestroy {
  private unsubscribeAll: Subject<any>;

  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
