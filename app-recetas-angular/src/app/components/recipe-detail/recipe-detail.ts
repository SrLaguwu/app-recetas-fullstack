// Ruta: src/app/components/recipe-detail/recipe-detail.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router  } from '@angular/router'; // 1. Importamos ActivatedRoute y RouterModule
import { Observable } from 'rxjs';
import { Receta } from '../../models/receta.model';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // 2. Añadimos RouterModule para usar routerLink
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.css']
})
export class RecipeDetailComponent implements OnInit {

  receta$!: Observable<Receta>;

  // 3. Inyectamos ActivatedRoute para leer la URL y RecipeService para pedir datos
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 4. Obtenemos el 'id' de la URL
    const id = this.route.snapshot.paramMap.get('id');

    // 5. Si hay un ID, pedimos esa receta al servicio
    if (id) {
      this.receta$ = this.recipeService.getRecetaById(+id); // el '+' convierte el string 'id' a número
    }
  }

    // 3. Nuevo método para manejar la eliminación
  onDelete(id: number): void {
    // Usamos el diálogo de confirmación nativo del navegador
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.');

    if (confirmacion) {
      // Si el usuario hace clic en "Aceptar"
      this.recipeService.eliminarReceta(id).subscribe({
        next: () => {
          console.log('Receta eliminada exitosamente');
          // Navegamos de vuelta a la lista principal
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al eliminar la receta:', err);
        }
      });
    }
    // Si el usuario hace clic en "Cancelar", no hacemos nada.
  }
}