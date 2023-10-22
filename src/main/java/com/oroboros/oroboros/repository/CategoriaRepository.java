package com.oroboros.oroboros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Categoria;

public interface CategoriaRepository  extends JpaRepository<Categoria, Long>{
    
}
