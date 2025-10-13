import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme-service/theme-service';
import { Toast } from './component/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(ThemeService);
  }
  protected readonly title = signal('employee_management');
}
