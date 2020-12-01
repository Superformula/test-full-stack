
import { Injectable } from '@angular/core';

import { User } from 'src/app/data/model/user';
import { Params, Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';

@Injectable()
export class UsersService {
  public users: User[];

  // Page controls
  // Loader of the entire page, used when we need to fetch data
  public isLoadingData = true;
  // Loader of the button "LOAD MORE"
  public isLoadingButton = false;
  // Show/hide the button "LOAD MORE"
  public hideLoadingMoreButton = true;

  // Query params context
  public queryParamPage: Params = { page: 1 };
  public queryParamName: Params = { name: '' };

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private router: Router
  ) { }

  public updateQueryParams(newParams: Params): void {
    this.location.replaceState(
      this.router.createUrlTree(
        [this.locationStrategy.path().split('?')[0]],
        { queryParams: newParams }
      ).toString()
    );
  }
}
