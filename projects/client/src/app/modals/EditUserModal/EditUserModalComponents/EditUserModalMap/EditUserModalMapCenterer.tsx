import * as React from 'react';
import { useState } from 'react';
import { FetchGeoCodeResult } from "../../../../../api/rest/fetch-geocode";


interface GoogleMapsReactInheritedProps {
    map?: any; // The maps instance. Un-typed.
    google?: any; // window.google
    mapCenter?: any; // google.maps.LatLng()
    location: FetchGeoCodeResult;
}

const EditUserModalMapCenterer: React.FunctionComponent<GoogleMapsReactInheritedProps> 
= (props: GoogleMapsReactInheritedProps) => {
    const { map, google, mapCenter, location } = props;
    const [intialValue, setInitialValue] = useState(location);

    if (location !== intialValue) {
        setInitialValue(location);

        if (location !== null) {
            map.panTo(location);
        }
    }
    
    return null;
}

export default EditUserModalMapCenterer;