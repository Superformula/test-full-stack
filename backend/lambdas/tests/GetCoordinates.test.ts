import { getCoordinates } from '../maps/maps';
import * as fs from 'fs';
import * as util from 'util';
import nock from 'nock';
import { AppSyncResolverEvent } from 'aws-lambda';
import { GetCoordinatesArgument, SearchAddressArgument } from '../elasticWriter/types';
import { AddressLocation, AddressSuggestions } from '../maps/types';

describe('Address Suggestion Lambda', () => {
  const httpCode = 200;
  const nockInstance = nock('https://maps.googleapis.com');
  const readFileAsync = util.promisify(fs.readFile);

  let responseFile = '';
  let input = '';

  beforeEach(() => {
    input = '';
    responseFile = 'tests/responseFiles/singleSuggestion.json';
  });

  const exec = async () => {
    const responseBody = await readFileAsync(responseFile);
    const responseObj = JSON.parse(responseBody.toString());

    const regex = /\/maps\/api\/place\/autocomplete\/json\?input=(.*)&type=address&language=en-US&key=(.*)/;
    nockInstance.get(regex).reply(httpCode, responseObj);

    return getCoordinates({
      arguments: {
        placeId: input,
      },
    } as AppSyncResolverEvent<GetCoordinatesArgument>);
  };

  //TODO: Address later
  it('Should succeed when the Google API returns a location', async () => {
    //Arrange
    input = 'SQS 114 BLOCO H';

    //Act
    //const response: AddressLocation = await exec();

    //Assert
  });
});
