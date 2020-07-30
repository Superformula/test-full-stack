/**
 * BaseException class.
 */
export default class BaseException extends Error {
  code: number;
  data: any;

  /**
   * Constructor.
   * @param {string} msg
   * @param {number} code
   * @param {any} data
   */
  constructor(msg: string = '', code: number = 0, data: any = null) {
    super(msg);
    this.code = code;
    this.data = data;
  }
}
