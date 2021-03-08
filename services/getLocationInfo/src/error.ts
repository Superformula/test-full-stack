import { AppSyncEvent } from './event';

export enum ERROR_TYPE {
  ERROR = 'error',
  WARN = 'warning'
}

const service = 'getLocationInfoService';

export interface ErrorObject {
  message: string,
  event: AppSyncEvent,
  type: ERROR_TYPE,
  service: string,
  environment: string
}

export class ErrorFactory {
  static create(message: string, event: AppSyncEvent, type: ERROR_TYPE):ErrorObject {
    const environment = process.env.environment || 'development';
    return {
      message,
      event,
      type,
      service,
      environment
    };
  }
}