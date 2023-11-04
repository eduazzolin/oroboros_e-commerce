package com.oroboros.oroboros.controller;

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
   public String usuarioLogado(HttpServletRequest request) {
      if (request.getSession().getAttribute("usuarioLogado") == null) {
         return null;
      }
      if (request.getSession().getAttribute("token") == null) {
         return null;
      }
      return request.getSession().getAttribute("usuarioLogado").toString()+":"+request.getSession().getAttribute("token").toString();
   }

   @GetMapping("/check")
   public ResponseEntity<String> check(HttpServletRequest request) {
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
