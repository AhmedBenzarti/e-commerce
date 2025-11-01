import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  cartItems = 2;
  isSearchOpen = false;
  isMobileMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    // Initialisation si nécessaire
  }

  ngAfterViewInit() {
    // Initialiser les fonctionnalités JavaScript après le rendu
    this.initializeHeaderFunctionality();
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearch(event: Event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput && searchInput.value.trim()) {
      console.log('Searching for:', searchInput.value);
      // Implémenter la logique de recherche ici
      this.isSearchOpen = false;
      searchInput.value = '';
    }
  }

  private initializeHeaderFunctionality() {
    // Vérifier si on est côté client (browser)
    if (isPlatformBrowser(this.platformId)) {
      // Search functionality
      const searchTrigger = document.querySelector('.search-trigger');
      const searchClose = document.querySelector('.search-close-switch');
      const searchModel = document.querySelector('.search-model');

      if (searchTrigger && searchClose && searchModel) {
        searchTrigger.addEventListener('click', () => {
          this.isSearchOpen = true;
        });

        searchClose.addEventListener('click', () => {
          this.isSearchOpen = false;
        });
      }

      // Mobile menu functionality
      const mobileMenu = document.querySelector('.mobile-menu');
      // Initialiser le menu mobile si nécessaire
    }
  }
}