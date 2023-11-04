package com.oroboros.oroboros.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class Usuario {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column
   private String nome;
   @Column(unique = true)
   private String email;
   @Column
   private String senha;
   @Column
   private String cpf_cnpj;
   @Column
   private String token;

   public String getCpf_cnpj() {
      return cpf_cnpj;
   }

   public void setCpf_cnpj(String cpf_cnpj) {
      this.cpf_cnpj = cpf_cnpj;
   }

   @Column
   private LocalDateTime dt_exp_token;
   @Column
   private LocalDateTime dt_cadastro;
   @Column
   private String role;

   public String getRole() {
      return role;
   }

   public void setRole(String role) {
      this.role = role;
   }

   public Usuario() {
      super();
   }

   public Usuario(Long id, String nome, String email, String senha, String cpf_cnpj, String token, LocalDateTime dt_exp_token, LocalDateTime dt_cadastro, String role) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.cpf_cnpj = cpf_cnpj;
      this.token = token;
      this.dt_exp_token = dt_exp_token;
      this.dt_cadastro = dt_cadastro;
      this.role = role;
   }

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

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getSenha() {
      return senha;
   }

   public void setSenha(String senha) {
      this.senha = senha;
   }

   public String getToken() {
      return token;
   }

   public void setToken(String token) {
      this.token = token;
   }

   public LocalDateTime getDt_exp_token() {
      return dt_exp_token;
   }

   public void setDt_exp_token(LocalDateTime dt_exp_token) {
      this.dt_exp_token = dt_exp_token;
   }

   public LocalDateTime getDt_cadastro() {
      return dt_cadastro;
   }

   public void setDt_cadastro(LocalDateTime dt_cadastro) {
      this.dt_cadastro = dt_cadastro;
   }
}
