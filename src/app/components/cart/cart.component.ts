import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem, Cart } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;
  
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((cart: Cart) => {
      this.cartItems = cart.items;
      this.subtotal = cart.subtotal;
      this.shipping = cart.shipping;
      this.total = cart.total;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  updateQuantity(item: CartItem, event: any): void {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    console.log('Procéder au checkout:', this.cartItems);
    alert('Redirection vers la page de paiement (à implémenter)');
  }
}