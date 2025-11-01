import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-carousel.component.html'
})
export class LogoCarouselComponent implements AfterViewInit, OnDestroy {
  logos = [
    'assets/img/logos/logo-1.png',
    'assets/img/logos/logo-2.png',
    'assets/img/logos/logo-3.png',
    'assets/img/logos/logo-4.png',
    'assets/img/logos/logo-5.png'
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
        this.carousel = $('.logo-items').owlCarousel({
          loop: true,
          nav: false,
          dots: false,
          margin: 100,
          autoplay: true,
          responsive: {
            0: { items: 2 },
            576: { items: 3 },
            768: { items: 4 },
            992: { items: 5 }
          },
          autoplayTimeout: 3000,
          smartSpeed: 1000
        });
      }, 0);
    }
  }

  private destroyCarousel() {
    if (isPlatformBrowser(this.platformId) && this.carousel) {
      this.carousel.trigger('destroy.owl.carousel');
      this.carousel = null;
    }
  }
}