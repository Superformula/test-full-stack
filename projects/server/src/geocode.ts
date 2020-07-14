// https://github.com/googlemaps/google-maps-services-js
import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js';
import { configGoogleMapsKey } from "./config";

import type { IncomingMessage, ServerResponse } from 'http';

const client = new Client({});

function getAddressFromUrl(url: string) : string | null {
    if (url && url.indexOf('?') >= 0) {
        // +1 to exclude the '?'
        const query = url.substr(url.indexOf('?')+1);

        if (query.startsWith('address=')) {
            const [, encodedAddress] = query.split('=');
            const address = decodeURIComponent(encodedAddress);
            console.log(address);

            return address;
        }
    }

    return null;
}

async function geocode(req: IncomingMessage, res: ServerResponse) : Promise<void> {
    function error(err: any) {
        console.error(JSON.stringify(err));

        res.writeHead(400, {
            'Access-Control-Allow-Origin': '*'
        });
        
        res.end();
    }
    
    const address = getAddressFromUrl(req.url);
    if (address === null) {
        error("Address could not be found in query!");
        return;
    }
    
    try {
        let geocodeResponse: GeocodeResponse = await client.geocode({
            params: {
                address: address,
                key: configGoogleMapsKey
            }
        });

        if (geocodeResponse.data.results.length > 0) {
            const coords = geocodeResponse.data.results[0].geometry.location;
            
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            
            const response = JSON.stringify(coords);
            console.log(response);
    
            res.end(response);
        }
        else {
            error("Address not found");
        }
    }
    catch (e) {
        error("Failed to fetch geocode.");
        error(e);
    }
}

export default geocode;