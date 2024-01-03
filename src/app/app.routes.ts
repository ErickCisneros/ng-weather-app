import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'weather-management',
    loadComponent: () =>
      import('./pages/weather-management/weather-management.component'),
  },
  {
    path: 'day-management',
    loadComponent: () =>
      import('./pages/day-management/day-management.component'),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
