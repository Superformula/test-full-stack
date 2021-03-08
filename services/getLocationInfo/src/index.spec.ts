import { mocked } from 'ts-jest/utils';

import { handler, LocationService } from './index';
import { AppSyncEvent } from './event';
import { ErrorFactory, ERROR_TYPE } from './error';
import { LocationBasicData } from './location';

jest.mock('./MapBoxAPI');
jest.mock('./error');
const mockedLocationService = mocked(LocationService);

describe('handler', () => {
  let event:AppSyncEvent;
  let result:any;
  let mockLocationServiceData:LocationBasicData[];
  beforeAll(async () => {
    event = {
      arguments: {
        address: 'some address'
      }
    };
    mockLocationServiceData = [{ name: 'location0' }, { name: 'location1' }];
    mockedLocationService.getLocationData.mockResolvedValueOnce(mockLocationServiceData);
    result = await handler(event);
  });
  it('should attempt to pass address to location data service', () => {
    expect(mockedLocationService.getLocationData).toHaveBeenCalledWith(event.arguments.address);
  });
  it('should return data directly from location data service', () => {
    expect(result).toEqual(mockLocationServiceData);
  });
  describe('when location service throws an error', () => {
    beforeAll(async () => {
      mockedLocationService.getLocationData.mockImplementationOnce(() => Promise.reject(new Error('random error')));
      result = await handler(event);
    });
    it('should create new Error object', () => {
      expect(ErrorFactory.create).toHaveBeenCalledWith(new Error('random error'), event, ERROR_TYPE.ERROR);
    });
  });
});