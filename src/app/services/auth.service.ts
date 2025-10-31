import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;
  
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Vérifier si l'utilisateur est déjà connecté au chargement
    this.checkStoredAuth();
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; message?: string }> {
    // Simulation d'une API de connexion
    return of({ success: true }).pipe(delay(1000));
  }

  register(userData: RegisterData): Observable<{ success: boolean; message?: string }> {
    // Simulation d'une API d'inscription
    return of({ success: true }).pipe(delay(1500));
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('eshop_user');
      localStorage.removeItem('eshop_token');
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  updateProfile(userData: Partial<User>): Observable<{ success: boolean; message?: string }> {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.currentUserSubject.next(updatedUser);
      this.saveUserToStorage(updatedUser);
    }
    return of({ success: true }).pipe(delay(500));
  }

  private checkStoredAuth(): void {
    if (!this.isBrowser) return;

    const storedUser = localStorage.getItem('eshop_user');
    const storedToken = localStorage.getItem('eshop_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  private setAuth(user: User, token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('eshop_user', JSON.stringify(user));
      localStorage.setItem('eshop_token', token);
    }
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private saveUserToStorage(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem('eshop_user', JSON.stringify(user));
    }
  }

  // Simulation - données utilisateur pour les démos
  simulateLogin(): void {
    const demoUser: User = {
      id: 1,
      email: 'demo@example.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      avatar: 'https://via.placeholder.com/100x100?text=JD',
      phone: '+33 1 23 45 67 89',
      address: {
        street: '123 Rue de la République',
        city: 'Paris',
        zipCode: '75001',
        country: 'France'
      },
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date()
    };
    
    this.setAuth(demoUser, 'demo-token-12345');
  }
}