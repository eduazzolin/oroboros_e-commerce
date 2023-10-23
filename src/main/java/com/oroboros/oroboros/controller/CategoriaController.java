package com.oroboros.oroboros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Artista;
import com.oroboros.oroboros.model.Categoria;
import com.oroboros.oroboros.repository.CategoriaRepository;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaRepository r;

    @GetMapping("/listar")
    public List<Categoria> listarTodos() {
        return r.findAll();
    }

   @GetMapping("/{id}")
    public Categoria getCategoriaById(@PathVariable Long id) {
        Categoria c = null;
        Optional<Categoria> cOptional = r.findById(id);
        if (cOptional.isPresent()) {
            c = cOptional.get();
        }
        return c;
    }
}
