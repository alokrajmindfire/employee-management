import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: Toast['type'] = 'info') {
    const toast: Toast = { message, type };
    this.toasts.update((prev) => [...prev, toast]);

    setTimeout(() => this.remove(toast), 3000);
  }

  remove(toast: Toast) {
    this.toasts.update((prev) => prev.filter((t) => t !== toast));
  }
}
