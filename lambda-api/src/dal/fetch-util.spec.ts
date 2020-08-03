import { any, mock, mockReset } from 'jest-mock-extended';
const mockLogger = mock<Logger>();
jest.mock('../logging/logger', () => ({
  createContextLogger: (_ctx) => mockLogger,
  toMeta: jest.requireActual('../logging/logger').toMeta,
}));
import { Logger } from 'winston';
import { userFactory } from '../test-fixtures/user-generator';
import { decodeCursor, encodeCursor, toCursor } from './fetch-util';

describe('fetch-util tests', () => {
  const errorMsg = 'Boom goes the dynamite!';
  const base64ABC123 = 'QUJDMTIz';
  const cursor = {
    a: '1',
    b: '2',
    c: '3',
  };
  const cursorJson = JSON.stringify(cursor);
  const cursorBase64Encoded = Buffer.from(cursorJson).toString('base64');

  beforeEach(() => {
    mockReset(mockLogger);
  });

  describe('decode cursor tests', () => {
    it('happy path', () => {
      expect(decodeCursor(cursorBase64Encoded)).toEqual(cursor);
    });

    it('error path - non-base64', () => {
      jest.spyOn(JSON, 'parse').mockImplementationOnce((_a, _b?) => {
        throw new Error(errorMsg);
      });
      const encodedCursor = encodeCursor('ABC123'); //ABC123

      expect(() => decodeCursor(encodedCursor)).toThrowError(errorMsg);
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error decoding cursor value from'),
        any()
      );
    });

    it('error path - bad json', () => {
      jest.spyOn(JSON, 'parse').mockImplementationOnce((_a, _b?) => {
        throw new Error(errorMsg);
      });
      const encodedCursor = encodeCursor(base64ABC123); //ABC123

      expect(() => decodeCursor(encodedCursor)).toThrowError(errorMsg);
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error decoding cursor value from'),
        any()
      );
    });
  });

  describe('encode cursor tests', () => {
    it('happy path', () => {
      expect(encodeCursor(cursor)).toEqual(cursorBase64Encoded);
    });

    it('error path - non-base64', () => {
      jest.spyOn(Buffer, 'from').mockImplementationOnce((_a, _b?) => {
        throw new Error(errorMsg);
      });

      expect(() => encodeCursor(cursor)).toThrowError(errorMsg);
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error encoding cursor value for'),
        any()
      );
    });
  });

  describe('toCursor tests', () => {
    it('Test mapping', () => {
      const user = userFactory.build();

      const res = toCursor(user);

      expect(res.id).toEqual(user.id);
      expect(res.createdAt).toEqual(user.createdAt);
      expect(res.name).toEqual(user.name);
    });
  });
});
