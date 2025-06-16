// Ruta: src/app/components/recipe-form/recipe-form.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Imports para Reactive Forms
import { Router, RouterModule, ActivatedRoute  } from '@angular/router';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Añadir ReactiveFormsModule
  templateUrl: './recipe-form.html',
  styleUrls: ['./recipe-form.css']
})
export class RecipeFormComponent {
  recipeForm: FormGroup;
  editMode = false; // 2. Bandera para saber si estamos en modo edición
  private currentRecipeId: number | null = null; // 3. Para guardar el ID de la receta a editar


  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute // 4. Inyectar ActivatedRoute

  ) {
    // Definimos la estructura del formulario y sus validaciones
    this.recipeForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ingredientes: ['', Validators.required],
      instrucciones: ['', Validators.required],
      tiempoPreparacionMinutos: [30, [Validators.required, Validators.min(1)]],
      imagenUrl: [''] // La URL de la imagen es opcional
    });
  }

  //para actualizar el formulario en modo edición
    ngOnInit(): void {
    // 5. Al iniciar el componente, revisamos la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // Si hay un ID en la URL, estamos en modo edición
        this.editMode = true;
        this.currentRecipeId = +id;
        this.loadRecipeData(this.currentRecipeId);
      }
    });
  }

  // 6. Nuevo método para cargar los datos de la receta en el formulario
  private loadRecipeData(id: number): void {
    this.recipeService.getRecetaById(id).subscribe(receta => {
      // Usamos patchValue para rellenar el formulario con los datos de la receta
      this.recipeForm.patchValue(receta);
    });
  }
  //fin para actualizar el formulario en modo edición


  // Este método se ejecuta cuando el usuario envía el formulario
  onSubmit(): void {
    if (this.recipeForm.valid) {
      if (this.editMode && this.currentRecipeId) {
        // MODO EDICIÓN: llamamos al servicio de actualizar
        this.recipeService.actualizarReceta(this.currentRecipeId, this.recipeForm.value).subscribe(() => {
          this.router.navigate(['/']); // Volvemos a la lista
        });
      } else {
        // MODO CREACIÓN: llamamos al servicio de crear
        this.recipeService.crearReceta(this.recipeForm.value).subscribe(() => {
          this.router.navigate(['/']); // Volvemos a la lista
        });
      }
    }
  }
}