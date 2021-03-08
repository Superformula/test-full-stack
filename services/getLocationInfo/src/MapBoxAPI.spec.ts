import { MapBoxAPI } from './MapBoxAPI';
import fetch, { Response } from 'node-fetch';
import { mocked } from 'ts-jest/utils';

import { geoLocationResponseData } from './mocks/mapBoxApi';
import { LocationBasicData } from './location';

jest.mock('node-fetch');
const mockedFetch = mocked(fetch);

describe('MapBoxAPI instance', () => {
  beforeAll(() => {
    process.env.MAPBOX_ACCESS_TOKEN = 'testToken';
  });
  let instance:MapBoxAPI;
  describe('when MAPBOX_ACCESS_TOKEN env variable is not defined', () => {
    beforeAll(() => {
      delete process.env.MAPBOX_ACCESS_TOKEN;
    });
    afterAll(() => {
      process.env.MAPBOX_ACCESS_TOKEN = 'testToken';
    });
    it('should throw an error on instantiation', () => {
      const instantiation = () => instance = new MapBoxAPI();
      expect(instantiation).toThrow(expect.any(Error));
    });
  });
  beforeAll(() => {
    instance = new MapBoxAPI();
  });
  it('should have a getLocationData method', () => {
    expect(instance.getLocationData).toEqual(expect.any(Function));
  });

  describe('getLocationData', () => {
    let rawAddress:string;
    let result:LocationBasicData[];
    beforeAll(async () => {
      rawAddress = 'test Address';
      mockedFetch.mockResolvedValueOnce({
        ...new Response(),
        status: 200,
        statusText: 'ok',
        json: () => Promise.resolve(geoLocationResponseData)
      } as Response);
      result = await instance.getLocationData(rawAddress);
    });
    it('should attempt to fetch location data using given address', () => {
      expect(mockedFetch).toHaveBeenCalledWith(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(rawAddress)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true`);
    });
    it('should return mapped location data from valid response features', () => {
      expect(result).toEqual([
        {
          name: geoLocationResponseData.features[0].properties.place_name,
          category: geoLocationResponseData.features[0].properties.category,
          isLandmark: !!geoLocationResponseData.features[0].properties.landmark,
          address: geoLocationResponseData.features[0].properties.address,
          coordinates: geoLocationResponseData.features[0].center
        },
        {
          name: geoLocationResponseData.features[2].properties.place_name,
          category: geoLocationResponseData.features[2].properties.category,
          isLandmark: !!geoLocationResponseData.features[2].properties.landmark,
          address: geoLocationResponseData.features[2].properties.address,
          coordinates: geoLocationResponseData.features[2].center
        }
      ]);
    });
    describe('when fetching location data fails', () => {
      beforeAll(() => {
        mockedFetch.mockImplementationOnce(() => Promise.reject(new Error('some api error')));
      });
      it('should throw fetch error', async () => {
        const err = instance.getLocationData(rawAddress);
        await expect(err).rejects.toThrow('some api error');
      });
    });
    describe('when parsing response data fails', () => {
      beforeAll(() => {
        mockedFetch.mockResolvedValueOnce({
          ...new Response(),
          status: 200,
          statusText: 'ok',
          json: () => Promise.reject(new Error('parsing error'))
        } as Response);
      });
      it('should throw fetch error', async () => {
        const err = instance.getLocationData(rawAddress);
        await expect(err).rejects.toThrow('parsing error');
      });
    });
    describe('when feature data is not iterable', () => {
      beforeAll(() => {
        mockedFetch.mockResolvedValueOnce({
          ...new Response(),
          status: 200,
          statusText: 'ok',
          json: () => Promise.resolve({ features: geoLocationResponseData })
        } as Response);
      });
      it('should throw standard error', async () => {
        const err = instance.getLocationData(rawAddress);
        await expect(err).rejects.toThrow(expect.any(Error));
      });
    });

  });
});