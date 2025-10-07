import { Component, inject } from '@angular/core';
import { NavLinks } from '../nav-links/nav-links';
import { UserMenu } from '../user-menu/user-menu';
import { ThemeService } from '../../core/services/theme-service/theme-service';

@Component({
  selector: 'app-header',
  imports: [NavLinks, UserMenu],
  templateUrl: './header.html',
})
export class Header {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getTheme();
  }
}
