import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DaysManagement } from '../pages/home/types/days-management';
import { WeatherManagement } from '../pages/home/types/weather-management';
import { WeatherResponse } from '../pages/home/types/weather-response';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  location: string | undefined = 'Quito';
  weather = new Subject<WeatherResponse>();

  get weather$() {
    return this.weather.asObservable();
  }

  /**
   *
   * This function brings the weather
   * information with the respective settings
   *
   * @param city is the name of a city
   * @returns Observable<WeatherResponse>
   */
  getWeather$(city: string | undefined) {
    return this.http.post<WeatherResponse>(`${environment.server}/weather`, {
      city,
    });
  }

  /**
   *
   * This function brings the weather settings
   *
   * @returns Observable<WeatherManagement>
   */
  getWeatherManagement$() {
    return this.http.get<WeatherManagement>(
      `${environment.server}/weather/weather-management`
    );
  }

  /**
   *
   * This function saves the weather settings
   *
   * @returns Observable<WeatherManagement>
   */
  postWeatherManagement$(weatherManagement: WeatherManagement) {
    return this.http.post<WeatherManagement>(
      `${environment.server}/weather/weather-management`,
      weatherManagement
    );
  }

  /**
   *
   * This function brings the days of week settings
   *
   * @returns Observable<DaysManagement>
   */
  getDaysManagement$() {
    return this.http.get<DaysManagement>(
      `${environment.server}/weather/days-management`
    );
  }

  /**
   *
   * This function saves the days of week settings
   *
   * @returns Observable<DaysManagement>
   */
  postDaysManagement$(daysManagement: DaysManagement) {
    return this.http.post<DaysManagement>(
      `${environment.server}/weather/days-management`,
      daysManagement
    );
  }
}
