package mx.spring.service.provider;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import mx.spring.service.util.DESUtil;
import mx.spring.service.util.FileUtil;
import mx.spring.service.util.ZipFileFilter;
import mx.spring.service.util.ZipUtil;
import mx.spring.test.comm.App;
import mx.spring.test.data.entity.ImportLogEntity;
import mx.spring.test.data.entity.ResultEntity;
import mx.spring.test.data.privider.ReportProvider;
import mx.spring.test.data.privider.TaskProvider;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;
import org.springframework.beans.factory.annotation.Autowired;

public class FtpScanJob {
	
	private static Log logger = LogFactory.getLog("FtpScan");
	
	private String scan_dir;
	
	private ReportProvider reportProvider;
	
	static File upload_dir;
	
	public void doWork() {
		
		logger.debug("job is begin");
		
		upload_dir=new File(scan_dir);
		
		if(!upload_dir.exists()){
			
			upload_dir.mkdirs();
		}
		File uploadFiles[]= upload_dir.listFiles();
		
		for(File m1:uploadFiles){
		
			//查找目录,eg:D_0825001_Tester01_001.txt
			if((m1.isFile()&&m1.getName().toLowerCase().endsWith("txt"))){
				
				String contentStr=readText(m1);
				
				if(contentStr.equals("")){
					
					logger.warn("read text is empty !");
					continue;
				}
				
				String rows[] = contentStr.split("\n");
				
				for(int i=0;i<rows.length;i++){
				
					ResultEntity entitiy =new ResultEntity();
					String row=rows[i];
					String cols[]=row.split("\t");
					
					if(cols.length<9){
						
						//format		
						
						logger.error("文件头内容不正确,cols:"+cols.length);
						continue;
					}
					
					entitiy.setFileName(m1.getName());
					
					entitiy.setIndex(cols[0].trim());					
					entitiy.setBeginDateTime(cols[1].trim());
					entitiy.setEndDateTime(cols[2].trim());					
					entitiy.setTestResult(cols[3].trim());					
					entitiy.setPointIndex(cols[4].trim());
					
					entitiy.setLac(cols[5].trim());
					entitiy.setRxlvl(cols[6].trim());
					entitiy.setCqt(cols[7].trim());						
					entitiy.setCallResult(cols[8].trim());
					
					entitiy.setCreateDt(new Date());
					reportProvider.addResult(entitiy );	
					
				}			
				
				m1.delete();								
			}			
		}
		logger.debug("job is end");
	}

	private String readText(File txtFile) {

		BufferedInputStream bis2;
		byte[] data = new byte[1024];
		String strData = "";
		try {
			bis2 = new BufferedInputStream(new FileInputStream(txtFile));

			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		
			while (bis2.read(data) != -1) {

				outputStream.write(data);
			}

			strData = outputStream.toString("GBK");

			bis2.close();
			
			outputStream.flush();
			outputStream.close();

		} catch (Exception ex) {

			logger.error("read text file ", ex);

		}

		return strData;
	}
	
	public String getScan_dir() {
		return scan_dir;
	}

	public void setScan_dir(String scan_dir) {
		this.scan_dir = scan_dir;
	}

	public ReportProvider getReportProvider() {
		return reportProvider;
	}

	public void setReportProvider(ReportProvider reportProvider) {
		this.reportProvider = reportProvider;
	}
	
	
}
