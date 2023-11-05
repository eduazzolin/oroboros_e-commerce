package com.oroboros.oroboros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oroboros.oroboros.model.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
   List<Produto> findByNomeContaining(String infix);

   List<Produto> findByAtivo(Boolean ativo);

   List<Produto> findByRemoved(Boolean r);

   Long countByAtivo(Boolean ativo);

   @Query("select p from Produto p where p.ativo = true and (:categoria is null or p.categoria.id = :categoria) and (:texto is null or p.nome like %:texto%)")
   List<Produto> findByQuery(@Param("categoria") Long categoria,
                                    @Param("texto") String texto);

   @Query("select count(p) from Produto p where p.ativo = true and (:categoria is null or p.categoria.id = :categoria) and (:texto is null or p.nome like %:texto%)")
   Long countByQuery(@Param("categoria") Long categoria,
                                    @Param("texto") String texto);


}
