import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {
  
  cartForm!: FormGroup;
  
  cartItems = [
    {
      id: 1,
      name: 'Blue Dotted Shirt',
      price: 29,
      quantity: 1,
      image: 'assets/img/product/product-1.jpg',
      size: 'M',
      color: 'Blue'
    }
  ];

  shippingOptions = [
    {
      id: 'standard',
      name: 'Free Standard shipping',
      description: 'Estimate for New York',
      price: 0,
      selected: true
    },
    {
      id: 'nextday',
      name: 'Next Day delivery',
      description: '',
      price: 10,
      selected: false
    },
    {
      id: 'pickup',
      name: 'In Store Pickup',
      description: '',
      price: 0,
      selected: false
    }
  ];

  couponCode: string = '';

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.cartForm = this.fb.group({
      couponCode: ['']
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get shippingCost(): number {
    const selectedShipping = this.shippingOptions.find(option => option.selected);
    return selectedShipping ? selectedShipping.price : 0;
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  getItemTotal(item: any): number {
    return item.price * item.quantity;
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  clearCart() {
    this.cartItems = [];
  }

  updateCart() {
    // Logique pour mettre à jour le panier
    console.log('Cart updated:', this.cartItems);
  }

  selectShipping(optionId: string) {
    this.shippingOptions.forEach(option => {
      option.selected = option.id === optionId;
    });
  }

  applyCoupon() {
    const coupon = this.cartForm.get('couponCode')?.value;
    if (coupon) {
      // Logique pour appliquer le coupon
      console.log('Coupon applied:', coupon);
      this.couponCode = coupon;
      // Réinitialiser le champ
      this.cartForm.get('couponCode')?.setValue('');
    }
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Naviguer vers la page checkout
    console.log('Proceeding to checkout with items:', this.cartItems);
    // this.router.navigate(['/check-out']);
  }

  continueShopping() {
    // Naviguer vers la page categories ou home
    // this.router.navigate(['/categories']);
  }
}