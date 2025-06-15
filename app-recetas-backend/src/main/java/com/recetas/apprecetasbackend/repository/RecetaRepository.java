package com.recetas.apprecetasbackend.repository;

import com.recetas.apprecetasbackend.entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Le dice a Spring que esta es una interfaz de Repositorio.
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    // ¡Eso es todo!
}