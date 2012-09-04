package mx.spring.service.util;

import java.security.SecureRandom;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

public class DESUtil {

	public static byte[] CBCEncrypt(byte[] data, byte[] key, byte[] iv) {
		try {
			// ��ԭʼ��Կ��������DESKeySpec����
			DESKeySpec dks = new DESKeySpec(key);

			// ����һ���ܳ׹�����Ȼ��������DESKeySpecת����
			// һ��SecretKey����
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey secretKey = keyFactory.generateSecret(dks);

			// Cipher����ʵ����ɼ��ܲ���"
			Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
			// ������NoPadding��ʽ��data���ȱ�����8�ı���
			// Cipher cipher = Cipher.getInstance("DES/CBC/NoPadding");
			// ���ܳ�ԭʼ��Cipher����
			IvParameterSpec param = new IvParameterSpec(iv);

			cipher.init(Cipher.ENCRYPT_MODE, secretKey, param);
			// ִ�м��ܲ���

			byte encryptedData[] = cipher.doFinal(data);

			return encryptedData;
		} catch (Exception e) {

			System.err.println("DES�㷨���������ݳ���!");

			e.printStackTrace();
		}
		return null;

	}

	public static byte[] CBCDecrypt(byte[] data, byte[] key, byte[] iv) {
		try {
			// ��ԭʼ�ܳ���������һ��DESKeySpec����
			DESKeySpec dks = new DESKeySpec(key);
			// ����һ���ܳ׹�����Ȼ��������DESKeySpec����ת����һ��SecretKey����
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey secretKey = keyFactory.generateSecret(dks);
			// using DES in CBC mode
			Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
			// ������NoPadding��ʽ��data���ȱ�����8�ı���
			// Cipher cipher = Cipher.getInstance("DES/CBC/NoPadding");
			// ���ܳ�ԭʼ��Cipher����
			IvParameterSpec param = new IvParameterSpec(iv);
			cipher.init(Cipher.DECRYPT_MODE, secretKey, param);
			// ��ʽִ�н��ܲ���
			byte decryptedData[] = cipher.doFinal(data);
			return decryptedData;
		} catch (Exception e) {
			System.err.println("DES�㷨�����ܳ���");
			e.printStackTrace();
		}
		return null;
	}
	

	public static String makeDesKey(){
		
		byte[] key = "87654321".getBytes();
		String code="";
		try {
			 //SecureRandom sr = new SecureRandom(); 
		
			 //key=sr.generateSeed(8);
			 
			 DESKeySpec dks = new DESKeySpec(key);
			 SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			
			SecretKey secretKey = keyFactory.generateSecret(dks);
			
			code=new String( secretKey.getEncoded());
			
		} catch (Exception e) {	
			e.printStackTrace();
			code="";
		}				
		
		return code;
	}
	
	public static String MakeDESKey(){
		
        KeyGenerator keygen;  
        SecretKey deskey;     
               
        byte[] key={};        
        
        try { 
            Security.addProvider(new com.sun.crypto.provider.SunJCE());		

			keygen = KeyGenerator.getInstance("DES");
		
	        //������Կ  
	        deskey = keygen.generateKey();
	        
	        key= deskey.getEncoded();
			
		} catch (Exception e) {			
			e.printStackTrace();
		}
        return new String(key);
	}
	
	public static void main(String[] args){
		
		String mm=MakeDESKey();
		byte[] b=mm.getBytes();
	}
}
