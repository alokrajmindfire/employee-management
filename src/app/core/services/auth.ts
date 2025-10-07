import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = 'https://reqres.in/api/login';
  token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);
  private router = inject(Router);

  login(email: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-api-key', 'reqres-free-v1');
    return this.http.post<{ token: string }>(
      this.apiUrl,
      { email, password },
      { headers: headers },
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  isAuthenticated() {
    return !!this.token();
  }
}
