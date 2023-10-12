package com.oroboros.oroboros.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")
public class Produto {
    
    // Atributos:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String categoria_id;

    @Column
    private Long artista_id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 500)
    private String descricao;

    @Column(precision = 2)
    private Double preco;

    @Column
    private Boolean ativo;
    
    @Column
    private LocalDateTime data_cadastro;

    @Column
    private String imagem;
    
    // Getters e Setters:
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCategoria_id() {
        return categoria_id;
    }
    public void setCategoria_id(String categoria_id) {
        this.categoria_id = categoria_id;
    }
    public Long getArtista_id() {
        return artista_id;
    }
    public void setArtista_id(Long artista_id) {
        this.artista_id = artista_id;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Double getPreco() {
        return preco;
    }
    public void setPreco(Double preco) {
        this.preco = preco;
    }
    public Boolean getAtivo() {
        return ativo;
    }
    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
    public LocalDateTime getData_cadastro() {
        return data_cadastro;
    }
    public void setData_cadastro(LocalDateTime data_cadastro) {
        this.data_cadastro = data_cadastro;
    }
    public String getImagem() {
        return imagem;
    }
    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
