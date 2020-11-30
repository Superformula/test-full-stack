import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/** Interface for object which can store both:
 * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
 * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
 */
interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot;
  handle: DetachedRouteHandle;
}

@Injectable()
export class ReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};
  private rejectedRoutes: string[] = ['login', 'register'];

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const routeKey = this.getKey(route);

    if (this.rejectedRoutes.some(p => p === routeKey)) {
      return;
    }

    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routeKey = this.getKey(route);

    if (this.rejectedRoutes.some(p => p === routeKey || handle === null)) {
      return;
    }

    this.handlers[routeKey] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routeKey = this.getKey(route);

    return !!route.routeConfig && !!this.handlers[routeKey];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }

    const routeKey = this.getKey(route);

    return this.handlers[routeKey];
  }

  shouldReuseRoute(curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  private getKey(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((el: ActivatedRouteSnapshot) => el.routeConfig ? el.routeConfig.path : '')
      .filter(str => str.length > 0)
      .join('');
  }
}
