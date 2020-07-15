import React, { useCallback, useState, memo, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

let markers = [];
const Map = ({ address }) => {
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      addressToLocation(address, map);
    }
  }, [address, map]);

  return (
    <>
      <GoogleMap
        mapContainerClassName="google_map"
        options={{ disableDefaultUI: true }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </>
  );
};

const cache = {};
const empty = { lat: 0, lng: 0 };
export const addressToLocation = (address, map) => {
  if (cache[address]) {
    postMarkerToMap(cache[address], map);
    return;
  }

  if (!address) {
    postMarkerToMap(empty, map);
    return;
  }

  if (address) {
    let geoCoder = new window.google.maps.Geocoder();
    geoCoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        cache[address] = results[0].geometry.location;
      } else {
        cache[address] = empty;
      }
      postMarkerToMap(cache[address], map);
    });
  }
};

const postMarkerToMap = (location, map) => {
  if (markers) {
    markers.forEach((item) => {
      item.setMap(null);
    });
    markers.splice(-1);
  }

  map.setCenter(location);
  markers.push(
    new window.google.maps.Marker({
      map: map,
      position: location,
    })
  );
};

export default memo(Map);
