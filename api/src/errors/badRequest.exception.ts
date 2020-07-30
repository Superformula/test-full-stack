import BaseException from './base.exception';

/**
 * NotFoundException class.
 */
export default class BadRequestException extends BaseException {
  /**
   *
   * @param {string} msg
   * @param {any} data
   */
  constructor(msg: string, code: number = 400, data: any = null) {
    super(msg, code, data);
  }
}
