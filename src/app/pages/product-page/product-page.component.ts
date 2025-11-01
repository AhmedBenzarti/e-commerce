import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare var $: any;

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements AfterViewInit {
  
  product = {
    id: 1,
    name: 'Dotted Blue Shirt',
    price: 22.90,
    originalPrice: 29.90,
    images: [
      'assets/img/product/product-1.jpg',
      'assets/img/product/product-1.jpg' // Même image pour l'exemple
    ],
    category: 'Men\'s Wear',
    tags: ['man', 'shirt', 'dotted', 'elegant', 'cool'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    rating: 5,
    status: 'new',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black']
  };

  quantity: number = 1;
  selectedSize: string = 'M';
  selectedColor: string = 'Blue';

  relatedProducts = [
    {
      id: 1,
      name: 'Green Dress with details',
      price: 22.90,
      image: 'assets/img/products/img-1.jpg',
      status: 'new'
    },
    {
      id: 2,
      name: 'Yellow Maxi Dress',
      price: 25.90,
      image: 'assets/img/products/img-2.jpg',
      status: 'sale'
    },
    {
      id: 3,
      name: 'One piece bodysuit',
      price: 19.90,
      image: 'assets/img/products/img-3.jpg',
      status: 'new'
    },
    {
      id: 4,
      name: 'Blue Dress with details',
      price: 35.50,
      image: 'assets/img/products/img-4.jpg',
      status: 'popular'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.initializeProductSlider();
  }

  private initializeProductSlider() {
    if (isPlatformBrowser(this.platformId) && typeof $ !== 'undefined' && $.fn.owlCarousel) {
      setTimeout(() => {
        $('.product-slider').owlCarousel({
          items: 1,
          thumbs: true,
          thumbImage: true,
          thumbContainerClass: 'owl-thumbs',
          thumbItemClass: 'owl-thumb-item'
        });
      }, 0);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // Logique pour ajouter au panier
    console.log('Produit ajouté au panier:', {
      product: this.product,
      quantity: this.quantity,
      size: this.selectedSize,
      color: this.selectedColor
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'new': return 'new';
      case 'sale': return 'sale';
      case 'popular': return 'popular';
      default: return '';
    }
  }
}