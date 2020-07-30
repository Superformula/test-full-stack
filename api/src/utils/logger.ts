import * as Pino from 'pino';
import Config from '../config';
import { ILoggerConfig } from '../interfaces';
import { merge } from 'lodash';

export class Logger {
  protected log: Pino.Logger;

  constructor(config?: ILoggerConfig) {
    this.log = Pino(merge({}, Config.log, config));
  }

  trace(obj: any, msg: string) {
    this.log.trace(obj, msg);
  }
  debug(obj: any, msg: string) {
    this.log.debug(obj, msg);
  }
  info(obj: any, msg: string) {
    this.log.info(obj, msg);
  }
  warn(obj: any, msg: string) {
    this.log.warn(obj, msg);
  }
  error(obj: any, msg: string) {
    this.log.error(obj, msg);
  }
  fatal(obj: any, msg: string) {
    this.log.fatal(obj, msg);
  }
}
