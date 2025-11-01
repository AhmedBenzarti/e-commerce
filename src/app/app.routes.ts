import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component'; // Doit exister
import { LoginComponent } from './pages/login/login.component';         // Doit exister

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'product-page', component: ProductPageComponent },
  { path: 'product-page/:id', component: ProductPageComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent }, // Vos composants existants
  { path: 'login', component: LoginComponent },       // Vos composants existants
  { path: '**', redirectTo: '' }
];