import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { shareReplay } from 'rxjs';
import { WeatherService } from '../../../../services/weather.service';
import { CurrentWeather } from '../../types/current-weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  @Input() currentWeather!: CurrentWeather | undefined;

  private weatherService = inject(WeatherService);

  weatherManagement$ = this.weatherService
    .getWeatherManagement$()
    .pipe(shareReplay(1));

  get location() {
    return this.weatherService.location;
  }
}
