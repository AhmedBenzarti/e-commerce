import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<Cart>(this.getCartSummary());
  private isBrowser: boolean;
  
  cart$: Observable<Cart> = this.cartSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Charger le panier depuis le localStorage au démarrage seulement si on est dans le navigateur
    if (this.isBrowser) {
      this.loadCartFromStorage();
    }
  }

  // Ajouter un produit au panier
  addToCart(product: any, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        inStock: product.inStock !== false
      });
    }
    
    this.updateCart();
  }

  // Supprimer un article du panier
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  // Mettre à jour la quantité d'un article
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Obtenir le nombre total d'articles
  getItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le résumé du panier
  private getCartSummary(): Cart {
    const subtotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;
    const itemCount = this.getItemCount();

    return {
      items: [...this.cartItems],
      subtotal,
      shipping,
      total,
      itemCount
    };
  }

  // Mettre à jour le panier et notifier les observateurs
  private updateCart(): void {
    const cartSummary = this.getCartSummary();
    this.cartSubject.next(cartSummary);
    
    // Sauvegarder seulement si on est dans le navigateur
    if (this.isBrowser) {
      this.saveCartToStorage();
    }
  }

  // Sauvegarder le panier dans le localStorage
  private saveCartToStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem('eshop_cart', JSON.stringify(this.cartItems));
    }
  }

  // Charger le panier depuis le localStorage
  private loadCartFromStorage(): void {
    if (!this.isBrowser) return;

    const savedCart = localStorage.getItem('eshop_cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.updateCart();
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        this.cartItems = [];
      }
    }
  }

  // Obtenir les articles du panier (pour compatibilité)
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Vérifier si un produit est dans le panier
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }

  // Obtenir la quantité d'un produit dans le panier
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }
}