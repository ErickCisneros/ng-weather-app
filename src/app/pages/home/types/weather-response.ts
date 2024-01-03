import { CurrentWeather } from './current-weather';
import { DailyWeather } from './daily-weather';

export interface WeatherResponse {
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather[];
}
