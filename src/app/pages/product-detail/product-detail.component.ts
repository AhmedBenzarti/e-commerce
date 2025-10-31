import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // ← Ajouter ActivatedRoute
import { CartService } from '../../services/cart.service';
import { ProductsService, Product } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  selectedImage: string = '';
  activeTab: 'description' | 'specifications' | 'reviews' | 'shipping' = 'description';
  
  reviews: Review[] = [
    {
      id: 1,
      user: 'Marie L.',
      rating: 5,
      comment: 'Produit excellent, correspond parfaitement à la description. Livraison rapide !',
      date: new Date('2024-01-18'),
      verified: true
    },
    {
      id: 2,
      user: 'Pierre M.',
      rating: 4,
      comment: 'Très bon produit, juste un peu cher mais la qualité est au rendez-vous.',
      date: new Date('2024-01-15'),
      verified: true
    },
    {
      id: 3,
      user: 'Sophie T.',
      rating: 5,
      comment: 'Je recommande ce vendeur, produit de grande qualité et service client réactif.',
      date: new Date('2024-01-12'),
      verified: false
    }
  ];

  faqs = [
    {
      question: 'Quel est le délai de livraison ?',
      answer: 'Livraison sous 2-3 jours ouvrés en France métropolitaine.'
    },
    {
      question: 'Puis-je retourner le produit ?',
      answer: 'Oui, vous avez 30 jours pour retourner le produit s\'il ne vous convient pas.'
    },
    {
      question: 'La garantie est-elle incluse ?',
      answer: 'Tous nos produits bénéficient d\'une garantie constructeur de 2 ans.'
    }
  ];

  constructor(
    private route: ActivatedRoute, // ← Maintenant correct
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => { // ← Ajouter le type any pour params
      const productId = +params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number): void {
    this.productsService.getProductById(id).subscribe(product => {
      this.product = product || null;
      if (this.product) {
        this.selectedImage = this.product.image;
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      alert(`${this.quantity} ${this.product.name} ajouté(s) au panier !`);
    }
  }

  get totalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  get discountPercent(): number {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  setActiveTab(tab: 'description' | 'specifications' | 'reviews' | 'shipping'): void {
    this.activeTab = tab;
  }

  get averageRating(): number {
    if (!this.product) return 0;
    return this.product.rating;
  }

  getSpecifications(): { key: string; value: string }[] {
    if (!this.product?.specifications) return [];
    return Object.entries(this.product.specifications).map(([key, value]) => ({
      key,
      value
    }));
  }

  get relatedProducts(): Product[] {
    // Simulation - retourner un tableau vide pour l'instant
    return [];
  }

  addToWishlist(): void {
    if (this.product) {
      alert(`${this.product.name} ajouté aux favoris !`);
    }
  }

  shareProduct(): void {
    if (this.product) {
      alert(`Partager le produit : ${this.product.name}`);
    }
  }

  getStockStatus(): string {
    if (!this.product) return '';
    
    if (!this.product.inStock) {
      return 'Rupture de stock';
    } else if (this.product.stockQuantity < 5) {
      return `Plus que ${this.product.stockQuantity} en stock !`;
    } else {
      return 'En stock';
    }
  }

  getStockStatusClass(): string {
    if (!this.product) return '';
    
    if (!this.product.inStock) {
      return 'out-of-stock';
    } else if (this.product.stockQuantity < 5) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }
}