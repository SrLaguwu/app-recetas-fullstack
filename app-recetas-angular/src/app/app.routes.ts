// Ruta: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail'; // 1. Importar el nuevo componente
import { RecipeFormComponent } from './components/recipe-form/recipe-form'; // Importar

export const routes: Routes = [
  // 2. Cuando la ruta esté vacía (la página principal), muestra la lista de recetas
  { path: '', component: RecipeListComponent },

  { path: 'receta/crear', component: RecipeFormComponent }, // Ruta para el formulario
  { path: 'receta/editar/:id', component: RecipeFormComponent },
  // 3. Cuando la ruta sea 'receta/' seguido de un ID, muestra el detalle de esa receta
  { path: 'receta/:id', component: RecipeDetailComponent },

];