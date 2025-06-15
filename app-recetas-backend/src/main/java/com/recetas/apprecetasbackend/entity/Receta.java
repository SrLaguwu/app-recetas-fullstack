package com.recetas.apprecetasbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // 1. Le dice a JPA que esta clase es una tabla en la base de datos.
@Data   // 2. Anotación de Lombok: crea getters, setters, toString(), etc. automáticamente.
@NoArgsConstructor // 3. Anotación de Lombok: crea un constructor sin argumentos.
@AllArgsConstructor // 4. Anotación de Lombok: crea un constructor con todos los argumentos.
public class Receta {

    @Id // 5. Marca este campo como la clave primaria (ID) de la tabla.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 6. Le dice a la BD que genere este valor automáticamente.
    private Long id;

    private String nombre;
    private String descripcion;
    private String ingredientes; // Para simplificar, usamos String. Más adelante podría ser una lista.
    private String instrucciones;
    private Integer tiempoPreparacionMinutos;
    private String imagenUrl;
}