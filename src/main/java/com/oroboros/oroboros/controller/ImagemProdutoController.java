package com.oroboros.oroboros.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oroboros.oroboros.model.ImagemProduto;
import com.oroboros.oroboros.model.Produto;
import com.oroboros.oroboros.repository.ImagemProdutoRepository;
import com.oroboros.oroboros.repository.ProdutoRepository;
import com.oroboros.oroboros.util.EntidadeException;

@RestController
@RequestMapping("/imgprod")
public class ImagemProdutoController {

    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private ImagemProdutoRepository ir;

   @PutMapping("/upload")
    public ResponseEntity<?> uploadIMGPROD(@RequestParam("image") MultipartFile file, @RequestParam("id") Long id) {
        Produto p = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
        ImagemProduto imgProd = new ImagemProduto();
        try {
            imgProd.setProduto(p);
            imgProd.setDados(file.getBytes());
            ir.save(imgProd);
        } catch (IOException e) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem!");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Imagem salva com sucesso!");
    }

    @GetMapping("/prodid/{id}")
    public List<ImagemProduto> getIMGPROD(@PathVariable Long id) {
        Produto p = pr.findById(id).orElseThrow(() -> new EntidadeException("Produto", id));
        return ir.findByProduto(p);
    }

}
