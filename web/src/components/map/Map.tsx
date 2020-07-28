import mapboxgl from 'mapbox-gl'
import * as MapboxGL from 'mapbox-gl'
import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { MapLoadEvent, InteractiveMap } from 'react-map-gl'

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN
const MAP_STYLE = process.env.REACT_APP_MAP_STYLE

export interface StaticMapProps {
  children?: ReactNode
  latitude?: number
  longitude?: number
  zoom?: number
}

export const Map = ({ latitude, longitude, children, zoom = 13 }: StaticMapProps): ReactElement => {
  const [viewport, setViewport] = useState({
    latitude: latitude ?? 40.7744146,
    longitude: longitude ?? -73.9678064,
    zoom,
    bearing: 0,
    pitch: 0,
  })
  const [map, setMap] = useState<MapboxGL.Map>()
  const onMapLoad = useCallback((event: MapLoadEvent) => setMap(event.target), [])
  const marker = useMemo(() => new mapboxgl.Marker(), [])

  useEffect(() => {
    if (map && latitude && longitude) {
      marker.setLngLat({ lat: latitude, lng: longitude }).addTo(map)
      setViewport((v) => ({ ...v, latitude, longitude }))
    }
  }, [latitude, longitude, map, marker])

  return (
    <InteractiveMap
      width="500px"
      height="300px"
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      bearing={viewport.bearing}
      pitch={viewport.pitch}
      mapStyle={MAP_STYLE}
      onLoad={onMapLoad}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAP_TOKEN}
    >
      {children}
    </InteractiveMap>
  )
}
