import ServiceException from './service.exception';
import NotFoundException from './notFound.exception';
import UnprocessableException from './unprocessable.exception';
import ForbiddenException from './forbidden.exception';
import NotAuthorizedException from './notAuthorized.exception';
import BadRequestException from './badRequest.exception';

export default {
  service: (msg: string, data: any = null) => new ServiceException(msg, data),
  notFound: (msg: string, data: any = null) => new NotFoundException(msg, data),
  unprocessable: (msg: string, data: any = null) =>
    new UnprocessableException(msg, data),
  forbidden: (msg: string, data: any = null) =>
    new ForbiddenException(msg, data),
  notAuthorized: (msg: string, data: any = null) =>
    new NotAuthorizedException(msg, data),
  badRequest: (msg: string, data: any = null) =>
    new BadRequestException(msg, 400, data),

  isService: (err: any) => err instanceof ServiceException,
  isBadRequest: (err: any) => err instanceof BadRequestException,
};
