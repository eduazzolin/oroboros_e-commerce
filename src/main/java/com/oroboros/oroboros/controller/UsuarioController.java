package com.oroboros.oroboros.controller;

import com.oroboros.oroboros.model.Artista;
import com.oroboros.oroboros.model.Usuario;
import com.oroboros.oroboros.repository.UsuarioRepository;
import com.oroboros.oroboros.util.TokenUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

   @Autowired
   private UsuarioRepository ur;

   @PostMapping("/login")
   public Usuario login(@RequestBody Usuario u, HttpServletRequest request, @RequestHeader("User-Agent") String userAgent) {
      String tokenData = u.getEmail() + ":" + u.getSenha() + ":" + userAgent + ":" + request.getRemoteAddr();
      String token = null;
      try {
         token = TokenUtils.generateToken(tokenData);
      } catch (Exception e) {
         return null;
      }
      u = ur.findByEmailAndSenha(u.getEmail(), u.getSenha());
      if (u != null) {
         u.setToken(token);
         u.setDt_exp_token(TokenUtils.generateExpirationDate());
         ur.save(u);
         request.getSession().setAttribute("usuarioLogado", u.getId());
         request.getSession().setAttribute("token", token);
      }
      return u;
   }

   @PostMapping("/cadastrar")
   public Usuario cadastro(@RequestBody Usuario u, HttpServletRequest request, @RequestHeader("User-Agent") String userAgent) {
      String tokenData = u.getEmail() + ":" + u.getSenha() + ":" + userAgent + ":" + request.getRemoteAddr();
      String token = null;
      try {
         token = TokenUtils.generateToken(tokenData);
      } catch (Exception e) {
         return null;
      }
      u.setToken(token);
      u.setDt_exp_token(TokenUtils.generateExpirationDate());
      u.setDt_cadastro(LocalDateTime.now());
      u.setRole("USER");
      return ur.save(u);
   }

   @GetMapping("/u")
   public Usuario usuarioLogado(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null || request.getSession().getAttribute("token") == null) {
         return null;
      }
      Usuario u = ur.findByIdAndToken(Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString()), request.getSession().getAttribute("token").toString());
      if (u == null) {
         return null;
      } else {
         if (u.getDt_exp_token().isBefore(LocalDateTime.now())) {
            return null;
         } else {
            u.setToken(null);
            u.setSenha(null);
            return u;
         }
      }
   }

   @PutMapping("/edit")
   public ResponseEntity<String> putUser(HttpServletRequest request, @RequestBody Usuario u) {
      if (request.getSession().getAttribute("usuarioLogado") == null || request.getSession().getAttribute("token") == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      }
      Usuario user = ur.findByIdAndToken(Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString()), request.getSession().getAttribute("token").toString());
      if (user == null || user.getDt_exp_token().isBefore(LocalDateTime.now())) {
         return ResponseEntity.status(401).body("Não autorizado");
      }
      if (u.getNome() != null) {
         user.setNome(u.getNome());
      }
      if (u.getEmail() != null) {
         user.setEmail(u.getEmail());
      }
      if (u.getSenha() != null && !u.getSenha().isBlank()) {
         user.setSenha(u.getSenha());
      }
      if (u.getCpf_cnpj() != null){
         user.setCpf_cnpj(u.getCpf_cnpj());
      }
      ur.save(user);
      return ResponseEntity.ok("Usuário atualizado");
   }

   ;


   @GetMapping("/check")
   public ResponseEntity<String> check(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null || request.getSession().getAttribute("token") == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      }
      Long id = Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString());
      String token = request.getSession().getAttribute("token").toString();
      Usuario u = ur.findByIdAndToken(id, token);
      if (u == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      } else {
         if (u.getDt_exp_token().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(401).body("Não autorizado");
         } else {
            return ResponseEntity.ok("Autorizado");
         }
      }
   }

   @PostMapping("/logout")
   public ResponseEntity<String> logout(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      }
      Long id = Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString());
      String token = request.getSession().getAttribute("token").toString();
      Usuario u = ur.findByIdAndToken(id, token);
      if (u == null) {
         return ResponseEntity.status(401).body("Não autorizado");
      } else {
         if (u.getDt_exp_token().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(401).body("Não autorizado");
         } else {
            u.setToken(null);
            u.setDt_exp_token(null);
            ur.save(u);
            request.getSession().invalidate();
            return ResponseEntity.ok("Logout realizado");
         }
      }
   }

   @GetMapping("/checkRole")
   public boolean checkAdmin(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null) {
         return false;
      }
      Long id = Long.parseLong(request.getSession().getAttribute("usuarioLogado").toString());
      String token = request.getSession().getAttribute("token").toString();
      Usuario u = ur.findByIdAndToken(id, token);
      if (u == null) {
         return false;
      } else {
         if (u.getDt_exp_token().isBefore(LocalDateTime.now()) || !u.getRole().equals("ADMIN")) {
            return false;
         } else {
            return true;
         }
      }
   }

}
