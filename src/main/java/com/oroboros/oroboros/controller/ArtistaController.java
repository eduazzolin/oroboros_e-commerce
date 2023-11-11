package com.oroboros.oroboros.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oroboros.oroboros.model.Artista;
import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ArtistaRepository;
import com.oroboros.oroboros.util.EntidadeException;

@RestController
@RequestMapping("/artista")
public class ArtistaController {

   @Autowired
   private ArtistaRepository pr;
   @Autowired
   UsuarioController uc = new UsuarioController();

   @RequestMapping("/listar")
   public List<Artista> listarTodos(HttpServletRequest request) {
      if (uc.checkAdmin(request)) {
         return pr.findByRemoved(false);
      } else {
         return null;
      }
   }

   @GetMapping("/{id}")
   public Artista getArtista(@PathVariable Long id) {
      return pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
   }

   @GetMapping("/img/{id}")
   public ResponseEntity<?> downloadImage(@PathVariable Long id) {
      byte[] imageData = this.getArtista(id).getImagem();
      return ResponseEntity.status(HttpStatus.OK)
              .contentType(MediaType.valueOf("image/png"))
              .body(imageData);

   }

   @PostMapping("/salvar")
   public Artista salvar(@RequestBody Artista p, HttpServletRequest request) {
      if (!uc.checkAdmin(request)) {
         return null;
      } else {
         return pr.save(p);
      }
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<?> excluir(@PathVariable Long id, HttpServletRequest request) {
      if (uc.checkAdmin(request)) {
         Artista p = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         pr.deleteById(id);
         return ResponseEntity.ok(p);
      } else {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      }
   }

   @PutMapping("/{id}")
   public ResponseEntity<?> atualiza(@PathVariable Long id, @RequestBody Artista a, HttpServletRequest request) {
      if (!uc.checkAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Artista artistaAtual = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         if (artistaAtual.getId() != null) {
            a.setId(id);
            artistaAtual = pr.save(a);
         }
         return ResponseEntity.ok(artistaAtual);
      }
   }

   @PutMapping("/remover/{id}")
   public ResponseEntity<?> remocaoLogica(@PathVariable Long id, HttpServletRequest request) {
      if (!uc.checkAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Artista p = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         p.setRemoved(true);
         p = pr.save(p);
         return ResponseEntity.ok(p);
      }
   }

   @PutMapping("/upload")
   public ResponseEntity<?> uploadImageServ(@RequestParam("image") MultipartFile file, @RequestParam("id") Long id, HttpServletRequest request) {
      if (!uc.checkAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Artista a = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         try {
            a.setImagem(file.getBytes());
            pr.save(a);
         } catch (IOException e) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem!");
         }
         return ResponseEntity.status(HttpStatus.OK).body("Imagem salva com sucesso!");
      }
   }

}
