import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { tap } from 'rxjs/internal/operators/tap';
import { HttpCacheService } from '../services/http-cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Pass along non-cacheable requests and invalidate cache
    // if (req.method !== 'POST') {
    //   this.cacheService.invalidateCache();
    //   return next.handle(req);
    // }

    const excludedUrls = [];
    if (excludedUrls.some(excluded => req.url.includes(excluded))) {
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheService.put(req.url, event);
          }
        })
      );
  }
}
