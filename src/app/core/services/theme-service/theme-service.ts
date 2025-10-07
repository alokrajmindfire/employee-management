import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.initializeTheme();
  }

  // Initialize theme based on localStorage
  private initializeTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey);
    if (storedTheme) {
      this.setTheme(storedTheme); // Apply the stored theme
    } else {
      this.setTheme('light'); // Default to light theme if none is stored
    }
  }

  getTheme(): string {
    return localStorage.getItem(this.themeKey) || 'light'; // Default to light if no theme is set in localStorage
  }

  setTheme(theme: string): void {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}
