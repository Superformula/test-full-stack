
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/data/model/user';

import { GeoLocation } from 'src/app/data/model/geo-location';

@Injectable()
export class UsersEditService {
  public activeUser: User;

  public geoLocation: GeoLocation;
  public userForm: FormGroup;
  public showDialog = false;
}
