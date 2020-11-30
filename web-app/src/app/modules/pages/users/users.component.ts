
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/data/model/user';
import { PageInput } from 'src/app/data/enum/query-input.enum';
import { UsersService } from 'src/app/core/users/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  lat = -23.8779431;
  lng = -49.8046873;

  // Page controls
  public showDialog = false;
  public loading = true;
  public currentPage = 1;
  public loadMoreDisabled = false;
  private subscription: Subscription;
  public nameSearchControl = new FormControl();

  public activeUser: User;
  public users: User[];
  public userForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    this.initializeForm();
    this.initializeSearch();

    this.handleQueryParams();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.subscription = this.nameSearchControl
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
  }

  public openEditModal(user: User): void {
    this.showDialog = true;
    this.applyFormValue(user);
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

  private applyFormValue(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      address: user.address,
      description: user.description
    });
  }

  public createMockUsersInDynamo(): void {
    this.usersService.createUser();
  }
}
