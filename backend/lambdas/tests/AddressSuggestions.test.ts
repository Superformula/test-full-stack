import * as fs from 'fs';
import * as util from 'util';
import nock from 'nock';
import { AppSyncResolverEvent } from 'aws-lambda';
import { AddressSuggestion, SearchAddressArgument } from '../maps/types';
import { getAddressHandler } from '../maps/lambdaEndpoints';

describe('Address Suggestion Lambda', () => {
  const readFileAsync = util.promisify(fs.readFile);
  let responseFile = '';

  let input: string | undefined = '';
  let httpCode = 200;
  // @ts-ignore (this gets set before each test. Safe to ignore the null check here)
  let nockScope: nock.Scope = null;

  beforeEach(() => {
    input = 'validInput';
    responseFile = 'tests/responseFiles/singleSuggestion.json';
    httpCode = 200;
    nockScope = nock('https://maps.googleapis.com');
  });

  afterEach(() => {
    //Remove pending mocks that weren't invoked
    nock.cleanAll();

    //Mark scope as done
    nockScope.done();
  });

  afterAll(() => {
    //https://github.com/nock/nock#memory-issues-with-jest
    nock.restore();
  });

  const exec = async () => {
    const responseBody = await readFileAsync(responseFile);
    const responseObj = JSON.parse(responseBody.toString());

    const regex = /\/maps\/api\/place\/autocomplete\/json\?input=(.*)&type=address&language=en-US&key=(.*)/;

    console.log('nock HTTP Status', httpCode);
    nockScope.get(regex).optionally().reply(httpCode, responseObj);

    return getAddressHandler({
      arguments: {
        input: input,
      },
    } as AppSyncResolverEvent<SearchAddressArgument>);
  };

  it('Should succeed when the API returns a single suggestion', async () => {
    //Arrange
    input = 'SQS 114 BLOCO H';

    //Act
    const response: AddressSuggestion[] = await exec();

    //Assert
    expect(response.length).toBe(1);
    expect(response[0].description).toBe(
      'SQS 114 Bl. H - SHCS Superquadra Sul 114 - Brasilia, Federal District, Brazil',
    );
    expect(response[0].placeId).toBe(
      'Ek1TUVMgMTE0IEJsLiBIIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTE0IC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCV-i4VRUJVqTEWCldTWQuuEmEhQKEgndHzBmVSVakxGehKUVKoBLmA',
    );
  });

  it('Should succeed when the API returns multiple suggestions', async () => {
    //Arrange
    input = 'SQS';
    responseFile = 'tests/responseFiles/multipleSuggestions.json';

    //Act
    const response: AddressSuggestion[] = await exec();

    //Assert
    const expectedResponse: AddressSuggestion[] = [
      {
        placeId:
          'Ek1TUVMgMTA5IEJsLiBBIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTA5IC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCd8MHVaxOlqTEdMXWUb3OurgEhQKEgkR9IMFtDpakxEuNZpufU8C9g',
        description: 'SQS 109 Bl. A - SHCS Superquadra Sul 109 - Brasilia, Federal District, Brazil',
      },
      {
        placeId:
          'Ek1TUVMgMTAzIEJsLiBCIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTAzIC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCRtxBKbEOlqTEYPUStrpPVDZEhQKEglJAwOo3DpakxHiWVlOv_kSAA',
        description: 'SQS 103 Bl. B - SHCS Superquadra Sul 103 - Brasilia, Federal District, Brazil',
      },
      {
        placeId:
          'Ek1TUVMgMTE1IEJsLiBDIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTE1IC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCX0MNRL_L1qTEdTxP3xd6XwDEhQKEgkJXu0a_y9akxGo_6WMR8oKeA',
        description: 'SQS 115 Bl. C - SHCS Superquadra Sul 115 - Brasilia, Federal District, Brazil',
      },
      {
        placeId:
          'Ek1TUVMgMTA0IEJsLiBCIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTA0IC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCc1gbvLEOlqTEWq8QHr1y1YHEhQKEgkPEej8xDpakxFAf8qUYEPUHA',
        description: 'SQS 104 Bl. B - SHCS Superquadra Sul 104 - Brasilia, Federal District, Brazil',
      },
      {
        placeId:
          'Ek1TUVMgMTEzIEJsLiBEIC0gU0hDUyBTdXBlcnF1YWRyYSBTdWwgMTEzIC0gQnJhc2lsaWEsIEZlZGVyYWwgRGlzdHJpY3QsIEJyYXppbCIuKiwKFAoSCT-aRKxUJVqTEbTULqcXg2FjEhQKEgmjeIfSVCVakxGVbMS9qcRthQ',
        description: 'SQS 113 Bl. D - SHCS Superquadra Sul 113 - Brasilia, Federal District, Brazil',
      },
    ];

    expect(response).toEqual(expectedResponse);
  });

  it('should respond empty array when ZERO_RESULTS code arrives', async () => {
    //Arrange
    responseFile = 'tests/responseFiles/zero_results.json';

    //Act
    const response = await exec();

    //Assert
    expect(response).toEqual([]);
  });

  it('should fail when API returns something different than OK and ZERO_RESULTS', async () => {
    //Arrange
    responseFile = 'tests/responseFiles/error_example.json';

    //Act
    return await expect(exec) //Assert
      .rejects.toThrow('Address Suggestion API returned an error status: REQUEST_DENIED');
  });

  it('should fail when the AppSync resolver does not pass in the required information', async () => {
    //Arrange
    input = undefined;

    //Act
    return await expect(exec) //Assert
      .rejects.toThrow('Input argument not provided to the function');
  });

  it('should fail when google unexpectedly returns a failure code', async () => {
    //Arrange
    responseFile = 'tests/responseFiles/error_example.json';
    httpCode = 500;

    //Act
    await expect(exec) //Assert
      .rejects.toThrow(`Request failed with status code ${httpCode}`);
  });
});
