package com.oroboros.oroboros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Categoria;
import com.oroboros.oroboros.repository.CategoriaRepository;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

   @Autowired
   private CategoriaRepository r;

   /***
    * Retorna todas as categorias
    * @return List<Categoria>
    */
   @GetMapping("/listar")
   public List<Categoria> getAllCategoria() {
      return r.findAll();
   }

   /***
    * Retorna uma categoria pelo id
    * @param id categoria
    * @return Categoria
    */
   @GetMapping("/{id}")
   public Categoria getCategoria(@PathVariable Long id) {
      Categoria c = null;
      Optional<Categoria> cOptional = r.findById(id);
      if (cOptional.isPresent()) {
         c = cOptional.get();
      }
      return c;
   }
}
