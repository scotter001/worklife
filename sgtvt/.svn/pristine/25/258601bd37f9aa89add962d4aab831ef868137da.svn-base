package vn.worklife.user.util;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Random;

public class RandomString {
	private SecureRandom random = new SecureRandom();

	public String nextSessionId() {
		return new BigInteger(130, random).toString(32);
	}

	public static char[] geek_Password(int len) {
		// A strong password has Cap_chars, Lower_chars,
		// numeric value and symbols. So we are using all of
		// them to generate our password
		String Capital_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String Small_chars = "abcdefghijklmnopqrstuvwxyz";
		String numbers = "0123456789";
		String symbols = "!@#$%^&*_=+-/.?<>)";
		String values = Capital_chars + Small_chars + numbers + symbols;
		// Using random method
		Random rndm_method = new Random();
		char[] password = new char[len];
		for (int i = 0; i < len; i++) {
			// Use of charAt() method : to get character value
			// Use of nextInt() as it is scanning the value as int
			password[i] = values.charAt(rndm_method.nextInt(values.length()));
		}
		return password;
	}
}
