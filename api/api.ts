import {create} from 'apisauce';

const apiKey = '4910a00d00927f7d1dc0fc9f4337d0e8';
const mainURL = 'https://api.openweathermap.org/data/2.5';
const api = create({
  baseURL: mainURL,
  headers: {Accept: 'application/json'},
});

export function getCurrentWeather(lat: number, lon: number) {
  return api
    .get(`/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((res) => res.data)
    .catch((err) => err);
}

export function getForecast(lat: number, lon: number) {
  return api
    .get(`/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=5`)
    .then((res) => res.data)
    .catch((err) => err);
}
