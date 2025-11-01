import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private storageKey = 'violet_cart';

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1, size?: string, color?: string): void {
    const existingItem = this.cartItems.find(item => 
      item.product.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      });
    }

    this.saveCartToStorage();
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== itemId);
    this.saveCartToStorage();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage();
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem(this.storageKey);
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    }
  }
}