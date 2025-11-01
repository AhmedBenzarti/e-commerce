import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var $: any;

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string[];
  status?: 'new' | 'sale' | 'popular';
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements AfterViewInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-1.jpg',
      category: ['dresses', 'bags'],
      status: 'new'
    },
    // ... autres produits
  ];

  categories = [
    { key: '*', name: 'All' },
    { key: '.dresses', name: 'Dresses' },
    { key: '.bags', name: 'Bags' },
    { key: '.shoes', name: 'Shoes' },
    { key: '.accesories', name: 'Accesories' }
  ];

  activeFilter = '*';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    this.initializeMixItUp();
  }

  private initializeMixItUp() {
    if (isPlatformBrowser(this.platformId) && typeof $ !== 'undefined' && $.fn.mixItUp) {
      setTimeout(() => {
        $('#product-list').mixItUp();
      }, 0);
    }
  }

  filterProducts(category: string) {
    this.activeFilter = category;
    
    if (isPlatformBrowser(this.platformId) && typeof $ !== 'undefined' && $.fn.mixItUp) {
      $('#product-list').mixItUp('filter', category);
    }
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'new': return 'new';
      case 'sale': return 'sale';
      case 'popular': return 'popular';
      default: return '';
    }
  }
}