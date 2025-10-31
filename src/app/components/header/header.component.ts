import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, Cart } from '../../services/cart.service';
import { SearchService, SearchSuggestion } from '../../services/search.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component'; // ← Ajouter cette ligne
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SearchBarComponent,
    ThemeToggleComponent // ← Ajouter cette ligne
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  private cartSubscription: Subscription | undefined;
  
  navigationItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/products', label: 'Boutique', icon: '🛍️' },
    { path: '/cart', label: 'Panier', icon: '🛒' },
    { path: '/profile', label: 'Profil', icon: '👤' }
  ];

  isMobileMenuOpen = false;

  constructor(
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((cart: Cart) => {
      this.cartItemCount = cart.itemCount;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onSearch(query: string): void {
    // Rediriger vers la page produits avec le terme de recherche
    const searchParams = { search: query };
    console.log('Recherche:', query);
    // this.router.navigate(['/products'], { queryParams: searchParams });
  }

  onSuggestionSelected(suggestion: SearchSuggestion): void {
    console.log('Suggestion sélectionnée:', suggestion);
    // Implémenter la logique de navigation selon le type de suggestion
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}