// https://github.com/googlemaps/google-maps-services-js
import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js';
// import { configGoogleMapsKey } from "./config";

const client = new Client({});

function error(err: any) {
    console.error(JSON.stringify(err));
}

client.geocode({
    params: {
        address: "2702 Sterling Ct. Elgin Il",
        key: ""
    }
}).then((value: GeocodeResponse) => {
    const coords = value.data.results[0].geometry.location;
    console.log(JSON.stringify(coords));
}, (reason: any) => {
    error(reason);
}).catch((reason) => {
    error(reason);
});