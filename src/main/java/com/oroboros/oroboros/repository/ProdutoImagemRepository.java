package com.oroboros.oroboros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.ProdutoImagem;

public interface ProdutoImagemRepository extends JpaRepository <ProdutoImagem, Long> {
    
    
}
