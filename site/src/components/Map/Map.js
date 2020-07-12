import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "518px",
  height: "336px",
  top: "30px",
};

let markers = [];

const Map = (props) => {
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  let pointToLocation = (address, map) => {
    if (markers) {
      markers.forEach((item) => {
        item.setMap(null);
      });
      markers.splice(-1);
    }
    if (address) {
      let geoCoder = new window.google.maps.Geocoder();
      geoCoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          markers.push(
            new window.google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            })
          );
        }
      });
    } else {
      map.setCenter({
        lat: 0,
        lng: 0,
      });
    }
  };

  if (map) {
    pointToLocation(props.address, map);
  }
  return (
    <>
      <GoogleMap
        mapContainerClassName="google_map"
        options={{ disableDefaultUI: true }}
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </>
  );
};

export default Map;
