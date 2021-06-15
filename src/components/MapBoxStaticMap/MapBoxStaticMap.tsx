import { memo } from 'react';

import classes from './MapBoxStaticMap.module.scss';

interface MapBoxStaticMapProps {
  src: string;
}

function MapBoxStaticMapComponent(props: MapBoxStaticMapProps) {
  return (
    <div
      className={classes.mapBoxStaticMap}
      style={{
        backgroundImage: `url("${props.src}")`,
      }}
    />
  );
}

export const MapBoxStaticMap = memo(MapBoxStaticMapComponent);
