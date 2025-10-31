import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductsService, Product, ProductFilter } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent], // ← Ajouter ProductCardComponent
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  
  // Filtres
  searchTerm = '';
  selectedCategory = 'Tous';
  selectedBrand = 'Tous';
  priceRange = { min: 0, max: 1000 };
  inStockOnly = false;
  minRating = 0;
  
  // UI State
  layout: 'grid' | 'list' = 'grid';
  sortBy: 'name' | 'price' | 'rating' | 'newest' = 'name';
  showFilters = false;
  isLoading = true;
  
  private productsSubscription: Subscription | undefined;

 constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private searchService: SearchService, // ← Ajouter
    private route: ActivatedRoute // ← Ajouter
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categories = ['Tous', ...this.productsService.getCategories()];
    this.brands = ['Tous', ...this.productsService.getBrands()];

    // Écouter les paramètres de recherche de l'URL
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
        this.applyFilters();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productsSubscription = this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Filtre recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filtre catégorie
    if (this.selectedCategory !== 'Tous') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filtre marque
    if (this.selectedBrand !== 'Tous') {
      filtered = filtered.filter(product => product.brand === this.selectedBrand);
    }

    // Filtre prix
    filtered = filtered.filter(product => 
      product.price >= this.priceRange.min && 
      product.price <= this.priceRange.max
    );

    // Filtre stock
    if (this.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filtre rating
    if (this.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= this.minRating);
    }

    // Tri
    filtered = this.sortProducts(filtered);

    this.filteredProducts = filtered;
  }

  sortProducts(products: Product[]): Product[] {
    switch (this.sortBy) {
      case 'price':
        return products.sort((a, b) => a.price - b.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'name':
      default:
        return products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onBrandChange(brand: string): void {
    this.selectedBrand = brand;
    this.applyFilters();
  }

  onPriceRangeChange(): void {
    this.applyFilters();
  }

  onRatingChange(rating: number): void {
    this.minRating = rating;
    this.applyFilters();
  }

  onStockFilterChange(): void {
    this.inStockOnly = !this.inStockOnly;
    this.applyFilters();
  }

  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.applyFilters();
  }

  onLayoutChange(layout: 'grid' | 'list'): void {
    this.layout = layout;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'Tous';
    this.selectedBrand = 'Tous';
    this.priceRange = { min: 0, max: 1000 };
    this.inStockOnly = false;
    this.minRating = 0;
    this.applyFilters();
  }

  quickAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  get activeFilterCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'Tous') count++;
    if (this.selectedBrand !== 'Tous') count++;
    if (this.inStockOnly) count++;
    if (this.minRating > 0) count++;
    if (this.priceRange.min > 0 || this.priceRange.max < 1000) count++;
    return count;
  }

  handleSearch(query: string): void {
    this.searchTerm = query;
    this.applyFilters();
  }
}