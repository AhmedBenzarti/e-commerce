import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts = [
    {
      id: 1,
      name: 'Produit Phare 1',
      price: 49.99,
      image: 'https://via.placeholder.com/300x300?text=Produit+1',
      category: 'Électronique'
    },
    {
      id: 2,
      name: 'Produit Phare 2',
      price: 29.99,
      image: 'https://via.placeholder.com/300x300?text=Produit+2',
      category: 'Maison'
    },
    {
      id: 3,
      name: 'Produit Phare 3',
      price: 79.99,
      image: 'https://via.placeholder.com/300x300?text=Produit+3',
      category: 'Mode'
    },
    {
      id: 4,
      name: 'Produit Phare 4',
      price: 19.99,
      image: 'https://via.placeholder.com/300x300?text=Produit+4',
      category: 'Sport'
    }
  ];

  constructor() { }
}