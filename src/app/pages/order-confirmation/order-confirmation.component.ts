import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: any;
  paymentMethod: string;
  status: 'processing' | 'shipped' | 'delivered';
  estimatedDelivery?: Date;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  orderId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || 'CMD-' + Date.now();
      this.generateOrderData();
    });
  }

  generateOrderData(): void {
    // Simulation de données de commande
    this.order = {
      id: this.orderId,
      date: new Date(),
      items: [
        {
          id: 1,
          name: 'Smartphone Android Premium',
          price: 299.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80x80?text=Phone'
        },
        {
          id: 2,
          name: 'Casque Audio Bluetooth',
          price: 89.99,
          quantity: 2,
          image: 'https://via.placeholder.com/80x80?text=Headphones'
        }
      ],
      subtotal: 479.97,
      shipping: 0,
      total: 479.97,
      shippingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        street: '123 Rue de la République',
        city: 'Paris',
        zipCode: '75001',
        country: 'France'
      },
      paymentMethod: 'Carte de crédit',
      status: 'processing',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // +3 jours
    };
  }

  getOrderStatusText(): string {
    switch (this.order?.status) {
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      default: return 'En traitement';
    }
  }

  getOrderStatusClass(): string {
    return this.order?.status || 'processing';
  }

  printOrder(): void {
    window.print();
  }

  getDeliveryDate(): string {
    if (!this.order?.estimatedDelivery) return '';
    return this.order.estimatedDelivery.toLocaleDateString('fr-FR');
  }
  getSupportEmail(): string {
  return 'support@eshop.com';
  }
  
}