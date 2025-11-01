import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule,
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './check-out.component.html'
})
export class CheckOutComponent implements OnInit {
  checkoutForm!: FormGroup;
  
  orderItems = [
    {
      name: 'Blue Dotted Shirt',
      price: 29,
      quantity: 1
    }
  ];

  shippingCost = 10;
  
  get subtotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  paymentMethods = [
    { id: 'paypal', name: 'Paypal', image: 'assets/img/paypal.jpg' },
    { id: 'card', name: 'Credit / Debit card', image: 'assets/img/mastercard.jpg' },
    { id: 'cod', name: 'Pay when you get the package' }
  ];

  selectedPaymentMethod: string = 'paypal';
  shipToDifferentAddress: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.checkoutForm = this.fb.group({
      // Informations personnelles
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      
      // Adresse
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      country: ['USA', Validators.required],
      city: ['', Validators.required],
      state: [''],
      postCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      
      // Adresse de livraison différente
      differentShipping: [false],
      shippingFirstName: [''],
      shippingLastName: [''],
      shippingAddressLine1: [''],
      shippingAddressLine2: [''],
      shippingCity: [''],
      shippingState: [''],
      shippingPostCode: ['']
    });

    // Écouter les changements de l'adresse de livraison différente
    this.checkoutForm.get('differentShipping')?.valueChanges.subscribe(value => {
      this.shipToDifferentAddress = value;
      this.toggleShippingAddressValidators(value);
    });
  }

  private toggleShippingAddressValidators(enable: boolean) {
    const shippingFields = [
      'shippingFirstName', 
      'shippingLastName', 
      'shippingAddressLine1', 
      'shippingCity', 
      'shippingPostCode'
    ];

    shippingFields.forEach(field => {
      const control = this.checkoutForm.get(field);
      if (enable) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Order submitted:', {
        ...this.checkoutForm.value,
        paymentMethod: this.selectedPaymentMethod,
        orderItems: this.orderItems,
        total: this.total
      });
      
      // Ici vous ajouteriez la logique pour envoyer la commande au backend
      alert('Order placed successfully!');
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire dans le template
  get firstName() { return this.checkoutForm.get('firstName'); }
  get lastName() { return this.checkoutForm.get('lastName'); }
  get addressLine1() { return this.checkoutForm.get('addressLine1'); }
  get city() { return this.checkoutForm.get('city'); }
  get postCode() { return this.checkoutForm.get('postCode'); }
  get phone() { return this.checkoutForm.get('phone'); }
}