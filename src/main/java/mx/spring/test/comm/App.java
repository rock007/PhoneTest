package mx.spring.test.comm;

import java.text.SimpleDateFormat;

public class App {
	
	public static String CON_SESSION_LOGIN="PHONE_TEST_SESSION";
	
	private static SimpleDateFormat sd = new SimpleDateFormat("yyyyMMddHHmmss");

	public static String basePath="PhoneTest"; 
	
	public static String GetCurDT(){	            
          return sd.format(new java.util.Date());
	}
	
}
