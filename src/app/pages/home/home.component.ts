import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherComponent } from './components/weather/weather.component';
import { WeeklyWeatherComponent } from './components/weekly-weather/weekly-weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WeatherComponent, WeeklyWeatherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private weatherService = inject(WeatherService);
  private cdr = inject(ChangeDetectorRef);

  weather$ = this.weatherService.weather$;

  constructor() {
    this.weatherService
      .getWeather$(this.weatherService.location)
      .pipe(
        takeUntilDestroyed(),
        finalize(() => this.cdr.markForCheck())
      )
      .subscribe((weather) => {
        this.weatherService.weather.next(weather);
      });
  }
}
