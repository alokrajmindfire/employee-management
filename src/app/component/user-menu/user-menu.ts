import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth-service/auth';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule],
  templateUrl: './user-menu.html',
})
export class UserMenu {
  private auth = inject(Auth);
  logout() {
    this.auth.logout();
  }
}
