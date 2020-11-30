import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class HttpCacheService {
  private requests: any = {};

  constructor() { }

  public put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  public get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  public invalidateCache(): void {
    this.requests = {};
  }
}
