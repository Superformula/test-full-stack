import { getCoordinates } from '../maps/maps';
import * as fs from 'fs';
import * as util from 'util';
import nock from 'nock';
import { AppSyncResolverEvent } from 'aws-lambda';
import { GetCoordinatesArgument, SearchAddressArgument } from '../elasticWriter/types';
import { AddressLocation, AddressSuggestions } from '../maps/types';

describe('Address Suggestion Lambda', () => {
  const readFileAsync = util.promisify(fs.readFile);

  let responseFile = '';

  let input: string | undefined = '';
  let httpCode = 200;
  // @ts-ignore (this gets set before each test. Safe to ignore the null check here)
  let nockScope: nock.Scope = null;

  beforeEach(() => {
    input = 'PLACE_ID_HERE';
    responseFile = 'tests/responseFiles/placeDetail.json';
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

    const regex = /\/maps\/api\/place\/details\/json\?placeid=(.*)&key=(.*)/;
    nockScope.get(regex).reply(httpCode, responseObj);

    return getCoordinates({
      arguments: {
        placeId: input,
      },
    } as AppSyncResolverEvent<GetCoordinatesArgument>);
  };

  it('Should succeed when the Google API returns a location', async () => {
    //Act
    const response: AddressLocation = await exec();

    //Assert
    expect(response.longitude).toBe(-100.2998145);
    expect(response.latitude).toBe(25.764709);
  });

  it('Should fail when the AppSync resolver does not pass in the required information', async () => {
    //Arrange
    input = undefined;

    //Act
    await expect(exec) //Assert
      .rejects.toThrow('placeId argument not provided to the function');
  });

  it('should fail when API returns something different than OK', async () => {
    //Arrange
    responseFile = 'tests/responseFiles/error_example_2.json';

    //Act
    return await expect(exec) //Assert
      .rejects.toThrow('Places detail API returned an error status: ZERO_RESULTS');
  });

  it('should fail when google unexpectedly returns a failure code', async () => {
    //Arrange
    httpCode = 500;

    //Act
    await expect(exec) //Assert
      .rejects.toThrow(`Request failed with status code ${httpCode}`);
  });

  it('should fail if google returns unexpected data structure', async () => {
    //Arrange
    input = 'ID_123';
    responseFile = 'tests/responseFiles/unexpected_placeDetail_noLocation.json';

    //Act
    await expect(exec) //Assert
      .rejects.toThrow(`Place with id ${input} does not contain a geolocation:`);
  });
});
