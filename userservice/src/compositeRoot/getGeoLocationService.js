import MapboxGeoLocationService from "../service/MapboxGeoLocationService";

const getGeoLocationService = () => {
  return new MapboxGeoLocationService();
};

export default getGeoLocationService;
