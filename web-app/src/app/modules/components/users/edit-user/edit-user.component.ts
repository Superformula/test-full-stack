import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UsersService } from 'src/app/core/users/services/users.service';
import { UsersEditService } from 'src/app/core/users/services/users-edit.service';
import { UsersQueryService } from 'src/app/core/users/services/users-query.service';
import { LocationService } from 'src/app/core/location/services/location.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public usersEditService: UsersEditService,
    private usersQueryService: UsersQueryService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.usersEditService.userForm = this.formBuilder
      .group(
        {
          name: [null, Validators.required],
          address: [null, Validators.required],
          description: [null, Validators.required],
        }
      );

    this.usersEditService.userForm.get('address')
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async address => {
        if (address) {
          this.usersEditService.geoLocation = await this.locationService.getLocationByAddress(address);
        }
      });
  }

  public async updateUser(): Promise<void> {
    this.usersService.isLoadingData = true;
    this.usersService.hideLoadingMoreButton = false;

    await this.usersQueryService.updateUser({ ...this.usersEditService.activeUser, ...this.usersEditService.userForm.value, });
    await this.usersQueryService.listUsers({ page: this.usersService.queryParamPage.page, refetch: true });

    this.usersService.isLoadingData = false;
    this.usersService.hideLoadingMoreButton = true;
  }
}
