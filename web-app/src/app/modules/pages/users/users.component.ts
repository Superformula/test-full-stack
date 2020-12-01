
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Location, LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/data/model/user';
import { GeoLocation } from 'src/app/data/model/geo-location';
import { PageInput } from 'src/app/data/enum/query-input.enum';
import { UsersService } from 'src/app/core/users/services/users.service';
import { LocationService } from 'src/app/core/location/services/location.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public geoLocation: GeoLocation;

  // Page controls
  // Loader of the entire page, used when we need to fetch data
  public isLoadingData = true;
  // Loader of the button "LOAD MORE"
  public isLoadingButton = false;
  // Show/hide the button "LOAD MORE"
  public hideLoadingMoreButton = true;

  public showDialog = false;
  public loadMoreDisabled = false;
  private subscriptions: Subscription[] = [];

  // Query params context
  private queryParamPage: Params = { page: 1 };
  private queryParamName: Params = { name: '' };

  public activeUser: User;
  public users: User[];
  public userForm: FormGroup;
  public nameSearchControl = new FormControl();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private usersService: UsersService,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initializeForm();
    this.watchSearch();
    this.handleQueryParams();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder
      .group(
        {
          name: [null, Validators.required],
          address: [null, Validators.required],
          description: [null, Validators.required],
        }
      );

    // Watch for address change
    const addressSearchSubscription = this.userForm.get('address')
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async address => {
        if (address) {
          this.geoLocation = await this.locationService.getLocationByAddress(address);
        }
      });

    this.subscriptions.push(addressSearchSubscription);
  }

  private handleQueryParams(): void {
    this.activatedRoute.queryParams
      .subscribe(async params => {
        if (params.createUser) {
          this.createMockUsersInDynamo();
          return;
        }

        this.isLoadingData = true;

        if (params.page) {
          this.queryParamPage = { page: params.page };
          await this.usersService.listUsers({ page: params.page });
        }
        else if (params.name) {
          this.nameSearchControl.setValue(params.name);
        }
        else {
          await this.usersService.listUsers({});
        }
      });
  }

  private async watchSearch(): Promise<void> {
    const nameSearchSubscription = this.nameSearchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe(name => {
        this.isLoadingData = true;
        this.hideLoadingMoreButton = false;

        if (!name) {
          // Empty search, recall search with current query context for page;
          this.queryParamName.name = null;
          this.hideLoadingMoreButton = true;
          this.updateQueryParams(this.queryParamName);
          if (this.queryParamPage.page > 0) { this.updateQueryParams(this.queryParamPage); }

          this.usersService.listUsers({ page: this.queryParamPage.page });
          return;
        }

        this.queryParamName.name = name;
        this.updateQueryParams(this.queryParamName);

        this.usersService.findUserByName(name);
      });

    this.subscriptions.push(nameSearchSubscription);
  }

  public openEditModal(user: User): void {
    this.showDialog = true;
    this.applyEditValues(user);
    this.activeUser = user;
  }

  public loadMore(): void {
    this.isLoadingButton = true;

    ++this.queryParamPage.page;
    this.updateQueryParams(this.queryParamPage);

    this.location.replaceState(
      this.router.createUrlTree(
        [this.locationStrategy.path().split('?')[0]],
        { queryParams: this.queryParamPage }
      ).toString()
    );

    this.usersService.listUsers({ page: this.queryParamPage.page });
  }

  private async getUsers(): Promise<void> {
    this.usersService.getUsers()
      .subscribe(users => {
        if (users == null) { return; }

        if (this.queryParamPage.page > 1) { this.loadMoreDisabled = users.length < (this.queryParamPage.page * PageInput.LIMIT); }

        this.users = users;
        this.isLoadingData = false;
        this.isLoadingButton = false;
      });
  }

  public async updateUser(): Promise<void> {
    this.isLoadingData = true;
    this.hideLoadingMoreButton = false;

    await this.usersService.updateUser({ ...this.activeUser, ...this.userForm.value, });
    await this.usersService.listUsers({ page: this.queryParamPage.page, refetch: true });

    this.isLoadingData = false;
    this.hideLoadingMoreButton = true;
  }

  private async applyEditValues(user: User): Promise<void> {
    this.geoLocation = null;

    this.userForm.patchValue({
      name: user.name,
      address: user.address,
      description: user.description
    });

    this.geoLocation = await this.locationService.getLocationByAddress(user.address);
  }

  private updateQueryParams(newParams: Params): void {
    this.location.replaceState(
      this.router.createUrlTree(
        [this.locationStrategy.path().split('?')[0]],
        { queryParams: newParams }
      ).toString()
    );
  }

  public createMockUsersInDynamo(): void {
    this.usersService.createUser();
  }
}
