import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';
  
  // Plages horaires pour le mode sombre (18h à 6h)
  private darkModeStartHour = 18; // 18h (6PM)
  private darkModeEndHour = 6;    // 6h (6AM)

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const userPreference = localStorage.getItem('user-preference');
      
      // Si l'utilisateur a déjà fait un choix manuel, on le respecte
      if (userPreference === 'manual' && savedTheme) {
        this.applyTheme(savedTheme);
      } else {
        // Sinon, détection automatique par heure
        this.autoDetectThemeByTime();
      }
    }
  }

  /**
   * Détection automatique du thème basée sur l'heure locale
   * Mode sombre activé entre 18h (6PM) et 6h (6AM)
   */
  private autoDetectThemeByTime(): void {
    const now = new Date();
    const currentHour = now.getHours();
    
    const isNightTime = currentHour >= this.darkModeStartHour || currentHour < this.darkModeEndHour;
    
    if (isNightTime) {
      this.applyTheme('dark');
    } else {
      this.applyTheme('light');
    }
  }

  /**
   * Vérifie périodiquement si le thème doit changer
   * Utile pour les utilisateurs qui gardent l'application ouverte longtemps
   */
  startAutoThemeChecker(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifier toutes les heures si le thème doit changer
      setInterval(() => {
        const userPreference = localStorage.getItem('user-preference');
        if (userPreference !== 'manual') {
          console.log('⏰ Vérification automatique du thème...');
          this.autoDetectThemeByTime();
        }
      }, 60 * 60 * 1000); // 1 heure
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    
    if (isPlatformBrowser(this.platformId)) {
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      localStorage.setItem('theme', theme);
    }
  }

  /**
   * Bascule entre les thèmes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    
    // Quand l'utilisateur bascule manuellement, on sauvegarde sa préférence
    localStorage.setItem('user-preference', 'manual');
  }

  /**
   * Définit un thème spécifique
   */
  setTheme(theme: 'light' | 'dark'): void {
    this.applyTheme(theme);
    localStorage.setItem('user-preference', 'manual');
  }

  /**
   * Active la détection automatique
   */
  enableAutoTheme(): void {
    localStorage.removeItem('user-preference');
    this.autoDetectThemeByTime();
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Retourne l'heure locale de l'utilisateur
   */
  getUserLocalTime(): string {
    if (isPlatformBrowser(this.platformId)) {
      return new Date().toLocaleTimeString('fr-FR');
    }
    return 'N/A';
  }

  /**
   * Retourne le mode de décision du thème
   */
  getThemeDecisionMode(): string {
    if (isPlatformBrowser(this.platformId)) {
      const userPref = localStorage.getItem('user-preference');
      const savedTheme = localStorage.getItem('theme');
      
      if (userPref === 'manual') {
        return 'manuel';
      } else if (savedTheme) {
        return 'sauvegardé';
      } else {
        return 'automatique (heure)';
      }
    }
    return 'N/A';
  }

  /**
   * Configuration des plages horaires (optionnel)
   */
  setDarkModeHours(start: number, end: number): void {
    this.darkModeStartHour = start;
    this.darkModeEndHour = end;
  }

  /**
   * Obtenir la configuration actuelle
   */
  getDarkModeSchedule(): { start: number, end: number } {
    return {
      start: this.darkModeStartHour,
      end: this.darkModeEndHour
    };
  }
}