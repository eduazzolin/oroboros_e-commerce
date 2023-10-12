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

import com.oroboros.oroboros.model.ProdutoImagem;
import com.oroboros.oroboros.repository.ProdutoImagemRepository;

@RestController
@RequestMapping("/produtoImagem")
public class ProdutoImagemController {

    @Autowired
    private ProdutoImagemRepository pr;

    @RequestMapping("/listar")
    public List<ProdutoImagem> listarTodos() {
        return pr.findAll();
    }

    @GetMapping("/{id}")
    public ProdutoImagem get(@PathVariable Long id) {
        ProdutoImagem p = null;
        Optional<ProdutoImagem> produtoImagemOptional = pr.findById(id);
        if (produtoImagemOptional.isPresent()) {
            p = produtoImagemOptional.get();
        } 
        return p;
    }

    @PostMapping
    public ProdutoImagem salvar(ProdutoImagem p) {
        return pr.save(p);
    }

    @DeleteMapping("/{id}")  // assim fica produtoImagem/6 por exemplo
    public ProdutoImagem excluir(@PathVariable Long id) {
        ProdutoImagem p = this.get(id);
        pr.deleteById(id);
        return p;
    }

}
