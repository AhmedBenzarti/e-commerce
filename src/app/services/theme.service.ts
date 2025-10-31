import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  
  currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadTheme();
  }

  setTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);
    
    if (this.isBrowser) {
      localStorage.setItem('eshop_theme', theme);
      this.applyTheme(theme);
    }
  }

  toggleTheme(): void {
    const current = this.currentThemeSubject.value;
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private loadTheme(): void {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('eshop_theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme: Theme = savedTheme || 'auto';
    
    if (theme === 'auto') {
      theme = prefersDark ? 'dark' : 'light';
    }

    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) return;

    const isDark = theme === 'dark';
    this.isDarkModeSubject.next(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }

    this.updateThemeMetaTags(isDark);
  }

  private updateThemeMetaTags(isDark: boolean): void {
    if (!this.isBrowser) return;

    const themeColor = isDark ? '#1a1a1a' : '#667eea';
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.setAttribute('content', themeColor);
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  getIsDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}