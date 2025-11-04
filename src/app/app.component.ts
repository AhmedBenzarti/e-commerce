import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { HomeComponent } from "./pages/home/home.component"; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Violet Store';

 constructor(public themeService: ThemeService) {}

  ngOnInit() {
    // Démarrer la vérification automatique du thème
    this.themeService.startAutoThemeChecker();
  }

  // Méthodes pour le debug (optionnel)
  getThemeDecisionMode(): string {
    return this.themeService.getThemeDecisionMode();
  }

  getUserLocalTime(): string {
    return this.themeService.getUserLocalTime();
  }
}