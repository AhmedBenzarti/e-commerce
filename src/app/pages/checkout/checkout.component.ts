import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService, User } from '../../services/auth.service';

interface CheckoutForm {
  shippingAddress: FormGroup;
  billingAddress: FormGroup;
  paymentMethod: FormGroup;
  useSameAddress: boolean;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;
  currentStep: 'shipping' | 'payment' | 'review' = 'shipping';
  isLoading = false;
  currentUser: User | null = null;

  paymentMethods = [
    { id: 'card', name: 'Carte de crédit', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'applepay', name: 'Apple Pay', icon: '🍎' },
    { id: 'googlepay', name: 'Google Pay', icon: '⚡' }
  ];

  shippingOptions = [
    { id: 'standard', name: 'Livraison standard', price: 4.99, days: '2-3 jours' },
    { id: 'express', name: 'Livraison express', price: 9.99, days: '24h' },
    { id: 'free', name: 'Livraison gratuite', price: 0, days: '3-5 jours', minAmount: 50 }
  ];

  selectedShipping = 'standard';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCartData();
    this.currentUser = this.authService.getCurrentUser();
    this.prefillUserData();
  }

  ngOnDestroy(): void {}

  createForm(): FormGroup {
    const addressGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['France', [Validators.required]],
      phone: ['', [Validators.pattern(/^\+?[0-9\s\-\(\)]{10,}$/)]]
    });

    return this.fb.group({
      shippingAddress: addressGroup,
      billingAddress: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        country: ['France', [Validators.required]]
      }),
      useSameAddress: [true],
      paymentMethod: this.fb.group({
        method: ['card', [Validators.required]],
        cardNumber: [''],
        expiryDate: [''],
        cvv: [''],
        cardholder: ['']
      }),
      shippingMethod: ['standard', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }

  loadCartData(): void {
    const cart = this.cartService.getCartItems();
    this.cartItems = cart;
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const shippingOption = this.shippingOptions.find(opt => opt.id === this.selectedShipping);
    this.shipping = shippingOption ? shippingOption.price : 0;
    
    // Livraison gratuite si montant suffisant
    if (this.subtotal >= 50 && shippingOption?.id === 'free') {
      this.shipping = 0;
    }
    
    this.total = this.subtotal + this.shipping;
  }

  prefillUserData(): void {
    if (this.currentUser) {
      this.checkoutForm.patchValue({
        shippingAddress: {
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          phone: this.currentUser.phone,
          ...this.currentUser.address
        }
      });
    }
  }

  onUseSameAddressChange(): void {
    const useSame = this.checkoutForm.get('useSameAddress')?.value;
    if (useSame) {
      const shippingAddress = this.checkoutForm.get('shippingAddress')?.value;
      this.checkoutForm.patchValue({
        billingAddress: shippingAddress
      });
    }
  }

  onShippingMethodChange(): void {
    this.selectedShipping = this.checkoutForm.get('shippingMethod')?.value;
    this.calculateTotals();
  }

  goToStep(step: 'shipping' | 'payment' | 'review'): void {
    if (this.validateStep(this.currentStep)) {
      this.currentStep = step;
    }
  }

  validateStep(step: string): boolean {
    switch (step) {
      case 'shipping':
        return this.checkoutForm.get('shippingAddress')?.valid || false;
      case 'payment':
        return this.checkoutForm.get('paymentMethod')?.valid || false;
      default:
        return true;
    }
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      
      // Simulation de traitement de commande
      setTimeout(() => {
        this.isLoading = false;
        const orderId = 'CMD-' + Date.now();
        
        // Vider le panier
        this.cartService.clearCart();
        
        // Rediriger vers la confirmation
        this.router.navigate(['/order-confirmation'], { 
          queryParams: { orderId } 
        });
      }, 2000);
    }
  }

  getProgressWidth(): string {
    switch (this.currentStep) {
      case 'shipping': return '33%';
      case 'payment': return '66%';
      case 'review': return '100%';
      default: return '0%';
    }
  }

  getSelectedShippingOption(): any {
    return this.shippingOptions.find(opt => opt.id === this.selectedShipping);
  }

  getStepStatus(step: string): string {
    if (step === this.currentStep) return 'active';
    const stepOrder = ['shipping', 'payment', 'review'];
    const currentIndex = stepOrder.indexOf(this.currentStep);
    const stepIndex = stepOrder.indexOf(step);
    return stepIndex < currentIndex ? 'completed' : 'pending';
  }
  getPaymentMethodName(): string {
  const methodId = this.checkoutForm.get('paymentMethod.method')?.value;
  const method = this.paymentMethods.find(m => m.id === methodId);
  return method ? method.name : 'Non spécifié';
}
}