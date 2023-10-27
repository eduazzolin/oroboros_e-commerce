package com.oroboros.oroboros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Produto;

public interface ProdutoRepository extends JpaRepository <Produto, Long> {
    List<Produto> findByNomeContaining(String infix);
    List<Produto> findByAtivo(Boolean ativo);
    List<Produto> findByRemoved(Boolean r);


}
