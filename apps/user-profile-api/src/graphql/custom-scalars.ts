import { DateTimeFormatter, LocalDate } from '@js-joda/core';
import { GraphQLScalarType, Kind } from 'graphql';
import { createContextLogger } from '../logging/logger';
import { localDateStringToLocalDate } from '../util/temporal-util';

const log = createContextLogger({ appModule: 'LocalDateScalar' });

export const LocalDateScalar = new GraphQLScalarType({
  name: 'LocalDate',
  description: 'Time-less local date in ISO 8601 format',
  parseValue(value: string) {
    try {
      return localDateStringToLocalDate(value);
    } catch (e) {
      log.error(`Error parsing local date value ${value} to LocalDate`, e);
      throw e;
    }
  },
  serialize(value: LocalDate) {
    try {
      return value.format(DateTimeFormatter.ISO_LOCAL_DATE);
    } catch (e) {
      log.error(`Error converting local date value to formatted ISO date`, e);
      throw e;
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return localDateStringToLocalDate(ast.value);
      } catch (e) {
        log.error(`Error parsing literal local date value ${ast.value} to LocalDate`, e);
        throw e;
      }
    }
    return null;
  },
});
