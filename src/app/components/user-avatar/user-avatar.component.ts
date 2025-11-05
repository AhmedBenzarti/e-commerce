import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  isOpen = false;
  isLoggedIn = false;
  userName = 'Invité';
  isDarkTheme = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.detectTheme();
  }

  // Méthode simple pour détecter le thème
  detectTheme() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Vérifier directement si le body a la classe dark-theme
      this.isDarkTheme = document.body.classList.contains('dark-theme');
      
      console.log('🔍 Thème détecté:', this.isDarkTheme ? 'DARK' : 'LIGHT');
      
      // Observer les changements de thème
      const observer = new MutationObserver(() => {
        this.isDarkTheme = document.body.classList.contains('dark-theme');
        console.log('🔄 Thème changé:', this.isDarkTheme ? 'DARK' : 'LIGHT');
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-avatar-container')) {
      this.closeDropdown();
    }
  }

  onProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/profile']);
  }

  onSettings(): void {
    this.closeDropdown();
    this.router.navigate(['/settings']);
  }

  onHelp(): void {
    this.closeDropdown();
    this.router.navigate(['/help']);
  }

  onLogin(): void {
    this.closeDropdown();
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    this.closeDropdown();
    this.router.navigate(['/register']);
  }

  onLogout(): void {
    this.closeDropdown();
    this.isLoggedIn = false;
    this.userName = 'Invité';
    this.router.navigate(['/']);
  }

  simulateLogin(event: Event): void {
    event.stopPropagation();
    this.isLoggedIn = true;
    this.userName = 'Alexandre';
  }
}