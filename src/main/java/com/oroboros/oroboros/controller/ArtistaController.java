package com.oroboros.oroboros.controller;

import java.io.IOException;
import java.util.List;

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
import com.oroboros.oroboros.repository.ArtistaRepository;
import com.oroboros.oroboros.util.EntidadeException;

@RestController
@RequestMapping("/artista")
public class ArtistaController {

   @Autowired
   private ArtistaRepository pr;
   @Autowired
   UsuarioController uc = new UsuarioController();

   /***
    * Retorna todos os artistas
    * @param request
    * @return List<Artista>
    */
   @RequestMapping("/listar")
   public List<Artista> getAllArtista(HttpServletRequest request) {
      if (uc.getCheckAdmin(request)) {
         return pr.findByRemoved(false);
      } else {
         return null;
      }
   }

   /***
    * Retorna um artista pelo id
    * @param id artista
    * @return Artista
    */
   @GetMapping("/{id}")
   public Artista getArtista(@PathVariable Long id) {
      return pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
   }

   /***
    * Retorna a imagem de um artista pelo id
    * @param id artista
    * @return ResponseEntity<?>
    */
   @GetMapping("/img/{id}")
   public ResponseEntity<?> getImagemArtista(@PathVariable Long id) {
      byte[] imageData = this.getArtista(id).getImagem();
      return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);

   }

   /***
    * Salva um artista
    * @param p artista
    * @param request
    * @return Artista
    */
   @PostMapping("/salvar")
   public Artista postArtista(@RequestBody Artista p, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return null;
      } else {
         return pr.save(p);
      }
   }

   /***
    * Deleta um artista pelo id
    * @param id artista
    * @param request
    * @return ResponseEntity<?>
    */
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteArtista(@PathVariable Long id, HttpServletRequest request) {
      if (uc.getCheckAdmin(request)) {
         Artista p = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         pr.deleteById(id);
         return ResponseEntity.ok(p);
      } else {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      }
   }

   /***
    * Atualiza um artista pelo id
    * @param id
    * @param a artista
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/{id}")
   public ResponseEntity<?> putArtista(@PathVariable Long id, @RequestBody Artista a, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
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

   /***
    * Remove logicamente um artista pelo id
    * @param id artista
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/remover/{id}")
   public ResponseEntity<?> deleteLogicArtista(@PathVariable Long id, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
      } else {
         Artista p = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
         p.setRemoved(true);
         p = pr.save(p);
         return ResponseEntity.ok(p);
      }
   }

   /***
    * Salva a imagem de um artista pelo id
    * @param file
    * @param id artista
    * @param request
    * @return ResponseEntity<?>
    */
   @PutMapping("/upload")
   public ResponseEntity<?> uploadImageArtista(@RequestParam("image") MultipartFile file, @RequestParam("id") Long id, HttpServletRequest request) {
      if (!uc.getCheckAdmin(request)) {
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
