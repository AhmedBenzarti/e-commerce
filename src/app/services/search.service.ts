import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { Product, ProductsService } from './products.service';

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'tag';
  text: string;
  product?: Product; // ← Doit être optionnel
  count?: number;
}

export interface SearchResult {
  products: Product[];
  suggestions: SearchSuggestion[];
  total: number;
  categories: string[];
  brands: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchHistory: string[] = [];
  private searchHistorySubject = new BehaviorSubject<string[]>([]);
  
  searchHistory$: Observable<string[]> = this.searchHistorySubject.asObservable();
  private maxHistoryItems = 10;

  constructor(private productsService: ProductsService) {
    this.loadSearchHistory();
  }

  search(query: string): Observable<SearchResult> {
    if (query.trim()) {
      this.addToHistory(query.trim());
    }

    return this.productsService.getProducts().pipe(
      delay(300), // Simulation délai réseau
      map(products => this.filterProducts(products, query)),
      map(filteredProducts => this.generateSearchResult(filteredProducts, query))
    );
  }

  getSuggestions(query: string): Observable<SearchSuggestion[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    return this.productsService.getProducts().pipe(
      delay(150),
      map(products => this.generateSuggestions(products, query))
    );
  }

  private filterProducts(products: Product[], query: string): Product[] {
    const searchTerm = query.toLowerCase().trim();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  private generateSearchResult(products: Product[], query: string): SearchResult {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand))];
    
    const suggestions: SearchSuggestion[] = [];

    // Suggestions de catégories
    categories.forEach(category => {
      if (category.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({
          type: 'category',
          text: `Catégorie: ${category}`,
          count: products.filter(p => p.category === category).length
        });
      }
    });

    // Suggestions de marques
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({
          type: 'brand',
          text: `Marque: ${brand}`,
          count: products.filter(p => p.brand === brand).length
        });
      }
    });

    // Suggestions de tags
    const allTags = products.flatMap(p => p.tags);
    const uniqueTags = [...new Set(allTags)];
    
    uniqueTags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({
          type: 'tag',
          text: `Tag: ${tag}`,
          count: allTags.filter(t => t === tag).length
        });
      }
    });

    return {
      products,
      suggestions: suggestions.slice(0, 5), // Limiter à 5 suggestions
      total: products.length,
      categories,
      brands
    };
  }

  private generateSuggestions(products: Product[], query: string): SearchSuggestion[] {
  const searchTerm = query.toLowerCase();
  const suggestions: SearchSuggestion[] = [];

  // Produits correspondants
  const productMatches = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    )
    .slice(0, 3);

  productMatches.forEach(product => {
    suggestions.push({
      type: 'product',
      text: product.name,
      product: product // ← S'assurer que product est bien défini
    });
  });

    // Catégories correspondantes
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'category',
          text: `Dans ${category}`,
          count: products.filter(p => p.category === category).length
        });
      }
    });

    // Marques correspondantes
    const brands = [...new Set(products.map(p => p.brand))];
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'brand',
          text: `Marque ${brand}`,
          count: products.filter(p => p.brand === brand).length
        });
      }
    });

    return suggestions.slice(0, 8); // Limiter à 8 suggestions
  }

  private addToHistory(query: string): void {
    this.searchHistory = this.searchHistory.filter(item => item !== query);
    this.searchHistory.unshift(query);
    
    if (this.searchHistory.length > this.maxHistoryItems) {
      this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
    }
    
    this.searchHistorySubject.next([...this.searchHistory]);
    this.saveSearchHistory();
  }

  clearHistory(): void {
    this.searchHistory = [];
    this.searchHistorySubject.next([]);
    localStorage.removeItem('eshop_search_history');
  }

  private saveSearchHistory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('eshop_search_history', JSON.stringify(this.searchHistory));
    }
  }

  private loadSearchHistory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedHistory = localStorage.getItem('eshop_search_history');
      if (savedHistory) {
        try {
          this.searchHistory = JSON.parse(savedHistory);
          this.searchHistorySubject.next([...this.searchHistory]);
        } catch (error) {
          console.error('Error loading search history:', error);
        }
      }
    }
  }

  // Recherche populaire (simulée)
  getPopularSearches(): string[] {
    return ['smartphone', 'casque audio', 'running', 'livre angular', 'cafetière'];
  }

  // Produits fréquemment consultés (simulé)
  getTrendingProducts(): Observable<Product[]> {
    return this.productsService.getProducts().pipe(
      map(products => products.filter(p => p.isFeatured).slice(0, 5))
    );
  }
}