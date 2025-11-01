export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string[];
  status?: 'new' | 'sale' | 'popular';
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  productCount: number;
}