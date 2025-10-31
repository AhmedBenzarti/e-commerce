import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchSuggestion } from '../../services/search.service';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;
  @Output() search = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<SearchSuggestion>();

  searchQuery = '';
  showSuggestions = false;
  suggestions: SearchSuggestion[] = [];
  searchHistory: string[] = [];
  popularSearches: string[] = [];
  isLoading = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchHistory$.subscribe(history => {
      this.searchHistory = history;
    });

    this.popularSearches = this.searchService.getPopularSearches();
  }

  onSearchInput(): void {
    if (this.searchQuery.length < 2) {
      this.suggestions = [];
      this.showSuggestions = true;
      return;
    }

    this.isLoading = true;
    this.searchService.getSuggestions(this.searchQuery).subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
        this.showSuggestions = true;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearchSubmit(): void {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery.trim());
      this.showSuggestions = false;
      // Vérifier que searchInput existe avant d'appeler blur()
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.blur();
      }
    }
  }

  onSuggestionSelect(suggestion: SearchSuggestion): void {
    this.suggestionSelected.emit(suggestion);
    
    if (suggestion.type === 'product' && suggestion.product) {
      this.searchQuery = suggestion.product.name;
    } else {
      this.searchQuery = suggestion.text.replace(/^(Dans|Marque|Tag|Catégorie):?\s*/i, '');
    }
    
    this.showSuggestions = false;
    this.search.emit(this.searchQuery);
  }

  onHistorySelect(query: string): void {
    this.searchQuery = query;
    this.search.emit(query);
    this.showSuggestions = false;
  }

  onClearHistory(): void {
    this.searchService.clearHistory();
  }

  onFocus(): void {
    this.showSuggestions = true;
  }

  onBlur(): void {
    // Délai pour permettre le clic sur les suggestions
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.suggestions = [];
    this.showSuggestions = false;
  }

  getSuggestionIcon(suggestion: SearchSuggestion): string {
    switch (suggestion.type) {
      case 'product': return '📦';
      case 'category': return '📁';
      case 'brand': return '🏷️';
      case 'tag': return '🔖';
      default: return '🔍';
    }
  }

  getSuggestionDisplayText(suggestion: SearchSuggestion): string {
  if (suggestion.type === 'product' && suggestion.product) {
    return suggestion.product.name;
  }
  return suggestion.text;
}
}