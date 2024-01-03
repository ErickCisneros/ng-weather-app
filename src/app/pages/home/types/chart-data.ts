export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  backgroundColor?: string[];
  borderColor?: string;
  data: number[];
  label: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  tension: number;
}
