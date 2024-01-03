import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private weatherService = inject(WeatherService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private environmentInjector = inject(EnvironmentInjector);

  public form = this.fb.group({
    search: this.fb.control('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  get search() {
    return this.form.get('search');
  }

  searchCity() {
    this.weatherService.location = this.search?.value;

    runInInjectionContext(this.environmentInjector, () => {
      this.weatherService
        .getWeather$(this.search?.value)
        .pipe(
          takeUntilDestroyed(),
          finalize(() => this.cdr.markForCheck())
        )
        .subscribe((weather) => {
          this.weatherService.weather.next(weather);
        });
    });
  }
}
