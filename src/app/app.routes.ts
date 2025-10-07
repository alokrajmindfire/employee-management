import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guard';
import { ProtectedLayout } from './layout/protected-layout/protected-layout';

export const routes: Routes = [
  {
    path: '',
    component: ProtectedLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'task',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
