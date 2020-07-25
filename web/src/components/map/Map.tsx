import React, { ReactElement, ReactNode } from 'react'
import { MapLoadEvent, StaticMap as MapboxStaticMap } from 'react-map-gl'

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN
const MAP_STYLE = process.env.REACT_APP_MAP_STYLE

export interface StaticMapProps {
  children?: ReactNode
  latitude?: number
  longitude?: number
  zoom?: number
  onLoad?: (event: MapLoadEvent) => void
}

export const StaticMap = ({
  latitude = -7.1214792,
  longitude = -34.8542211,
  children,
  zoom = 13,
  onLoad,
}: StaticMapProps): ReactElement => (
  <MapboxStaticMap
    width="500px"
    height="300px"
    zoom={zoom}
    bearing={0}
    pitch={0}
    latitude={latitude}
    longitude={longitude}
    mapStyle={MAP_STYLE}
    onLoad={onLoad}
    mapboxApiAccessToken={MAP_TOKEN}
  >
    {children}
  </MapboxStaticMap>
)
