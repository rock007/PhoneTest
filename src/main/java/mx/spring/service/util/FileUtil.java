package mx.spring.service.util;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.LinkedHashMap;
import java.util.Map;

public class FileUtil {

	private Map<String, String> fileMap;

	public FileUtil() {

		fileMap = new LinkedHashMap<String, String>();
	}

	public Map<String, String> getFiles(String dir,FileFilter filter) {

		File root = new File(dir);

		// 目录不存在，返回
		if (root.isDirectory() == false || root.exists() == false) {

			return fileMap;
		}

		File[] filesOrDirs = root.listFiles(filter);

		for (int i = 0; i < filesOrDirs.length; i++) {
			if (filesOrDirs[i].isDirectory()) {
				getFiles(filesOrDirs[i].getAbsolutePath(),filter);
			} else {				
				fileMap.put(filesOrDirs[i].getName(),filesOrDirs[i].getAbsolutePath());
			}
		}
		return fileMap;

	}

	/**
	 * 使用FileChannel拷贝文件
	 * 
	 * @param srcFile
	 * @param destFile
	 * @throws IOException
	 */
	public static void Move(File srcFile, File destFile,boolean isDel)
			throws IOException {
		if ((!srcFile.exists()) || (srcFile.isDirectory())) {
			return;
		}

		if (!destFile.exists()) {
			//createFile(destFile.getAbsolutePath());
			
			File parendir=new File( destFile.getParent());
			
			if (!parendir.exists())
				parendir.mkdirs();
			
			 if (! destFile.createNewFile()){
				 System.out.println(" 文件移动失败，创建文件失败 ");
				 return ;
			 }
		}

		FileChannel out = null;
		FileChannel in = null;
		try {
			out = new FileOutputStream(destFile).getChannel();
			in = new FileInputStream(srcFile).getChannel();
			ByteBuffer buffer = ByteBuffer.allocate(102400);
			int position = 0;
			int length = 0;
			while (true) {
				length = in.read(buffer, position);
				if (length <= 0) {
					break;
				}
				// System.out.println("after read:"+buffer);
				buffer.flip();
				// System.out.println("after flip:"+buffer);
				out.write(buffer, position);
				position += length;
				buffer.clear();
				// System.out.println("after clear:"+buffer);
			}

		} finally {
			if (out != null) {
				out.close();
			}
			if (in != null) {
				in.close();
			}
		}		
		//删除源文件	
		if (isDel) {
			srcFile.delete();
		}
	}

}
