export type LocationBasicData = {
  name?: string;
  isLandmark?: boolean;
  address?: string;
  category?: string;
  coordinates?: number[]
}

export interface LocationAPI {
  getLocationData(rawAddress: string):LocationBasicData[]|Promise<LocationBasicData[]>
}