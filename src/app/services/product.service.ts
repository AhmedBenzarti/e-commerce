import { Injectable } from '@angular/core';
import { Product, Category } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-1.jpg',
      category: ['dresses', 'bags'],
      status: 'new',
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Green', 'Blue', 'Red']
    },
    // ... autres produits
  ];

  private categories: Category[] = [
    { id: 1, name: 'Dresses', slug: 'dresses', productCount: 15 },
    { id: 2, name: 'Bags', slug: 'bags', productCount: 8 },
    { id: 3, name: 'Shoes', slug: 'shoes', productCount: 12 },
    { id: 4, name: 'Accessories', slug: 'accesories', productCount: 20 }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.includes(category.toLowerCase())
    );
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.status === 'popular').slice(0, 4);
  }

  getNewArrivals(): Product[] {
    return this.products.filter(product => product.status === 'new').slice(0, 6);
  }

  getProductDetails(id: number): any {
  const products = [
    {
      id: 1,
      name: 'Dotted Blue Shirt',
      price: 22.90,
      images: ['assets/img/product/product-1.jpg'],
      category: 'Men\'s Wear',
      // ... autres propriétés
    },
    // ... autres produits détaillés
  ];
  return products.find(product => product.id === id);
}
}