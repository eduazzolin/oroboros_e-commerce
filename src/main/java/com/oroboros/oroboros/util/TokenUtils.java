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

   private final static String appKey = "DIDUKNOWTTIATUNNELUNDEROCEANBLV?";

   public static LocalDateTime generateExpirationDate() {
      return LocalDateTime.now().plusDays(1);
   }

   public static String generateToken(String data) throws Exception {
      SecretKey secretKey = new SecretKeySpec(appKey.getBytes(), 0, appKey.length(), "AES");
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.ENCRYPT_MODE, secretKey);
      byte[] encryptedBytes = cipher.doFinal(data.getBytes());
      String token = Base64.getEncoder().encodeToString(encryptedBytes);
      return token.length() > 250 ? token.substring(0, 250) : token;
   }

//   public static String decryptToken(String encryptedString) throws Exception {
//      SecretKey secretKey = new SecretKeySpec(appKey.getBytes(), 0, appKey.length(), "AES");
//      Cipher cipher = Cipher.getInstance("AES");
//      cipher.init(Cipher.DECRYPT_MODE, secretKey);
//      byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedString));
//      return new String(decryptedBytes);
//   }


}
