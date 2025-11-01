import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    SafeUrlPipe
],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  
  contactForm!: FormGroup;
  
  contactInfo = {
    location: {
      line1: '1525 Awesome Lane,',
      line2: 'Los Angeles, CA'
    },
    phone: [
      '+1 (603)535-4592',
      '+1 (603)535-4556'
    ],
    email: [
      'contact@violetstore.com',
      'www.violetstore.com'
    ]
  };

  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26440.72384129847!2d-118.24906619231132!3d34.06719475913053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c659f50c318d%3A0xe2ffb80a9d3820ae!2sChinatown%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1570213740685!5m2!1sen!2sbd';

  isSubmitted = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      
      // Simuler l'envoi du formulaire
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isLoading = false;
        this.isSubmitted = true;
        
        // Réinitialiser le formulaire après envoi réussi
        this.contactForm.reset();
        
        // Réinitialiser le message de succès après 5 secondes
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get firstName() { return this.contactForm.get('firstName'); }
  get lastName() { return this.contactForm.get('lastName'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  // Méthodes pour les interactions utilisateur
  onPhoneClick(phoneNumber: string) {
    console.log('Calling:', phoneNumber);
    // Implémenter la logique d'appel téléphonique si nécessaire
  }

  onEmailClick(email: string) {
    console.log('Emailing:', email);
    // Implémenter la logique d'envoi d'email si nécessaire
  }

  onWebsiteClick(website: string) {
    console.log('Visiting:', website);
    // Implémenter la navigation vers le site web si nécessaire
  }
}