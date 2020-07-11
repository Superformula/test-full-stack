import * as React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, IProvidedProps, IMapProps } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from "../globals";


// Typings error on google-maps-react
export const MapMarker: any = Marker;

const GoogleMap: React.FunctionComponent<React.PropsWithChildren<IProvidedProps>> 
= (props: React.PropsWithChildren<IProvidedProps>) => {
    const { google, loaded, children } = props;
    return (
        <Map google={google} onReady={(mapProps: IMapProps, map: any, event: any) => {
            console.log("eh")
            map.disableDefaultUI = true;
        }}>
            {children}
        </Map>
    );
};

export default GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_API_KEY),
})(GoogleMap);