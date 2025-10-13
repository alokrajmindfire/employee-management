import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth-service/auth';
import { Router } from '@angular/router';
import { Card } from '../../component/card/card';
import { Theme } from '../../component/theme/theme';
import { ToastService } from '../../core/services/toast/toast.service.ts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Card, Theme],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);

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
        this.toast.show('Login successful!', 'success');
        this.auth.setToken(res.token);
        this.router.navigate(['/']);
        this.loading.set(false);
      },
      error: (e) => {
        console.log(e);
        this.toast.show(e.error.error || 'Invalid credentials', 'error');
        this.error.set(e.error.error || 'Invalid credentials');
        this.loading.set(false);
      },
    });
  }
}
