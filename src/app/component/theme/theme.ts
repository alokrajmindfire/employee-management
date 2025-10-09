import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme-service/theme-service';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
})
export class Theme {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getTheme();
  }
}
