package com.oroboros.oroboros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Artista;

public interface ArtistaRepository extends JpaRepository <Artista, Long> {
    
    
}
