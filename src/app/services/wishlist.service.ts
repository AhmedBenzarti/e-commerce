import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];
  private wishlistSubject = new BehaviorSubject<Product[]>([]);
  
  wishlist$: Observable<Product[]> = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlistFromStorage();
  }

  addToWishlist(product: Product): void {
    if (!this.isInWishlist(product.id)) {
      this.wishlistItems.push(product);
      this.updateWishlist();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
    this.updateWishlist();
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.updateWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(item => item.id === productId);
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  getWishlistItems(): Product[] {
    return [...this.wishlistItems];
  }

  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  private updateWishlist(): void {
    this.wishlistSubject.next([...this.wishlistItems]);
    this.saveWishlistToStorage();
  }

  private saveWishlistToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('eshop_wishlist', JSON.stringify(this.wishlistItems));
    }
  }

  private loadWishlistFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedWishlist = localStorage.getItem('eshop_wishlist');
      if (savedWishlist) {
        try {
          this.wishlistItems = JSON.parse(savedWishlist);
          this.wishlistSubject.next([...this.wishlistItems]);
        } catch (error) {
          console.error('Error loading wishlist:', error);
          this.wishlistItems = [];
        }
      }
    }
  }
}