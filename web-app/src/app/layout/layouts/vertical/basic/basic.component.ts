
import { Subject } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'basic-layout',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicLayoutComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;

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
