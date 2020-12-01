
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Location, LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/data/model/user';
import { GeoLocation } from 'src/app/data/model/geo-location';
import { PageInput } from 'src/app/data/enum/query-input.enum';
import { UsersQueryService } from 'src/app/core/users/services/users-query.service';
import { LocationService } from 'src/app/core/location/services/location.service';
import { UsersService } from 'src/app/core/users/services/users.service';
import { UsersEditService } from 'src/app/core/users/services/users-edit.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public loadMoreDisabled = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private locationService: LocationService,
    public usersService: UsersService,
    public usersEditService: UsersEditService,
    private usersQueryService: UsersQueryService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.handleQueryParams();
  }

  private handleQueryParams(): void {
    this.activatedRoute.queryParams
      .subscribe(async params => {
        if (params.createUser) {
          this.createMockUsersInDynamo();
          return;
        }

        this.usersService.isLoadingData = true;

        if (!params.name && !params.page) {
          await this.usersQueryService.listUsers({});
        }
        else if (params.page) {
          this.usersService.queryParamPage = { page: params.page };
          await this.usersQueryService.listUsers({ page: params.page });
        }
      });
  }

  public openEditModal(user: User): void {
    this.usersEditService.showDialog = true;
    this.usersEditService.activeUser = user;
    this.applyEditValues(user);
  }

  public async loadMore(): Promise<void> {
    this.usersService.isLoadingButton = true;

    ++this.usersService.queryParamPage.page;
    this.usersService.updateQueryParams(this.usersService.queryParamPage);

    this.location.replaceState(
      this.router.createUrlTree(
        [this.locationStrategy.path().split('?')[0]],
        { queryParams: this.usersService.queryParamPage }
      ).toString()
    );

    await this.usersQueryService.listUsers({ page: this.usersService.queryParamPage.page });

    // Smooth scroll to bottom
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  private async getUsers(): Promise<void> {
    this.usersQueryService.getUsers()
      .subscribe(users => {
        if (users == null) { return; }

        if (this.usersService.queryParamPage.page > 1) {
          this.loadMoreDisabled = users.length < (this.usersService.queryParamPage.page * PageInput.LIMIT);
        }

        this.usersService.users = users;
        this.usersService.isLoadingData = false;
        this.usersService.isLoadingButton = false;
      });
  }

  private async applyEditValues(user: User): Promise<void> {
    this.usersEditService.geoLocation = null;

    this.usersEditService.userForm.patchValue({
      name: user.name,
      address: user.address,
      description: user.description
    });

    this.usersEditService.geoLocation = await this.locationService.getLocationByAddress(user.address);
  }

  public createMockUsersInDynamo(): void {
    this.usersQueryService.createUser();
  }
}
