import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css'] // Ajoutez cette ligne
})
export class HeroSliderComponent implements AfterViewInit, OnDestroy {
  slides = [
    { 
      id: 1, 
      image: 'assets/img/slider-1.jpg', 
      title: '2019', 
      subtitle: 'Lookbook.',
      buttonText: 'See More'
    },
    { 
      id: 2, 
      image: 'assets/img/slider-2.jpg', 
      title: '2019', 
      subtitle: 'Lookbook.',
      buttonText: 'See More'
    },
    { 
      id: 3, 
      image: 'assets/img/slider-3.jpg', 
      title: '2019', 
      subtitle: 'Lookbook.',
      buttonText: 'See More'
    }
  ];

  private carousel: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    this.initializeCarousel();
  }

  ngOnDestroy() {
    this.destroyCarousel();
  }

  private initializeCarousel() {
    if (isPlatformBrowser(this.platformId) && typeof $ !== 'undefined' && $.fn.owlCarousel) {
      setTimeout(() => {
        this.carousel = $('.hero-items').owlCarousel({
          loop: true,
          margin: 0,
          items: 1,
          dots: false,
          nav: true,
          navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          smartSpeed: 1200,
          autoHeight: false,
          autoplay: true,
          mouseDrag: false
        });
      }, 100); // Petit délai pour s'assurer que les images sont chargées
    }
  }

  private destroyCarousel() {
    if (isPlatformBrowser(this.platformId) && this.carousel) {
      this.carousel.trigger('destroy.owl.carousel');
      this.carousel = null;
    }
  }
}