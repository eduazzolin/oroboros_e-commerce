package com.oroboros.oroboros.repository;

import com.oroboros.oroboros.model.Usuario;
import com.oroboros.oroboros.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {
   List<Venda> findByComprador(Usuario usuario);
}
