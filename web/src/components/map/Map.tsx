import React, { ReactElement, ReactNode, useState } from 'react'
import { MapLoadEvent, InteractiveMap } from 'react-map-gl'

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN
const MAP_STYLE = process.env.REACT_APP_MAP_STYLE

export interface StaticMapProps {
  children?: ReactNode
  latitude?: number
  longitude?: number
  zoom?: number
  onLoad?: (event: MapLoadEvent) => void
}

export const Map = ({
  latitude = -7.1214792,
  longitude = -34.8542211,
  children,
  zoom = 13,
  onLoad,
}: StaticMapProps): ReactElement => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom,
    bearing: 0,
    pitch: 0,
  })
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
      onLoad={onLoad}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAP_TOKEN}
    >
      {children}
    </InteractiveMap>
  )
}
