import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
