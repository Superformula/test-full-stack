import { useRef, useEffect, MutableRefObject } from 'react'
import mapboxgl, { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

// NOTE: I'd never expose secret keys in production. The reason I went with
// this approach here is because the serverless deployment approach I ended up
// gave me some headache with exposing env vars. In a better scenario I'd probably go with parameter store, with environment variables
// exposed by AWS Amplify. But, as I said before, AWS Amplify doesn't
// support SSR apps yet. It's work in progress. So I use what I can.
// TODO: Rework env vars approach before shipping to production!
const accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN ||
  'pk.eyJ1Ijoibmlja3NwMjAyMSIsImEiOiJja216dWgyaGgwMW5qMnJsOHlucHp4aXZjIn0.XGSWNUwwZ38lvgCk3tgC9Q'
const mapboxAPIBaseURI = 'https://api.mapbox.com/geocoding/v5'

interface FeaturesProps {
  bbox: LngLatBoundsLike;
  center: LngLatLike;
}

interface FeaturesType {
  features: (FeaturesProps | undefined)[];
}

const getGeoCode = async (query: string): Promise<FeaturesType> => {
  const requestURL = `${mapboxAPIBaseURI}/mapbox.places/${query}.json?access_token=${accessToken}`
  const response = await fetch(requestURL)
  const result = await response.json()
  return result as FeaturesType
}

export const useMapbox = (
  query: string | null
): MutableRefObject<HTMLDivElement> => {
  const targetRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()
  const markerRef = useRef<mapboxgl.Marker>()

  useEffect(() => {
    const update = async (): Promise<void> => {
      try {
        if (!query) {
          return
        }

        const location = (await getGeoCode(query)).features[0]
        if (location) {
          const element = targetRef.current

          // The HTML element in which Mapbox GL JS will render the map
          // must have no children.
          // ref: https://docs.mapbox.com/mapbox-gl-js/api/map/
          if (element && !element.children.length) {
            // Add access token from https://account.mapbox.com
            mapboxgl.accessToken = accessToken

            // Construct container for the map
            const container = document.createElement('div')
            const { style } = container
            style.position = 'absolute'
            style.top = style.right = style.bottom = style.left = '0'
            element.appendChild(container)

            // Inititalize map
            mapRef.current = new mapboxgl.Map({
              container,
              style: 'mapbox://styles/mapbox/streets-v11',
              center: location.center,
              zoom: 8
            })

            // Add location tracking
            mapRef.current.addControl(
              new mapboxgl.GeolocateControl({
                positionOptions: {
                  enableHighAccuracy: true
                },
                trackUserLocation: true
              })
            )

            // Create a location marker, colored black
            markerRef.current = new mapboxgl.Marker({ color: 'black' })
              .setLngLat(location.center)
              .addTo(mapRef.current)
          }

          // Position marker in the map center
          mapRef.current?.setCenter(location.center)
          markerRef.current?.setLngLat(location.center)

          // Limit results to only those contained within the supplied bounding box
          if (location.bbox) {
            // Show a specific area of the map in view
            mapRef.current?.fitBounds(location.bbox)
          } else {
            mapRef.current?.setZoom(10)
          }
        }
      } catch (error) {
        console.error('An error happened during updating geo location', error)
      }
    }

    // Debounce requests to mapbox
    const timeout = setTimeout(() => void update(), 450)
    return (): void => clearTimeout(timeout)
  }, [query])

  return targetRef
}
