import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare var $: any;

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements AfterViewInit {
  
  category = {
    name: 'Dresses',
    breadcrumb: ['Home', 'Dresses', 'Night Dresses']
  };

  sortOptions = [
    { value: '', label: 'Sort by' },
    { value: 'orders', label: 'Orders' },
    { value: 'newest', label: 'Newest' },
    { value: 'price', label: 'Price' }
  ];

  itemsPerPageOptions = [2, 4, 6];
  selectedItemsPerPage: number = 4;
  currentSort: string = '';

  products = [
    {
      id: 1,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-9.jpg',
      status: 'new',
      hasHoverIcon: true
    },
    {
      id: 2,
      name: 'Yellow Maxi Dress',
      price: 25.90,
      image: 'assets/img/products/img-2.jpg',
      status: 'sale',
      hasHoverIcon: false
    },
    {
      id: 3,
      name: 'One piece bodysuit',
      price: 19.90,
      image: 'assets/img/products/img-3.jpg',
      status: 'new',
      hasHoverIcon: true
    },
    {
      id: 4,
      name: 'Yellow Maxi Dress',
      price: 25.90,
      image: 'assets/img/products/img-6.jpg',
      status: 'sale',
      hasHoverIcon: false
    },
    {
      id: 5,
      name: 'One piece bodysuit',
      price: 19.90,
      image: 'assets/img/products/img-1.jpg',
      status: '',
      hasHoverIcon: true
    },
    {
      id: 6,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-5.jpg',
      status: 'new',
      hasHoverIcon: true
    },
    {
      id: 7,
      name: 'Blue Dress with details',
      price: 35.50,
      image: 'assets/img/products/img-4.jpg',
      status: 'popular',
      hasHoverIcon: true
    },
    {
      id: 8,
      name: 'Blue Dress with details',
      price: 35.50,
      image: 'assets/img/products/img-8.jpg',
      status: 'popular',
      hasHoverIcon: true
    },
    {
      id: 9,
      name: 'Blue Dress with details',
      price: 35.50,
      image: 'assets/img/products/img-10.jpg',
      status: 'popular',
      hasHoverIcon: true
    },
    {
      id: 10,
      name: 'Yellow Maxi Dress',
      price: 25.50,
      image: 'assets/img/products/img-11.jpg',
      status: 'sale',
      hasHoverIcon: false
    },
    {
      id: 11,
      name: 'One piece bodysuit',
      price: 19.90,
      image: 'assets/img/products/img-12.jpg',
      status: 'new',
      hasHoverIcon: true
    },
    {
      id: 12,
      name: 'Yellow Maxi Dress',
      price: 25.90,
      image: 'assets/img/products/img-14.jpg',
      status: 'sale',
      hasHoverIcon: false
    },
    {
      id: 13,
      name: 'One piece bodysuit',
      price: 19.90,
      image: 'assets/img/products/img-15.jpg',
      status: '',
      hasHoverIcon: true
    },
    {
      id: 14,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-13.jpg',
      status: 'new',
      hasHoverIcon: true
    }
  ];

  displayedProducts: any[] = [];
  currentPage: number = 1;
  totalProducts: number = this.products.length;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute
  ) {
    this.updateDisplayedProducts();
  }

  ngAfterViewInit() {
    this.initializeMagnificPopup();
  }

  private initializeMagnificPopup() {
    if (isPlatformBrowser(this.platformId) && typeof $ !== 'undefined' && $.fn.magnificPopup) {
      setTimeout(() => {
        $('.pop-up').magnificPopup({
          type: 'image',
          gallery: {
            enabled: true
          }
        });
      }, 0);
    }
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.selectedItemsPerPage;
    const endIndex = startIndex + this.selectedItemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  onSortChange(event: any) {
    this.currentSort = event.target.value;
    // Implémenter la logique de tri ici
    this.sortProducts();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.selectedItemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  private sortProducts() {
    switch (this.currentSort) {
      case 'price':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
        // Trier par ID (supposant que les IDs plus élevés sont plus récents)
        this.products.sort((a, b) => b.id - a.id);
        break;
      case 'orders':
        // Logique de tri par commandes (à implémenter si vous avez ces données)
        break;
      default:
        // Tri par défaut
        this.products.sort((a, b) => a.id - b.id);
    }
    this.updateDisplayedProducts();
  }

  loadMore() {
    this.currentPage++;
    const startIndex = (this.currentPage - 1) * this.selectedItemsPerPage;
    const endIndex = startIndex + this.selectedItemsPerPage;
    const newProducts = this.products.slice(startIndex, endIndex);
    this.displayedProducts = [...this.displayedProducts, ...newProducts];
  }

  canLoadMore(): boolean {
    return this.displayedProducts.length < this.products.length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'new': return 'new';
      case 'sale': return 'sale';
      case 'popular': return 'popular';
      default: return '';
    }
  }

  getProductLayoutClass(index: number): string {
    // Cette logique détermine la disposition basée sur la structure HTML originale
    if (index === 0) return 'col-lg-6 col-md-6';
    if (index >= 1 && index <= 4) return 'col-lg-6 col-md-6';
    if (index >= 5 && index <= 8) return 'col-lg-3 col-md-6';
    if (index >= 9 && index <= 12) return 'col-lg-6 col-md-6';
    return 'col-lg-6 col-md-6';
  }

  isNestedRow(index: number): boolean {
    // Détermine si le produit fait partie d'une ligne imbriquée
    return (index >= 1 && index <= 4) || (index >= 9 && index <= 12);
  }

  getNestedRowProducts(): any[][] {
    // Retourne les produits groupés pour les lignes imbriquées
    const nestedGroups = [];
    for (let i = 1; i <= 4; i += 4) {
      nestedGroups.push(this.products.slice(i, i + 4));
    }
    for (let i = 9; i <= 12; i += 4) {
      nestedGroups.push(this.products.slice(i, i + 4));
    }
    return nestedGroups;
  }

  getMainProducts(): any[] {
    // Retourne les produits principaux (non imbriqués)
    return this.products.filter((_, index) => 
      index === 0 || (index >= 5 && index <= 8) || index === 13
    );
  }
}