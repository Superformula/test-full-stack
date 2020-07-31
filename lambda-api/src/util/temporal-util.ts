import { convert, LocalDate, ZonedDateTime, ZoneId } from '@js-joda/core';

export const localDateToDate = (localDate: LocalDate, zoneId: ZoneId = ZoneId.UTC): Date => {
  return convert(localDate, zoneId).toDate();
};

export const zonedDateTimeToDate = (zonedDateTime: ZonedDateTime, zoneId: ZoneId = ZoneId.UTC): Date => {
  return convert(zonedDateTime, zoneId).toDate();
};

export const localDateStringToLocalDate = (localDateISOString: string): LocalDate => {
  return LocalDate.parse(localDateISOString);
};
