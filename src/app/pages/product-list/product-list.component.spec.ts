import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should filter products by category', () => {
    component.onCategoryChange('Électronique');
    const filtered = component.filteredProducts;
    expect(filtered.every(product => product.category === 'Électronique')).toBeTrue();
  });

  it('should show all products when "Tous" category is selected', () => {
    component.onCategoryChange('Tous');
    expect(component.filteredProducts.length).toBe(component.products.length);
  });
});