import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuards {
  private role = 'admin';

  setRole(role: string) {
    this.role = role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
