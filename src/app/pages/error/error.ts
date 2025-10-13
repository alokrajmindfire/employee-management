import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-error',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './error.html',
})
export class Error {
  message: string | null = '';
  route = inject(ActivatedRoute);
  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.message = params.get('message');
    });
  }
}
