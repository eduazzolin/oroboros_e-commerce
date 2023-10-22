package com.oroboros.oroboros.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
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

    @PostMapping("/salvar")
    public Artista salvar(@RequestBody Artista p) {
        return pr.save(p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        Artista p = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
        pr.deleteById(id);
        return ResponseEntity.ok(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualiza(@PathVariable Long id, @RequestBody Artista a) {
        Artista artistaAtual = pr.findById(id).orElseThrow(() -> new EntidadeException("Artista", id));
        if (artistaAtual.getId() != null) {
            a.setId(id);
            artistaAtual = pr.save(a);
        }
        return ResponseEntity.ok(artistaAtual);
    }

    private static final String UPLOAD_DIR = "./uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file, @RequestParam("artistaId") Long artistaId) {
        String uploadImage = service.uploadImage(file, artistaId);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);



    }
        if (!file.isEmpty()) {
            try {
                // Verifique se o diretório de upload existe, crie-o se não existir
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Salve o arquivo na pasta de upload
                Path filePath = Paths.get(UPLOAD_DIR, file.getOriginalFilename());
                file.transferTo(filePath.toFile());

                // Faça algo com o ID do artista (artistaId), por exemplo, associá-lo ao arquivo

                return "Arquivo carregado com sucesso!";
            } catch (IOException e) {
                return "Erro ao carregar o arquivo: " + e.getMessage();
            }
        } else {
            return "Arquivo vazio";
        }
    }
}
