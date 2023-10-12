package com.oroboros.oroboros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oroboros.oroboros.model.Artista;
import com.oroboros.oroboros.repository.ArtistaRepository;

@RestController
@RequestMapping("/artista")
public class ArtistaController {

    @Autowired
    private ArtistaRepository pr;

    @RequestMapping("/listar")
    public List<Artista> listarTodos() {
        return pr.findAll();
    }

    @GetMapping("/{id}")
    public Artista get(@PathVariable Long id) {
        Artista p = null;
        Optional<Artista> artistaOptional = pr.findById(id);
        if (artistaOptional.isPresent()) {
            p = artistaOptional.get();
        } 
        return p;
    }

    @PostMapping
    public Artista salvar(Artista p) {
        return pr.save(p);
    }

    @DeleteMapping("/{id}")  // assim fica artista/6 por exemplo
    public Artista excluir(@PathVariable Long id) {
        Artista p = this.get(id);
        pr.deleteById(id);
        return p;
    }

}
