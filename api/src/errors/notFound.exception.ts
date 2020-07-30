import BadRequestException from './badRequest.exception';

/**
 * NotFoundException class.
 */
export default class NotFoundException extends BadRequestException {
  /**
   *
   * @param {string} msg
   * @param {any} data
   */
  constructor(msg: string, data: any = null) {
    super(msg, 404, data);
  }
}
