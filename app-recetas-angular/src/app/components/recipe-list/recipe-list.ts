// Ruta: src/app/components/recipe-list/recipe-list.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // 1. Importamos Observable
import { Receta } from '../../models/receta.model';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeListComponent implements OnInit {

  // 2. La propiedad ya no es un array, es un Observable que emitirá un array de recetas.
  // El signo '$' al final es una convención para nombrar variables que son Observables.
  recetas$!: Observable<Receta[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // 3. Ya no nos suscribimos. Simplemente asignamos el observable a nuestra propiedad.
    this.recetas$ = this.recipeService.getRecetas();
  }
}