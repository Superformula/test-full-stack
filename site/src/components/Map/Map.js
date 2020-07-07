import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "300px",
  height: "300px",
  top: "20px",
};

const Map = (props) => {
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
    pointToLocation(props.address, map);
  }, []);

  pointToLocation(props.address, map);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      options={{ disableDefaultUI: true }}
      mapContainerStyle={containerStyle}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  );
};

const pointToLocation = (address, map) => {
  if (address) {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);
        let marker = new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      }
    });
  }
};

export default Map;
