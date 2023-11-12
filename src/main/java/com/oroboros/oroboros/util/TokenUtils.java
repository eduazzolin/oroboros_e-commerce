package com.oroboros.oroboros.util;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class TokenUtils {

   private final static String appKey = "D1DuKN0WTtI4TUNN3LuND3R0CE@NBLV?";

   /***
    * Gera uma data de expiração para o token
    * A data de expiração é sempre 1 dia após a data atual
    * @return LocalDateTime
    */
   public static LocalDateTime generateExpirationDate() {
      return LocalDateTime.now().plusDays(1);
   }

   /***
    * Gera um token aleatório baseado na string passada como parâmetro
    * @param data geralmente é Email + ":" + Senha + ":" + Navegador usuário + ":" + IP usuário
    * @return String
    * @throws Exception
    */
   public static String generateToken(String data) throws Exception {
      SecretKey secretKey = new SecretKeySpec(appKey.getBytes(), 0, appKey.length(), "AES");
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.ENCRYPT_MODE, secretKey);
      byte[] encryptedBytes = cipher.doFinal(data.getBytes());
      String token = Base64.getEncoder().encodeToString(encryptedBytes);
      return token.length() > 250 ? token.substring(0, 250) : token;
   }

}
