// Ruta: src/app/app.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './components/recipe-list/recipe-list'; // <-- ¡NUEVO!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RecipeListComponent // <-- ¡NUEVO! Lo importamos para poder usarlo en el HTML
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'app-recetas-angular';
}