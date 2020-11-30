import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Layout } from './layout.types';
import { LayoutService } from '../core/layout/services/layout.service';
import { LayoutConfig, Theme } from '../core/layout/config/layout.config';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy{
  config: LayoutConfig;
  layout: Layout;
  theme: Theme;

  private unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.layoutService.config$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config: LayoutConfig) => {
        this.config = config;
        this.theme = config.theme;

        // const themeName = 'id-theme-' + config.theme;
        // this.document.body.classList.forEach((className) => {
        //   if (className.startsWith('id-theme-') && className !== themeName) {
        //     this.document.body.classList.remove(className);
        //     this.document.body.classList.add(themeName);
        //     return;
        //   }
        // });

        // Update the layout
        this.updateLayout();
      });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.updateLayout();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private updateLayout(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // 1. Set the layout from the config
    this.layout = this.config.layout;

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = (route.snapshot.queryParamMap.get('layout') as Layout);
    if (layoutFromQueryParam) {
      this.config.layout = this.layout = layoutFromQueryParam;
    }

    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout) {
        // Set the layout
        this.layout = path.routeConfig.data.layout;
      }
    });
  }

  public setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this.router.navigate([], {
      queryParams: {
        layout: null
      },
      queryParamsHandling: 'merge'
    }).then(() => {
      // Set the config
      this.layoutService.config = { layout };
    });
  }

  public setTheme(theme: string): void {
    this.layoutService.config = { theme: 'light' };
    // this.layoutService.config = { theme: change.checked ? 'dark' : 'light' };
  }
}
