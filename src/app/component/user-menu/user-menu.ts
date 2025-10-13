import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth-service/auth';
import { ToastService } from '../../core/services/toast/toast.service.ts';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule],
  templateUrl: './user-menu.html',
})
export class UserMenu {
  private auth = inject(Auth);
  private toast = inject(ToastService);

  logout() {
    this.auth.logout();
    this.toast.show('Logout successful!', 'success');
  }
}
