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
import { WeatherService } from '../../services/weather.service';
import { WeatherManagement } from '../home/types/weather-management';

@Component({
  selector: 'app-weather-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './weather-management.component.html',
  styleUrl: './weather-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WeatherManagementComponent {
  private fb = inject(FormBuilder);
  private environmentInjector = inject(EnvironmentInjector);
  private cdr = inject(ChangeDetectorRef);
  private weatherService = inject(WeatherService);
  private submitting = false;

  form = this.fb.group({
    units: this.fb.control('metric', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  get units() {
    return this.form.get('units');
  }

  get validatedForm() {
    return this.form.dirty && this.form.valid && !this.submitting;
  }

  constructor() {
    this.weatherService
      .getWeatherManagement$()
      .pipe(takeUntilDestroyed())
      .subscribe((weatherManagement) => {
        this.form.patchValue(weatherManagement);
      });
  }

  /**
   * Save weather settings
   */
  submit() {
    this.submitting = true;

    const weatherManagement: WeatherManagement = {
      units: this.units?.value,
    };

    runInInjectionContext(this.environmentInjector, () => {
      this.weatherService
        .postWeatherManagement$(weatherManagement)
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.submitting = false;
          alert('Your changes has been saved!');
          this.cdr.markForCheck();
        });
    });
  }
}
