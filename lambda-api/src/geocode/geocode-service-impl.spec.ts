import { any, mock, mockReset } from 'jest-mock-extended';
const mockLogger = mock<Logger>();
jest.mock('../logging/logger', () => ({
  createContextLogger: (_ctx) => mockLogger,
  toMeta: jest.requireActual('../logging/logger').toMeta,
}));
import { Logger } from 'winston';
import { GeocodeServiceImpl } from './geocode-service-impl';

describe('geocode-service-impl tests', () => {
  const tested = new GeocodeServiceImpl();
  const lat = '123';
  const lon = '456';

  beforeEach(() => {
    mockReset(mockLogger);
  });

  it('geocodeAddress success', async () => {
    const mapboxRes = {
      body: {
        features: [{ center: [lon, lat] }],
      },
    };

    jest.spyOn(tested, 'executeRequest').mockResolvedValueOnce(mapboxRes);

    const res = await tested.geocodeAddress('abc123');

    expect(res.latitude).toEqual(lat);
    expect(res.longitude).toEqual(lon);
    expect(res.error).toBeUndefined();
  });

  it('geocodeAddress error - no coordinates', async () => {
    const mapboxRes = {
      body: {
        features: [{ center: [] }],
      },
    };

    jest.spyOn(tested, 'executeRequest').mockResolvedValueOnce(mapboxRes);

    const res = await tested.geocodeAddress('abc123');

    expect(res.latitude).toBeUndefined();
    expect(res.longitude).toBeUndefined();
    expect(res.error).toContain('Coordinates not returned for address abc123');
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('Coordinates not returned for address abc123')
    );
  });

  it('geocodeAddress exception thrown during call to mapbox', async () => {
    jest
      .spyOn(tested, 'executeRequest')
      .mockRejectedValueOnce(new Error('Boom!'));

    try {
      await tested.geocodeAddress('abc123');
      fail('Should not get here');
    } catch (e) {
      expect(e.message).toContain('Boom!');
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error geocoding address abc123'),
        any()
      );
    }
  });
});
