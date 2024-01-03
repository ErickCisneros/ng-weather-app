import { Astronomical } from './astronomical';
import { Weather } from './weather';

export interface DailyWeather {
  astronomical: Astronomical;
  dt: string;
  dtRaw: number;
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: number;
  weather: Weather;
}
