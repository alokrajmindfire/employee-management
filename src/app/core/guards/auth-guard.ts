import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

export class AuthGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
