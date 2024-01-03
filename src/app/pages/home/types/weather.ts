import { FeelsLike } from './feels-like';
import { Icon } from './icon';
import { Temp } from './temp';
import { Wind } from './wind';

export interface Weather {
  clouds: number;
  conditionId: number;
  description: string;
  dewPoint: number;
  feelsLike: FeelsLike;
  humidity: number;
  icon: Icon;
  main: string;
  pop: number;
  pressure: number;
  rain: number;
  snow: number;
  summary: string;
  temp: Temp;
  uvi: number;
  visibility: number;
  wind: Wind;
}
