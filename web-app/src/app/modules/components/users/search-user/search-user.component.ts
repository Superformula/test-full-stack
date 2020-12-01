import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from 'src/app/core/users/services/users.service';
import { UsersQueryService } from 'src/app/core/users/services/users-query.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  public nameSearchControl = new FormControl();
  private subscription: Subscription;

  constructor(
    private userService: UsersService,
    private usersQueryService: UsersQueryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.watchSearch();

    this.activatedRoute.queryParams
      .subscribe(async params => {
        if (params.name) {
          this.nameSearchControl.setValue(params.name);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async watchSearch(): Promise<void> {
    this.subscription = this.nameSearchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe(name => {
        this.userService.isLoadingData = true;
        this.userService.hideLoadingMoreButton = false;

        if (!name) {
          // Empty search, recall search with current query context for page;
          this.userService.queryParamName.name = null;
          this.userService.hideLoadingMoreButton = true;
          this.userService.updateQueryParams(this.userService.queryParamName);
          if (this.userService.queryParamPage.page > 0) { this.userService.updateQueryParams(this.userService.queryParamPage); }

          this.usersQueryService.listUsers({ page: this.userService.queryParamPage.page });
          return;
        }

        this.userService.queryParamName.name = name;
        this.userService.updateQueryParams(this.userService.queryParamName);

        this.usersQueryService.findUserByName(name);
      });
  }
}
