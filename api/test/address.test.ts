import nock from 'nock'
import { expect } from 'chai'
import { getCoordinates, handler, searchAddress } from '../address'
import { AddressResponse, LatLng } from '../Types'

describe('Address', () => {
  it('should search address', async () => {
    const mock = nock('https://maps.googleapis.com')
    const response = {
      status: 'OK',
      predictions: [
        {
          description: '5th Ave, New York, NY, EUA',
          place_id: 'NXRoIEF2ZSwgTmV3IFlvcmssIE5ZLCBFVUE=',
        },
      ],
    }
    mock
      .get(/\/maps\/api\/place\/autocomplete\/json\?input=5thavenue&language=en-US&type=address.*$/)
      .reply(200, response)

    const addresses: AddressResponse[] = await searchAddress(
      { resolver: 'searchAddress', arguments: { text: '5thavenue' } },
      null,
    )
    expect(addresses).with.length(1)
    expect(addresses[0].text).equal('5th Ave, New York, NY, EUA')
    expect(addresses[0].placeId).equal('NXRoIEF2ZSwgTmV3IFlvcmssIE5ZLCBFVUE=')

    mock
      .get(/\/maps\/api\/place\/autocomplete\/json\?input=5thavenue&language=en-US&type=address.*$/)
      .reply(200, response)

    const addressesByHandler: AddressResponse[] = await handler(
      { resolver: 'searchAddress', arguments: { text: '5thavenue' } },
      null,
    )
    expect(addressesByHandler).with.length(1)
    expect(addressesByHandler[0].text).equal('5th Ave, New York, NY, EUA')
    expect(addressesByHandler[0].placeId).equal('NXRoIEF2ZSwgTmV3IFlvcmssIE5ZLCBFVUE=')
  })

  it('should get coordinates', async () => {
    const mock = nock('https://maps.googleapis.com')
    const response = {
      status: 'OK',
      result: {
        geometry: {
          location: {
            lat: 40.7744146,
            lng: -73.9678064,
          },
        },
      },
    }
    mock.get(/\/maps\/api\/place\/details\/json\?placeid=NXRoIEF2ZSwgTmV3I.*$/).reply(200, response)

    const coordinates: LatLng = await getCoordinates(
      { resolver: 'getCoordinates', arguments: { placeId: 'NXRoIEF2ZSwgTmV3I' } },
      null,
    )
    expect(coordinates).to.exist
    expect(coordinates.latitude).equal(40.7744146)
    expect(coordinates.longitude).equal(-73.9678064)

    mock.get(/\/maps\/api\/place\/details\/json\?placeid=NXRoIEF2ZSwgTmV3I.*$/).reply(200, response)

    const coordinatesByHandler: LatLng = await handler(
      { resolver: 'getCoordinates', arguments: { placeId: 'NXRoIEF2ZSwgTmV3I' } },
      null,
    )
    expect(coordinatesByHandler).to.exist
    expect(coordinatesByHandler.latitude).equal(40.7744146)
    expect(coordinatesByHandler.longitude).equal(-73.9678064)
  })

  it('should return null if placeId is invalid', async () => {
    const mock = nock('https://maps.googleapis.com')
    const response = { status: 'INVALID' }
    mock.get(/\/maps\/api\/place\/details\/json\?placeid=NXRoIEF2ZSwgTmV3I.*$/).reply(200, response)

    const coordinates: LatLng = await getCoordinates(
      { resolver: 'getCoordinates', arguments: { placeId: 'NXRoIEF2ZSwgTmV3I' } },
      null,
    )
    expect(coordinates).to.be.null
  })
})
