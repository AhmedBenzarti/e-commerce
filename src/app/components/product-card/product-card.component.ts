import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showActions: boolean = true;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, 1);
    this.addToCart.emit(this.product);
  }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetails.emit(this.product);
  }

  get discountPercent(): number {
    if (this.product.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  get isNew(): boolean {
    const createdAt = new Date(this.product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Nouveau si moins de 30 jours
  }
}