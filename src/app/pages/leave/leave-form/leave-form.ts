import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Leave } from '../../../core/services/leave/leave';
import { futureDateValidator } from '../../../utils/validators';
import { Card } from '../../../component/card/card';

@Component({
  selector: 'app-leave-form',
  imports: [CommonModule, ReactiveFormsModule, Card],
  templateUrl: './leave-form.html',
})
export class LeaveForm {
  private fb = inject(FormBuilder);
  private leaveService = inject(Leave);
  private location = inject(Location);
  form = this.fb.group({
    date: ['', [Validators.required, futureDateValidator()]], // <-- fixed
    type: ['Sick', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(5)]],
  });

  submit() {
    if (this.form.invalid) return;

    const leave = {
      date: this.form.value.date!,
      type: this.form.value.type as 'Sick' | 'Annual' | 'Casual',
      reason: this.form.value.reason!,
      status: 'Pending' as const,
    };

    this.leaveService.addLeave(leave);
    this.form.reset({
      date: '',
      type: 'Sick',
      reason: '',
    });
  }
  goBack(): void {
    this.location.back();
  }
  today = new Date();
  month = (this.today.getMonth() + 1).toString().padStart(2, '0');
  day = this.today.getDate().toString().padStart(2, '0');
  year = this.today.getFullYear();

  minDate = new Date();
}
