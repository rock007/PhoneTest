package mx.spring.service.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.tools.zip.ZipFile;


public class ZipUtil {

	private static final int BUFFER = 1024;
	
	public static void unZipFileByOpache(String ZipFilePath,
			String unZipRoot) throws Exception, IOException {
		
		 ZipFile zipFile = new ZipFile(ZipFilePath,"GBK");
		 
		 @SuppressWarnings("rawtypes")
		java.util.Enumeration e = zipFile.getEntries();
		 		 
		org.apache.tools.zip.ZipEntry zipEntry;
		
		while (e.hasMoreElements()) {
			zipEntry = (org.apache.tools.zip.ZipEntry) e.nextElement();
			
			InputStream fis = zipFile.getInputStream(zipEntry);			
			if (zipEntry.isDirectory()) {
				
			} else {
				File file = new File(unZipRoot + File.separator
						+ zipEntry.getName());
				File parentFile = file.getParentFile();
				parentFile.mkdirs();
				
				FileOutputStream fos = new FileOutputStream(file);
				byte[] b = new byte[BUFFER];
				int len;
				while ((len = fis.read(b, 0, b.length)) != -1) {
					fos.write(b, 0, len);
				}
				fos.close();
				fis.close();
			}
		}
		
		zipFile.close();
	}
	
//	protected String generateFile(long tranid, String fileName) {
//		String dir = fileDir;
//
//		long fileId = System.currentTimeMillis();
//		if (fileName.lastIndexOf(".txt") != -1) {
//			fileName = fileName.substring(0, fileName.lastIndexOf(".txt"));
//		}
//		if (fileName.lastIndexOf(".tar.zip") != -1) {
//			fileName = fileName.substring(0, fileName.lastIndexOf(".tar.zip"));
//		}
//
//		String zipFileName = fileName + "_1000.zip";
//		String txtFileName = fileName + "_1000.txt";
//		logger.info(zipFileName + ":" + txtFileName);
//
//		String url = "http://" + hostPort + "/caixin/files/" + zipFileName
//				+ "?id=" + fileId;
//
//		String sql = "select dist_id,mobile from b2f_users where tran_id = "
//				+ tranid;
//
//		ZipOutputStream zops = null;
//		Connection con = Util.getConnection();
//		try {
//			zops = new ZipOutputStream(new BufferedOutputStream(
//					new FileOutputStream(dir + fileId)));
//			zops.setEncoding("gbk");
//			zops.putNextEntry(new ZipEntry(txtFileName));
//			Statement st = con.createStatement();
//			ResultSet rs = st.executeQuery(sql);
//			while (rs.next()) {
//				zops.write((rs.getString("mobile") + ","
//						+ rs.getString("dist_id") + "\n").getBytes("gbk"));
//			}
//			rs.close();
//			st.close();
//			zops.flush();
//			zops.closeEntry();
//			zops.close();
//
//			System.out.println(dir + fileId);
//			System.out.println(url);
//			sql = "update tran_instance set output_file = '" + url
//					+ "' , state = '生成文件' where tran_id = " + tranid;
//			st = con.createStatement();
//			st.executeUpdate(sql);
//			con.commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//			try {
//				if (con != null)
//					con.rollback();
//			} catch (SQLException e1) {
//				e1.printStackTrace();
//			}
//			try {
//				if (zops != null) {
//					zops.flush();
//					zops.close();
//				}
//			} catch (IOException e1) {
//				e1.printStackTrace();
//			}
//			return null;
//		} finally {
//			try {
//				if (con != null && !con.isClosed()) {
//					con.close();
//				}
//			} catch (SQLException e) {
//				e.printStackTrace();
//			}
//		}
//		return url;
//	}
}
