import { anyObject, mock, mockReset } from 'jest-mock-extended';
const mockLogger = mock<Logger>();
jest.mock('../logging/logger', () => ({
  createContextLogger: (_ctx) => mockLogger,
  toMeta: jest.requireActual('../logging/logger').toMeta,
}));
import { Logger } from 'winston';
import { GeocodeService } from '../geocode/geocode-service';
import { GeocodingResolver } from './geocoding-resolver';

describe('GeocodingResolver tests', () => {
  const mockGeocodeService = mock<GeocodeService>();
  const tested = new GeocodingResolver(mockGeocodeService);

  beforeEach(() => {
    mockReset(mockLogger);
    mockReset(mockGeocodeService);
  });

  it('happy path', async () => {
    const input = { address: '123 any street' };
    const expected = { latitude: '1', longitude: '2' };
    mockGeocodeService.geocodeAddress
      .calledWith(input.address)
      .mockResolvedValueOnce(expected);

    const res = await tested.geocode(input);

    expect(res).toEqual(expected);
  });

  it('error during geocoding service call', async () => {
    const input = { address: '123 any street' };
    mockGeocodeService.geocodeAddress
      .calledWith(input.address)
      .mockRejectedValueOnce(new Error('Boom!'));

    try {
      await tested.geocode(input);
    } catch (e) {
      expect(e.message).toEqual('Boom!');
    }
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error geocoding address: 123 any street'),
      anyObject()
    );
  });
});
