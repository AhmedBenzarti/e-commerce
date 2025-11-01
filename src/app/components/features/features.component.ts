import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './features.component.html'
})
export class FeaturesComponent {
  features = [
    {
      icon: 'assets/img/icons/f-delivery.png',
      title: 'Free shipping',
      description: 'Fusce urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal esuada aliquet libero viverra cursus.',
      class: 'first'
    },
    {
      icon: 'assets/img/icons/coin.png',
      title: '100% Money back',
      description: 'Urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal esuada aliquet libero viverra cursus.',
      class: 'second'
    },
    {
      icon: 'assets/img/icons/chat.png',
      title: 'Online support 24/7',
      description: 'Urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vesti bulum mal esuada aliquet libero viverra cursus.',
      class: ''
    }
  ];

  featureBoxes = [
    {
      image: 'assets/img/f-box-1.jpg',
      year: '2019 Party',
      title: 'Jewelry',
      alert: 'Trend Allert',
      button: true,
      class: 'first-box'
    },
    {
      image: 'assets/img/f-box-2.jpg',
      year: '2019 Trend',
      title: 'Footwear',
      alert: 'Bold & Black',
      button: false,
      class: 'second-box'
    },
    {
      image: 'assets/img/f-box-3.jpg',
      year: '2019 Party',
      title: 'Collection',
      alert: 'Trend Allert',
      button: false,
      class: 'large-box'
    }
  ];
}