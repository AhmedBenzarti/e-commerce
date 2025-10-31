import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  // CSS dynamiques sécurisés
  bootstrapCss: SafeResourceUrl;
  fontAwesomeCss: SafeResourceUrl;
  niceSelectCss: SafeResourceUrl;
  owlCarouselCss: SafeResourceUrl;
  magnificPopupCss: SafeResourceUrl;
  slicknavCss: SafeResourceUrl;
  mainStyleCss: SafeResourceUrl;

  // JS dynamiques
  jsFiles = [
    'assets/js/jquery-3.3.1.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/jquery.magnific-popup.min.js',
    'assets/js/jquery.slicknav.js',
    'assets/js/owl.carousel.min.js',
    'assets/js/jquery.nice-select.min.js',
    'assets/js/mixitup.min.js',
    'assets/js/main.js'
  ];

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    // CSS sécurisés via DomSanitizer
    this.bootstrapCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/bootstrap.min.css');
    this.fontAwesomeCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/font-awesome.min.css');
    this.niceSelectCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/nice-select.css');
    this.owlCarouselCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/owl.carousel.min.css');
    this.magnificPopupCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/magnific-popup.css');
    this.slicknavCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/slicknav.min.css');
    this.mainStyleCss = this.sanitizer.bypassSecurityTrustResourceUrl('assets/css/style.css');
  }

  ngAfterViewInit(): void {
    // Injection des scripts uniquement côté client
    if (typeof document !== 'undefined') {
      this.jsFiles.forEach(file => {
        const script = this.renderer.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        this.renderer.appendChild(document.body, script);
      });
    }
  }
}
