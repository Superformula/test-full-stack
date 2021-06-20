import React, { useEffect } from 'react';
import classnames from 'classnames';
import useGeocoding from '../../../../../../hooks/useGeocoding';
import './Map.scss';

export interface MapProps {
  address: string
  className?: string
}
const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const Map:React.FC<MapProps> = ({
  className,
  address,
}) => {
  const {
    coordinates, loading, error, search,
  } = useGeocoding();

  useEffect(() => {
    search(address);
  }, [search, address]);

  if (error) return <p>Error :(</p>;

  if (!loading && !coordinates?.length) return <p>Error locating address</p>;

  return loading ? (<span>loading...</span>) : (
    <div className={classnames('map', className)}>
      <img src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${coordinates?.[0]},${coordinates?.[1]})/${coordinates?.[0]},${coordinates?.[1]},14,0/800x600?access_token=${accessToken}`} alt="Map of user address" />
    </div>
  );
};

export default React.memo(Map);
