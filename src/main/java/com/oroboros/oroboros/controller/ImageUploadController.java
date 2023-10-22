package com.oroboros.oroboros.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageUploadController {

    private static final String UPLOAD_DIR = "./uploads/";

    @PostMapping("/upload")
    public String salvarImagem(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                Path filePath = Paths.get(UPLOAD_DIR, file.getOriginalFilename());
                file.transferTo(filePath.toFile());

                return "Arquivo carregado com sucesso!";
            } catch (IOException e) {
                return "Erro ao carregar o arquivo: " + e.getMessage();
            }
        } else {
            return "Arquivo vazio";
        }
    }

}
