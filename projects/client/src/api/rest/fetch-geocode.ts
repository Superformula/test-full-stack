import { APIUserModel } from '../api-types';

import REST_API from './backend-host';

type FetchUpdateUserResult = APIUserModel;

interface FetchGeoCodeSuccessResult {
    lat: number,
    lng: number
}

export type FetchGeoCodeResult = FetchGeoCodeSuccessResult | null;

export function fetchGeocode(address: string) : Promise<FetchGeoCodeResult> {
    if (address.trim() === "") {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }

    const url = `${REST_API}?address=${encodeURIComponent(address)}`;
    console.log(url);

    return fetch(url, {
        method: 'GET',
    })
    .then((result) => {
        if (result.status !== 200) {
            return null;
        }
        else {
            return result.json()
        }
    })
    .then((result: FetchGeoCodeResult) => { 
        return result;
    });
}