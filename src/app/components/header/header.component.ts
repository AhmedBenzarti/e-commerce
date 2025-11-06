import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, UserAvatarComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  cartItems = 2;
  isSearchOpen = false;
  isMobileMenuOpen = false;
  isDarkTheme = false;
  searchQuery = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme();
    
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const hasClass = document.body.classList.contains('dark-theme');
      }, 100);
    }
  }

  ngAfterViewInit() {
    this.initializeHeaderFunctionality();
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
    
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const hasClass = document.body.classList.contains('dark-theme');
      }, 100);
    }
  }

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
      this.searchQuery = '';
    }
  }

  private initializeHeaderFunctionality() {
    if (isPlatformBrowser(this.platformId)) {
      const searchTrigger = document.querySelector('.search-trigger');
      const searchClose = document.querySelector('.search-close-switch');

      if (searchTrigger && searchClose) {
        searchTrigger.addEventListener('click', () => {
          this.isSearchOpen = true;
        });

        searchClose.addEventListener('click', () => {
          this.isSearchOpen = false;
        });
      }
    }
  }
}