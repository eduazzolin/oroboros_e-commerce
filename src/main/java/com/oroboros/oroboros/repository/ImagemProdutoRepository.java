package com.oroboros.oroboros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.ImagemProduto;
import com.oroboros.oroboros.model.Produto;

public interface ImagemProdutoRepository extends JpaRepository<ImagemProduto, Long>{
    List<ImagemProduto> findByProduto(Produto produto);
}
