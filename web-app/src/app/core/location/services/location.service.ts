import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GeoLocation } from '../../../data/model/geo-location';

@Injectable()
export class LocationService {
  constructor(private apollo: Apollo) { }

  public getLocationByAddress(address: string): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
      const queryStmt = gql`
        {
          getLocation(input: { address: "${address}" }) {
            lat
            long
          }
        }`;

      this.apollo
        .query({
          query: queryStmt,
        }).subscribe((location: any) => {
          resolve(location.data.getLocation as GeoLocation);
        });
    });
  }
}
