package vn.worklife.security.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class WorklifeDecryptEncryptObject {
    /**
     * Encrypt password based on SHA-512
     */
    public static String encryptPassword(String password) throws Exception {
    	if (password == null) {
            return "";
        }
    	
    	BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    	return bCryptPasswordEncoder.encode(password);
    }
    
    public static Boolean comparePassword(String rawPassword, String encodedPassword) {
    	BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    	return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }
}
