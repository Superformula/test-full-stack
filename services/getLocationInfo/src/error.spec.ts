import { ErrorFactory, ERROR_TYPE, ErrorObject } from './error';
import { AppSyncEvent } from './event';

describe('ErrorFactory', () => {
  it('should have a create static method', () => {
    expect(ErrorFactory.create).toEqual(expect.any(Function));
  });
});

describe('create', () => {
  beforeAll(() => {
    process.env.environment = 'test env';
  });
  afterAll(() => {
    delete process.env.environment;
  });
  it('should return an error object instance', () => {
    const message = new Error('some error').message;
    const event = { arguments: { data: 'value' } } as AppSyncEvent;
    const err = ErrorFactory.create(message, event, ERROR_TYPE.WARN);
    expect(err).toEqual({
      type: ERROR_TYPE.WARN,
      message,
      event,
      environment: 'test env',
      service: 'getLocationInfoService'
    } as ErrorObject);
  });
});