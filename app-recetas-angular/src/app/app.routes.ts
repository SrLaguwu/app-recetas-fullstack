// Ruta: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail'; // 1. Importar el nuevo componente

export const routes: Routes = [
  // 2. Cuando la ruta esté vacía (la página principal), muestra la lista de recetas
  { path: '', component: RecipeListComponent },

  // 3. Cuando la ruta sea 'receta/' seguido de un ID, muestra el detalle de esa receta
  { path: 'receta/:id', component: RecipeDetailComponent }
];