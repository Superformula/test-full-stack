import { AxiosResponse } from 'axios';
import { ErrorCode } from './Enum';
import errors from '../errors';
import { IMapBoxErrorResponse } from '../interfaces';

export { Logger } from './logger';

export const handleMapBoxException = (
  response: AxiosResponse<IMapBoxErrorResponse>,
) => {
  if (response) {
    const errorMessage = response.data.message;
    if (response.status === ErrorCode.NOT_AUTHORIZED) {
      return errors.notAuthorized(
        errorMessage || 'Request not authorized',
        response,
      );
    }
    if (response.status === ErrorCode.FORBIDDEN) {
      return errors.forbidden(errorMessage || 'Request forbidden', response);
    }
    if (response.status === ErrorCode.NOT_FOUND) {
      return errors.notFound(errorMessage || 'Not Found error', response);
    }
    if (response.status === ErrorCode.UNPROCESSABLE) {
      return errors.unprocessable(
        errorMessage || 'Request unprocessable',
        response,
      );
    }
    return errors.badRequest('Bad request error', response);
  }
};
