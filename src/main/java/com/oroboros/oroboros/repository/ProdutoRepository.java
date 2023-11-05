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

   @Query("select p from Produto p where p.ativo = true and p.categoria.id = :categoria and p.nome like %:texto% order by :ordem, :ordemTipo")
   public List<Produto> findByQuery(@Param("ordem") String ordem,
                                    @Param("ordemTipo") String ordemTipo,
                                    @Param("categoria") String categoria,
                                    @Param("texto") String texto,
                                    @Param("pagina") String pagina);


}
