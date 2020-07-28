import { LocalDate } from '@js-joda/core';

export interface UserModel {
  id: string;
  name: string;
  dob: LocalDate;
  address: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
