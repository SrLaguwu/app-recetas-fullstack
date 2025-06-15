// Ruta: src/app/models/receta.model.ts

export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  instrucciones: string;
  tiempoPreparacionMinutos: number;
  imagenUrl: string;
}