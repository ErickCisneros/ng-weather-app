import { Astronomical } from './astronomical';
import { Weather } from './weather';

export interface CurrentWeather {
  astronomical: Astronomical;
  dt: string;
  dtRaw: number;
  lat: number;
  lon: number;
  timezoneOffset: number;
  weather: Weather;
}
