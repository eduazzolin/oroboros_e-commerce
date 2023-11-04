package com.oroboros.oroboros.repository;

import com.oroboros.oroboros.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   Usuario findByEmailAndSenha(String email, String senha);
   Usuario findByIdAndToken(Long id, String token);
}
