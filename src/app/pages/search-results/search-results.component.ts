import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  products: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.performSearch(this.searchQuery);
      }
    });
  }

  private performSearch(query: string) {
    // Simulation de données - À remplacer par votre API
    const mockProducts = [
      { id: 1, name: 'T-Shirt Blanc', price: 29.99, image: 'assets/img/products/product-1.jpg', category: 'Vêtements' },
      { id: 2, name: 'Jean Slim Noir', price: 39.99, image: 'assets/img/products/product-2.jpg', category: 'Vêtements' },
      { id: 3, name: 'Chaussures Sport', price: 19.99, image: 'assets/img/products/product-3.jpg', category: 'Chaussures' }
    ];

    this.products = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }
}