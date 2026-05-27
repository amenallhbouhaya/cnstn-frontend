import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly title = signal('cnstn-frontend');
  protected readonly isDarkMode = signal(false);

  // Initializes the component or service dependencies.
  constructor() {
    this.initializeTheme();
  }

  // Switches between the light and dark themes.
  protected toggleTheme(): void {
    const nextThemeIsDark = !this.isDarkMode();
    this.isDarkMode.set(nextThemeIsDark);
    this.applyTheme(nextThemeIsDark ? 'dark' : 'light');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cnstn-theme', nextThemeIsDark ? 'dark' : 'light');
    }
  }

  // Restores the saved theme or the system preference on startup.
  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.applyTheme('light');
      return;
    }

    const storedTheme = localStorage.getItem('cnstn-theme');
    const preferredTheme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    this.isDarkMode.set(preferredTheme === 'dark');
    this.applyTheme(preferredTheme);
  }

  // Applies the selected theme to the document root.
  private applyTheme(theme: 'light' | 'dark'): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}