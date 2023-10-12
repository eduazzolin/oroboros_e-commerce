package com.oroboros.oroboros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Produto;

public interface ProdutoRepository extends JpaRepository <Produto, Long> {
    
    
}
