package com.recetas.apprecetasbackend.controller;

import com.recetas.apprecetasbackend.entity.Receta;
import com.recetas.apprecetasbackend.repository.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "http://localhost:4200")
public class RecetaController {

    @Autowired
    private RecetaRepository recetaRepository;

    // Endpoint para OBTENER todas las recetas (GET)
    @GetMapping
    public List<Receta> obtenerTodasLasRecetas() {
        return recetaRepository.findAll();
    }

    // Endpoint para OBTENER una receta por su ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Receta> obtenerRecetaPorId(@PathVariable Long id) {
        Optional<Receta> receta = recetaRepository.findById(id);
        return receta.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para CREAR una nueva receta (POST)
    @PostMapping
    public Receta crearReceta(@RequestBody Receta receta) {
        return recetaRepository.save(receta);
    }

    // Endpoint para ACTUALIZAR una receta existente (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Receta> actualizarReceta(@PathVariable Long id, @RequestBody Receta detallesReceta) {
        Optional<Receta> recetaOptional = recetaRepository.findById(id);

        if (recetaOptional.isPresent()) {
            Receta recetaExistente = recetaOptional.get();
            recetaExistente.setNombre(detallesReceta.getNombre());
            recetaExistente.setDescripcion(detallesReceta.getDescripcion());
            recetaExistente.setIngredientes(detallesReceta.getIngredientes());
            recetaExistente.setInstrucciones(detallesReceta.getInstrucciones());
            recetaExistente.setTiempoPreparacionMinutos(detallesReceta.getTiempoPreparacionMinutos());
            recetaExistente.setImagenUrl(detallesReceta.getImagenUrl());

            final Receta recetaActualizada = recetaRepository.save(recetaExistente);
            return ResponseEntity.ok(recetaActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para ELIMINAR una receta (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Long id) {
        Optional<Receta> recetaOptional = recetaRepository.findById(id);
        if (recetaOptional.isPresent()) {
            recetaRepository.delete(recetaOptional.get());
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
    }
}