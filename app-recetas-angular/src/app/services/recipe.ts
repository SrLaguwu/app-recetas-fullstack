// Ruta: src/app/services/recipe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:8080/api/recetas'; // La URL base de nuestra API

  constructor(private http: HttpClient) { }

  // Obtener todas las recetas
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  // Obtener una receta por ID
  getRecetaById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva receta
  crearReceta(receta: Omit<Receta, 'id'>): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, receta);
  }

  // Actualizar una receta existente
  actualizarReceta(id: number, receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta);
  }

  // Eliminar una receta
  eliminarReceta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}