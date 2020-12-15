import {create} from 'apisauce';

export function getCityName(latitude: number, longitude: number) {
  const location = `${latitude},${longitude}`;
  const googleApiKey = 'AIzaSyBguxdA76orpB1jozXUiPRsPQR6Fs5T0Go';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${googleApiKey}`;
  const api = create({
    baseURL: url,
    headers: {Accept: 'application/json'},
  });
  return api
    .get('')
    .then((res) => res)
    .catch((err) => err);
}
