import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from '../../types/chart-data';

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherChartComponent implements OnChanges, OnDestroy {
  @Input() titleChart!: string;
  @Input() chartData!: ChartData;
  @Input() legends: boolean = false;

  @ViewChild('weatherChart') weatherChart!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;
  private canvas!: HTMLCanvasElement;

  constructor() {
    Chart.register(...registerables);
    afterNextRender(() => {
      if (!this.chartData?.datasets[0]?.data?.length) return;

      this.canvas = this.weatherChart?.nativeElement;
      this.setUpChart();
    });
  }

  ngOnChanges(): void {
    if (!this.chartData?.datasets[0]?.data?.length) return;

    if (this.chart) this.setUpChart();
  }

  ngOnDestroy(): void {
    if (!this.chartData?.datasets[0]?.data?.length) return;

    this.chart?.destroy();
  }

  get hasData(): boolean {
    return (
      this.chartData?.datasets[0]?.data?.length > 0 &&
      this.chartData?.labels?.length > 0
    );
  }

  /**
   * Chart configuration
   */
  private setUpChart = (): void => {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: this.chartData,
      options: {
        responsive: false,
        resizeDelay: 1000,
        plugins: {
          legend: {
            position: 'top',
            display: this.legends,
          },
          title: {
            display: true,
            text: this.titleChart,
          },
        },
      },
    });
  };
}
