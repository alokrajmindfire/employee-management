import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guards/no-auth-guard';
import { ProtectedLayout } from './layout/protected-layout/protected-layout';

export const routes: Routes = [
  {
    path: '',
    component: ProtectedLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'tasks',
        pathMatch: 'full',
        loadComponent: () => import('./pages/task/task').then((m) => m.TasksPage),
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
    path: 'leaves',
    component: ProtectedLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/leave/leave-list/leave-list').then((m) => m.LeaveList),
      },
      {
        path: 'apply',
        pathMatch: 'full',
        loadComponent: () => import('./pages/leave/leave-form/leave-form').then((m) => m.LeaveForm),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    pathMatch: 'full',
    loadComponent: () => import('./pages/error/error').then((m) => m.Error),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
