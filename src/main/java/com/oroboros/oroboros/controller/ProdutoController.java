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

import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository pr;

    @RequestMapping("/listar")
    public List<Produto> listarTodos() {
        return pr.findAll();
    }

    @GetMapping("/{id}")
    public Produto get(@PathVariable Long id) {
        Produto p = null;
        Optional<Produto> produtoOptional = pr.findById(id);
        if (produtoOptional.isPresent()) {
            p = produtoOptional.get();
        } 
        return p;
    }

    @PostMapping
    public Produto salvar(Produto p) {
        return pr.save(p);
    }

    @DeleteMapping("/{id}")  // assim fica produto/6 por exemplo
    public Produto excluir(@PathVariable Long id) {
        Produto p = this.get(id);
        pr.deleteById(id);
        return p;
    }

}
