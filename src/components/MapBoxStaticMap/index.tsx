import { MapBoxStaticMap as Element } from './MapBoxStaticMap';
import { memo, useMemo } from 'react';

interface MapBoxStaticMapProps {
  width?: number;
  height?: number;
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

const defaultProps: MapBoxStaticMapProps = {
  width: 800,
  height: 600,
  longitude: 153.1104,
  latitude: -26.8159,
  zoom: 14,
};

function MapBoxStaticMapComponent(props: MapBoxStaticMapProps = defaultProps) {
  const componentProps: MapBoxStaticMapProps = { ...defaultProps, ...props };
  const src = useMemo(() => {
    return [
      'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/',
      'pin-s+555555(',
      componentProps.longitude,
      ',',
      componentProps.latitude,
      ')/',
      componentProps.longitude,
      ',',
      componentProps.latitude,
      ',',
      componentProps.zoom,
      ',0/',
      componentProps.width,
      'x',
      componentProps.height,
      '?access_token=',
      process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    ].join('');
  }, [
    componentProps.zoom,
    componentProps.height,
    componentProps.latitude,
    componentProps.longitude,
    componentProps.width,
  ]);
  return <Element src={src} />;
}

export const MapBoxStaticMap = memo(MapBoxStaticMapComponent);
