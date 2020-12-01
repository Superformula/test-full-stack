
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/data/model/user';
import { Location } from 'src/app/data/model/location';
import { PageInput } from 'src/app/data/enum/query-input.enum';
import { UsersService } from 'src/app/core/users/services/users.service';
import { LocationService } from 'src/app/core/location/services/location.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public location: Location;

  // Page controls
  public showDialog = false;
  public loading = true;
  public currentPage = 1;
  public loadMoreDisabled = false;
  private subscriptions: Subscription[] = [];
  public nameSearchControl = new FormControl();

  public activeUser: User;
  public users: User[];
  public userForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initializeForm();
    this.initializeSearch();

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
          this.location = await this.locationService.getLocationByAddress(address);
        }
      });

    this.subscriptions.push(addressSearchSubscription);
  }

  private handleQueryParams(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.createUser) { this.createMockUsersInDynamo(); }

        this.loading = true;

        if (params.page) { this.currentPage = params.page; }
        else {
          this.loadMoreDisabled = false;
          this.currentPage = 1;
        }

        this.listUsers(true);
      });
  }

  private async initializeSearch(): Promise<void> {
    const nameSearchSubscription = this.nameSearchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe(name => {
        this.loading = true;

        if (!name) {
          this.listUsers();
          return;
        }

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
    const newParams: Params = { page: ++this.currentPage };

    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: newParams,
        queryParamsHandling: 'merge',
      });
  }

  public async listUsers(listByParams = false): Promise<void> {
    await this.usersService.listUsers({ page: this.currentPage });

    if (this.currentPage > 1 && listByParams) {
      this.loadMoreDisabled = this.users.length < (this.currentPage * PageInput.LIMIT);

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    }
  }

  private async getUsers(): Promise<void> {
    this.listUsers();

    this.usersService.getUsers()
      .subscribe(users => {
        if (users === null) { return; }

        this.users = users;
        this.loading = false;
      });
  }

  public async updateUser(): Promise<void> {
    this.loading = true;

    await this.usersService.updateUser({ ...this.activeUser, ...this.userForm.value, });
    await this.usersService.listUsers({ page: this.currentPage, refetch: true });

    this.nameSearchControl.reset();

    this.loading = false;
  }

  private async applyEditValues(user: User): Promise<void> {
    this.location = null;

    this.userForm.patchValue({
      name: user.name,
      address: user.address,
      description: user.description
    });

    this.location = await this.locationService.getLocationByAddress(user.address);
  }

  public createMockUsersInDynamo(): void {
    this.usersService.createUser();
  }
}
