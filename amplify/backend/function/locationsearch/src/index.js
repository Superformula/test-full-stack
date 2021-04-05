const axios = require('axios')

exports.handler = (event, _, callback) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
  const mapboxAPIBaseURL = 'https://api.mapbox.com/geocoding/v5'

  if (event.arguments) {
    const { query = '' } = event.arguments
    const apiURL = `${mapboxAPIBaseURL}/mapbox.places/${query}.json?access_token=${accessToken}`
    axios
      .get(apiURL)
      .then(response => callback(null, response.data?.features?.[0]))
      .catch(error =>
        callback(new Error(`Error fetching geo location: ${error.message}`))
      )
  }
}
