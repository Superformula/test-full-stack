import BaseException from './base.exception';

/**
 * ServiceException class.
 */
export default class ServiceException extends BaseException {
  /**
   *
   * @param {string} msg
   * @param {any} data
   */
  constructor(msg: string, data: any = null) {
    super(msg, 500, data);
  }
}
