import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  fullDescription: string;
  inStock: boolean;
  stockQuantity: number;
  features: string[];
  specifications: { [key: string]: string };
  brand: string;
  sku: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  seller: {
    id: number;
    name: string;
    rating: number;
    contact: string;
  };
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  categories?: string[];
  priceRange?: { min: number; max: number };
  inStock?: boolean;
  rating?: number;
  brands?: string[];
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone Android Premium',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://via.placeholder.com/400x400?text=Smartphone+Pro',
      images: [
        'https://via.placeholder.com/400x400?text=Smartphone+1',
        'https://via.placeholder.com/400x400?text=Smartphone+2',
        'https://via.placeholder.com/400x400?text=Smartphone+3'
      ],
      category: 'Électronique',
      subcategory: 'Smartphones',
      description: 'Smartphone Android haute performance avec écran 6.5" AMOLED',
      fullDescription: 'Découvrez le smartphone Android ultime avec un écran AMOLED 6.5" incroyable, un processeur octa-core ultra-rapide et une batterie qui dure toute la journée. Parfait pour le gaming, la productivité et la créativité.',
      inStock: true,
      stockQuantity: 15,
      features: [
        'Écran 6.5" AMOLED 120Hz',
        'Processeur Octa-core 2.8GHz',
        '128GB Stockage + 8GB RAM',
        'Triple caméra 48MP + 12MP + 5MP',
        'Batterie 5000mAh charge rapide 65W',
        '5G compatible'
      ],
      specifications: {
        'Écran': '6.5" AMOLED 120Hz',
        'Processeur': 'Octa-core 2.8GHz',
        'Mémoire': '8GB RAM + 128GB Stockage',
        'Caméra': '48MP + 12MP + 5MP',
        'Batterie': '5000mAh',
        'Charge': 'Rapide 65W',
        'Réseau': '5G/4G/3G',
        'OS': 'Android 13',
        'Poids': '198g'
      },
      brand: 'TechMaster',
      sku: 'TM-SP-2024',
      tags: ['nouveau', 'promo', 'android', '5g', 'gaming'],
      rating: 4.5,
      reviewCount: 128,
      seller: {
        id: 1,
        name: 'TechStore Pro',
        rating: 4.8,
        contact: 'contact@techstore.com'
      },
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 2,
      name: 'Casque Audio Sans Fil',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://via.placeholder.com/400x400?text=Casque+Pro',
      images: [
        'https://via.placeholder.com/400x400?text=Casque+1',
        'https://via.placeholder.com/400x400?text=Casque+2'
      ],
      category: 'Électronique',
      subcategory: 'Audio',
      description: 'Casque Bluetooth avec réduction de bruit active',
      fullDescription: 'Profitez d\'une expérience audio immersive avec ce casque sans fil haute performance. La réduction de bruit active vous isole du monde extérieur pour une écoute parfaite.',
      inStock: true,
      stockQuantity: 8,
      features: [
        'Réduction de bruit active',
        'Autonomie 30 heures',
        'Charge rapide USB-C',
        'Contrôles tactiles',
        'Qualité audio HD',
        'Confort optimisé 8h'
      ],
      specifications: {
        'Autonomie': '30 heures',
        'Charge': 'USB-C (15min = 5h)',
        'Bluetooth': '5.0',
        'Poids': '250g',
        'Couleurs': 'Noir, Blanc, Bleu'
      },
      brand: 'SoundMax',
      sku: 'SM-CH-2024',
      tags: ['audio', 'bluetooth', 'reduction-bruit', 'promo'],
      rating: 4.3,
      reviewCount: 89,
      seller: {
        id: 2,
        name: 'AudioWorld',
        rating: 4.6,
        contact: 'support@audioworld.com'
      },
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: 3,
      name: 'T-shirt Cotton Bio',
      price: 24.99,
      image: 'https://via.placeholder.com/400x400?text=T-shirt+Bio',
      images: [
        'https://via.placeholder.com/400x400?text=T-shirt+1',
        'https://via.placeholder.com/400x400?text=T-shirt+2'
      ],
      category: 'Mode',
      subcategory: 'Vêtements',
      description: 'T-shirt 100% cotton biologique, confortable et durable',
      fullDescription: 'Ce t-shirt en cotton 100% biologique offre un confort exceptionnel toute la journée. Coupe moderne, fabrication durable et respectueuse de l\'environnement.',
      inStock: true,
      stockQuantity: 50,
      features: [
        '100% Cotton biologique',
        'Confort exceptionnel',
        'Lavable en machine',
        'Couleurs solides',
        'Taille ajustée',
        'Production éco-responsable'
      ],
      specifications: {
        'Matière': '100% Cotton bio',
        'Entretien': 'Lavable machine 30°',
        'Origine': 'Production responsable',
        'Coupe': 'Regular Fit',
        'Tailles': 'S, M, L, XL'
      },
      brand: 'EcoWear',
      sku: 'EW-TS-2024',
      tags: ['bio', 'ecologique', 'cotton', 'confort'],
      rating: 4.7,
      reviewCount: 204,
      seller: {
        id: 3,
        name: 'GreenFashion',
        rating: 4.9,
        contact: 'info@greenfashion.com'
      },
      isFeatured: false,
      isOnSale: false,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: 4,
      name: 'Chaussures de Running',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://via.placeholder.com/400x400?text=Running+Pro',
      images: [
        'https://via.placeholder.com/400x400?text=Running+1',
        'https://via.placeholder.com/400x400?text=Running+2'
      ],
      category: 'Sport',
      subcategory: 'Chaussures',
      description: 'Chaussures de running légères et techniques',
      fullDescription: 'Conçues pour les runners exigeants, ces chaussures allient légèreté, amorti et stabilité. Parfaites pour la course sur route et sentier.',
      inStock: true,
      stockQuantity: 12,
      features: [
        'Semelle amortissante Gel',
        'Tige mesh respirante',
        'Poids ultra-léger: 240g',
        'Semelle extérieure durable',
        'Confort immédiat',
        'Style moderne'
      ],
      specifications: {
        'Poids': '240g (taille 42)',
        'Amorti': 'Gel technology',
        'Type': 'Running sur route',
        'Niveaux': 'Débutant à confirmé',
        'Tailles': '38-47'
      },
      brand: 'RunFast',
      sku: 'RF-RS-2024',
      tags: ['running', 'sport', 'promo', 'confort'],
      rating: 4.4,
      reviewCount: 156,
      seller: {
        id: 4,
        name: 'SportExpert',
        rating: 4.7,
        contact: 'sales@sportexpert.com'
      },
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: 5,
      name: 'Livre Angular Avancé',
      price: 34.99,
      image: 'https://via.placeholder.com/400x400?text=Livre+Angular',
      images: [
        'https://via.placeholder.com/400x400?text=Livre+1'
      ],
      category: 'Livres',
      subcategory: 'Informatique',
      description: 'Guide complet pour maîtriser Angular et ses concepts avancés',
      fullDescription: 'Ce livre vous guide pas à pas dans la maîtrise d\'Angular. Des bases aux concepts avancés comme les reactive forms, les guards, et l\'optimisation des performances.',
      inStock: true,
      stockQuantity: 25,
      features: [
        'Couverture complète Angular 16+',
        'Exemples pratiques',
        'Projets réels',
        'Best practices',
        'Optimisation performance',
        'Déploiement'
      ],
      specifications: {
        'Pages': '450',
        'Langue': 'Français',
        'Format': 'PDF + Papier',
        'Niveau': 'Intermédiaire à Avancé',
        'Auteur': 'Expert Angular'
      },
      brand: 'DevBooks',
      sku: 'DB-AG-2024',
      tags: ['angular', 'programmation', 'web', 'formation'],
      rating: 4.8,
      reviewCount: 92,
      seller: {
        id: 5,
        name: 'TechBooks',
        rating: 4.9,
        contact: 'orders@techbooks.com'
      },
      isFeatured: false,
      isOnSale: false,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: 6,
      name: 'Cafetière Automatique',
      price: 149.99,
      image: 'https://via.placeholder.com/400x400?text=Cafetière+Auto',
      images: [
        'https://via.placeholder.com/400x400?text=Cafetière+1',
        'https://via.placeholder.com/400x400?text=Cafetière+2'
      ],
      category: 'Maison',
      subcategory: 'Électroménager',
      description: 'Cafetière programmable avec broyeur intégré',
      fullDescription: 'Réveillez-vous avec l\'arôme du café fraîchement moulu. Cette cafetière automatique avec broyeur intégré vous offre un café de barista à la maison.',
      inStock: false,
      stockQuantity: 0,
      features: [
        'Broyeur céramique intégré',
        'Programmation horaire',
        'Réservoir 1.5L',
        'Nettoyage automatique',
        '5 profils de saveur',
        'Ecran LCD tactile'
      ],
      specifications: {
        'Capacité': '1.5L (12 tasses)',
        'Broyeur': 'Céramique réglable',
        'Programmation': '24h',
        'Pression': '15 bars',
        'Puissance': '1450W'
      },
      brand: 'CoffeeMaster',
      sku: 'CM-CF-2024',
      tags: ['cafe', 'maison', 'electromenager', 'rupture'],
      rating: 4.6,
      reviewCount: 78,
      seller: {
        id: 6,
        name: 'HomeAppliances',
        rating: 4.5,
        contact: 'service@homeappliances.com'
      },
      isFeatured: false,
      isOnSale: false,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-22')
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor() {}

  // Obtenir tous les produits
  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(300)); // Simulation délai réseau
  }

  // Obtenir un produit par ID
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  // Obtenir les produits par catégorie
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(p => p.category === category);
    return of(filtered).pipe(delay(300));
  }

  // Obtenir les produits en featured
  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.isFeatured);
    return of(featured).pipe(delay(200));
  }

  // Obtenir les produits en promotion
  getOnSaleProducts(): Observable<Product[]> {
    const onSale = this.products.filter(p => p.isOnSale);
    return of(onSale).pipe(delay(200));
  }

  // Recherche de produits
  searchProducts(query: string): Observable<Product[]> {
    const searchTerm = query.toLowerCase();
    const results = this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
    return of(results).pipe(delay(400));
  }

  // Filtrage avancé
  filterProducts(filters: ProductFilter): Observable<Product[]> {
    let filtered = [...this.products];

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories!.includes(p.category));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange!.min && 
        p.price <= filters.priceRange!.max
      );
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock);
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating!);
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands!.includes(p.brand));
    }

    return of(filtered).pipe(delay(500));
  }

  // Obtenir les catégories uniques
  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  // Obtenir les marques uniques
  getBrands(): string[] {
    return [...new Set(this.products.map(p => p.brand))];
  }

  // Mettre à jour le stock (simulation)
  updateStock(productId: number, quantity: number): Observable<boolean> {
    const product = this.products.find(p => p.id === productId);
    if (product && product.stockQuantity >= quantity) {
      product.stockQuantity -= quantity;
      if (product.stockQuantity === 0) {
        product.inStock = false;
      }
      this.productsSubject.next([...this.products]);
      return of(true).pipe(delay(200));
    }
    return of(false).pipe(delay(200));
  }

  // Ajouter un avis (simulation)
  addReview(productId: number, rating: number, comment: string): Observable<boolean> {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      // Simulation mise à jour rating
      const newRating = (product.rating * product.reviewCount + rating) / (product.reviewCount + 1);
      product.rating = Math.round(newRating * 10) / 10;
      product.reviewCount++;
      this.productsSubject.next([...this.products]);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}