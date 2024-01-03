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
import { DaysManagement } from '../home/types/days-management';

@Component({
  selector: 'app-day-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './day-management.component.html',
  styleUrl: './day-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DayManagementComponent {
  private fb = inject(FormBuilder);
  private environmentInjector = inject(EnvironmentInjector);
  private cdr = inject(ChangeDetectorRef);
  private weatherService = inject(WeatherService);
  private submitting = false;

  form = this.fb.group({
    days: this.fb.control(7, {
      nonNullable: true,
      validators: Validators.required,
    }),
    includeToday: this.fb.control(false, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  get days() {
    return this.form.get('days');
  }

  get includeToday() {
    return this.form.get('includeToday');
  }

  get validatedForm() {
    return this.form.dirty && this.form.valid && !this.submitting;
  }

  constructor() {
    this.weatherService
      .getDaysManagement$()
      .pipe(takeUntilDestroyed())
      .subscribe((daysManagement) => {
        this.form.patchValue(daysManagement);
      });
  }

  /**
   * Save day of the week settings
   */
  submit() {
    this.submitting = true;

    const daysManagement: DaysManagement = {
      days: this.days?.value,
      includeToday: this.includeToday?.value,
    };

    runInInjectionContext(this.environmentInjector, () => {
      this.weatherService
        .postDaysManagement$(daysManagement)
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.submitting = false;
          alert('Your changes has been saved!');
          this.cdr.markForCheck();
        });
    });
  }
}
