import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, User, Address } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  currentUser: User | null = null;
  activeTab: 'profile' | 'address' | 'orders' | 'security' = 'profile';
  isEditing = false;
  isLoading = false;
  
  private userSubscription: Subscription | undefined;

  // Données simulées pour l'historique des commandes
  orderHistory = [
    {
      id: 'CMD-2024-001',
      date: new Date('2024-01-15'),
      total: 299.99,
      status: 'delivered',
      items: [
        { name: 'Smartphone Android', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: 'CMD-2024-002',
      date: new Date('2024-01-10'),
      total: 179.98,
      status: 'shipped',
      items: [
        { name: 'Casque Audio', quantity: 2, price: 89.99 }
      ]
    },
    {
      id: 'CMD-2024-003',
      date: new Date('2024-01-05'),
      total: 149.99,
      status: 'processing',
      items: [
        { name: 'Cafetière Automatique', quantity: 1, price: 149.99 }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.createProfileForm();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.prefillForm(user);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      // Informations personnelles
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern(/^\+?[0-9\s\-\(\)]{10,}$/)]]
      }),
      
      // Adresse
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        country: ['France', [Validators.required]]
      }),

      // Sécurité
      security: this.fb.group({
        currentPassword: [''],
        newPassword: ['', [Validators.minLength(6)]],
        confirmPassword: ['']
      })
    });
  }

  prefillForm(user: User): void {
    this.profileForm.patchValue({
      personalInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || ''
      },
      address: user.address || {
        street: '',
        city: '',
        zipCode: '',
        country: 'France'
      }
    });
  }

  setActiveTab(tab: 'profile' | 'address' | 'orders' | 'security'): void {
    this.activeTab = tab;
    this.isEditing = false;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Réinitialiser le formulaire si on annule l'édition
      this.prefillForm(this.currentUser!);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      
      const formData = this.profileForm.value;
      const updateData: Partial<User> = {
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        phone: formData.personalInfo.phone,
        address: formData.address
      };

      this.authService.updateProfile(updateData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isEditing = false;
          if (response.success) {
            alert('Profil mis à jour avec succès !');
          }
        },
        error: (error) => {
          this.isLoading = false;
          alert('Erreur lors de la mise à jour du profil');
        }
      });
    }
  }

  changePassword(): void {
    const securityData = this.profileForm.get('security')?.value;
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (securityData.newPassword && securityData.newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Simulation de changement de mot de passe
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('Mot de passe changé avec succès !');
      this.profileForm.get('security')?.reset();
    }, 1000);
  }

  getOrderStatusText(status: string): string {
    switch (status) {
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      default: return status;
    }
  }

  getOrderStatusClass(status: string): string {
    return status;
  }

  getOrderItemsPreview(items: any[]): string {
    return items.map(item => `${item.quantity}x ${item.name}`).join(', ');
  }

  simulateLogin(): void {
    this.authService.simulateLogin();
  }

  logout(): void {
    this.authService.logout();
  }
}