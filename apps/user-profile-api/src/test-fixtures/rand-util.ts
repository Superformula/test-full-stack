import * as f from 'factory.ts';
import * as faker from 'faker';
import { v4 as uuidV4 } from 'uuid';
import { LocalDate, ZonedDateTime } from '@js-joda/core';
import { zonedDateTimeToDate } from '../util/temporal-util';

export const randNameGen = (): f.Sync.Generator<string> => f.each(() => `${faker.name.firstName()} ${faker.name.lastName()}`);

export const uuidGen = (): f.Sync.Generator<string> => f.each(() => uuidV4());

export const randAddressGen = (): f.Sync.Generator<string> => f.each(() => faker.address.streetAddress(true));

export const randAlphaGen = (count = 10): f.Sync.Generator<string> => f.each(() => faker.lorem.sentence(count));

export const randPastTimestampGen = (maxYearsInPast = 1, minYearsInPast = 0): f.Sync.Generator<Date> =>
  f.each(() =>
    zonedDateTimeToDate(
      ZonedDateTime.now()
        .minusSeconds(Math.round(Math.random() * 24 * 60 * 60))
        .minusDays(Math.round(Math.max(365 * minYearsInPast, Math.random() * 365 * maxYearsInPast)))
    )
  );

export const randPastLocalDateGen = (maxYearsInPast = 1, minYearsInPast = 0): f.Sync.Generator<LocalDate> =>
  f.each(() => LocalDate.now().minusDays(Math.round(Math.max(365 * minYearsInPast, Math.random() * 365 * maxYearsInPast))));
