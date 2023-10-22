package com.oroboros.oroboros.util;

public class EntidadeException extends RuntimeException{
    public EntidadeException(String entidade, Long id){
        super("O objeto " + entidade + " com o ID " + id + " não encontrado.");
    }
}