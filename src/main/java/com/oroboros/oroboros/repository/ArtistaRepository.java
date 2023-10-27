package com.oroboros.oroboros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Artista;

public interface ArtistaRepository extends JpaRepository <Artista, Long> {
    
    
    List<Artista> findByRemoved(Boolean r);
}
