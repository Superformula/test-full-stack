class MapsService {

  mapsApiKey: string;

  constructor(mapsApiKey: string) {
    this.mapsApiKey = mapsApiKey;
  }

  async geoCodeLocation(address: string) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.mapsApiKey}`)
    const data = await response.json()
    
    if(data.results?.length === 0){
      return null
    }

    return data.results[0].geometry.location
  }

}

export default MapsService;