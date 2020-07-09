import fetch from "node-fetch";

const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
const apiToken = process.env.MAP_BOX_API_KEY;

export default class MapboxGeoLocationService {
  async getLocationInfo(address) {
    const addressEncoded = encodeURIComponent(address);
    let response = await fetch(
      `${mapBoxUrl}/${addressEncoded}.json?access_token=${apiToken}`
    );
    return await response.text();
  }
}
