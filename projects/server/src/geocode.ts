// https://github.com/googlemaps/google-maps-services-js
import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js';
import { configGoogleMapsKey } from "./config";

import type { IncomingMessage, ServerResponse } from 'http';

const client = new Client({});

// function rawHeadersToObject(rawHeaders: string[]) : {[x: string]: string} {
//     let headers = {};

//     for(let i = 0; i < rawHeaders.length; i += 2) {
//         headers[rawHeaders[i]] = rawHeaders[i+1];
//     }

//     return headers;
// }

export function geocode(req: IncomingMessage, res: ServerResponse) : void {
    function error(err: any) {
        console.error(JSON.stringify(err));

        res.writeHead(400);
        res.end();
    }

    if (req.url && req.url.indexOf('?') >= 0) {
        // +1 to exclude the '?'
        const query = req.url.substr(req.url.indexOf('?')+1);

        if (query.startsWith('address=')) {
            const [, encodedAddress] = query.split('=');
            const address = decodeURIComponent(encodedAddress);
            console.log(address);

            client.geocode({
                params: {
                    address: address,
                    key: configGoogleMapsKey
                }
            }).then((value: GeocodeResponse) => {
                if (value.data.results.length > 0) {
                    const coords = value.data.results[0].geometry.location;
                    
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
            }, (reason: any) => {
                error(`Unfulfilled`);
                error(reason);
            }).catch((reason) => {
                error(`Catch`);
            });

            return;
        }
    }

    error("Bad request");
}