import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../../pages/home/home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have featured products', () => {
    expect(component.featuredProducts.length).toBe(4);
  });

  it('should render hero section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero-section h1').textContent).toContain('Bienvenue dans notre boutique');
  });

  it('should render featured products section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.featured-section h2').textContent).toContain('Produits Phares');
  });

  it('should display all featured products', () => {
    const compiled = fixture.nativeElement;
    const productCards = compiled.querySelectorAll('.product-card');
    expect(productCards.length).toBe(4);
  });
});