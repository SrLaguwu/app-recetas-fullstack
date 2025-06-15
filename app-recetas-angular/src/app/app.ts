// Ruta: src/app/app.ts

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- 1. Importar RouterModule
import { CommonModule } from '@angular/common'; // <-- 2. Importar CommonModule

import { RecipeService } from './services/recipe';
import { Receta } from './models/receta.model';

@Component({
  selector: 'app-root',
  standalone: true,  // <-- Esto indica que es un componente autónomo
  imports: [
    RouterModule,    // <-- 3. Añadir RouterModule aquí
    CommonModule     // <-- 4. Añadir CommonModule también (para directivas como *ngIf, *ngFor)
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'app-recetas-angular';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    console.log('AppComponent iniciado. Llamando al servicio de recetas...');

    this.recipeService.getRecetas().subscribe({
      next: (recetas: Receta[]) => {
        console.log('✅ ¡Éxito! Datos recibidos del backend:', recetas);
      },
      error: (error) => {
        console.error('❌ ¡Error! No se pudo conectar al backend:', error);
      }
    });
  }
}