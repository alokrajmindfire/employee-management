import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      return import('./home/home').then((m) => m.Home);
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login').then((m) => m.Login);
    },
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./not-found/not-found').then((m) => m.NotFound);
    },
  },
];
