
import { Subject } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { defaultNavigation } from 'src/app/layout/navigation';

@Component({
  selector: 'basic-layout',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicLayoutComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  public menuItems = defaultNavigation;

  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
