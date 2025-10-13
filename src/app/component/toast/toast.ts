import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast/toast.service.ts';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
})
export class Toast {
  private toastService = inject(ToastService);
  toasts = computed(() => this.toastService.toasts());
}
