import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroSliderComponent } from '../../components/hero-slider/hero-slider.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { ProductsComponent } from '../../components/products/products.component';
import { LookbookComponent } from '../../components/lookbook/lookbook.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSliderComponent,
    FeaturesComponent,
    ProductsComponent,
    LookbookComponent,
    LogoCarouselComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    // Initialiser les fonctionnalités globales si nécessaire
    this.initializeGlobalFunctionality();
  }

  private initializeGlobalFunctionality() {
    // Page Preloder - seulement côté client
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const preloader = document.getElementById('preloder');
          if (preloader) {
            preloader.style.display = 'none';
          }
        }, 500);
      });
    }
  }
}