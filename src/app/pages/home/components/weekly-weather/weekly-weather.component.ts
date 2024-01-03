import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { format } from 'date-fns';
import { WeatherService } from '../../../../services/weather.service';
import { ChartData } from '../../types/chart-data';
import { DailyWeather } from '../../types/daily-weather';
import { WeatherChartComponent } from '../weather-chart/weather-chart.component';

@Component({
  selector: 'app-weekly-weather',
  standalone: true,
  imports: [CommonModule, WeatherChartComponent],
  templateUrl: './weekly-weather.component.html',
  styleUrl: './weekly-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyWeatherComponent implements OnChanges, OnInit {
  @Input() dailyWeather!: DailyWeather[] | undefined;

  temperature: ChartData | undefined;
  precipitation: ChartData | undefined;
  humidity: ChartData | undefined;
  wind: ChartData | undefined;
  temperatureUnit: string | undefined;
  windUnit: string | undefined;

  private weatherService = inject(WeatherService);

  constructor() {
    this.weatherService
      .getWeatherManagement$()
      .pipe(takeUntilDestroyed())
      .subscribe((weatherManagement) => {
        switch (weatherManagement.units) {
          case 'metric':
            this.temperatureUnit = '(°C)';
            this.windUnit = '(m/s)';
            break;
          case 'imperial':
            this.temperatureUnit = '(°F)';
            this.windUnit = '(mi/h)';
            break;
          case 'standard':
            this.temperatureUnit = '(°K)';
            this.windUnit = '(m/s)';
            break;
        }
      });
  }

  ngOnInit(): void {
    this.setUpChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['dailyWeather'].firstChange) {
      this.setUpChart();
    }
  }

  /**
   * Chart configuration with the respective data
   */
  private setUpChart(): void {
    if (!this.dailyWeather) {
      return;
    }

    this.temperature = {
      labels: this.dailyWeather?.map((weather) => format(weather.dt, 'MMM d')),
      datasets: [
        {
          label: `Morning`,
          data: this.dailyWeather?.map((weather) => weather.weather.temp.morn),
          tension: 0.4,
        },
        {
          label: `Day`,
          data: this.dailyWeather?.map((weather) => weather.weather.temp.day),
          tension: 0.4,
        },
        {
          label: `Night`,
          data: this.dailyWeather?.map((weather) => weather.weather.temp.night),
          tension: 0.4,
        },
      ],
    };

    this.precipitation = {
      labels: this.dailyWeather?.map((weather) => format(weather.dt, 'MMM d')),
      datasets: [
        {
          label: `Precip. chance`,
          data: this.dailyWeather?.map((weather) => weather.weather.rain),
          tension: 0.4,
        },
      ],
    };

    this.humidity = {
      labels: this.dailyWeather?.map((weather) => format(weather.dt, 'MMM d')),
      datasets: [
        {
          label: `Humidity`,
          data: this.dailyWeather?.map((weather) => weather.weather.humidity),
          tension: 0.4,
        },
      ],
    };

    this.wind = {
      labels: this.dailyWeather?.map((weather) => format(weather.dt, 'MMM d')),
      datasets: [
        {
          label: `Wind`,
          data: this.dailyWeather?.map((weather) => weather.weather.wind.speed),
          tension: 0.4,
        },
      ],
    };
  }
}
