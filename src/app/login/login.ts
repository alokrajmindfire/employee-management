import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../core/services/auth';
import { Router } from '@angular/router';
import { Card } from '../component/card/card';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Card],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['cityslicka', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/']);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Invalid credentials');
        this.loading.set(false);
      },
    });
  }
}
