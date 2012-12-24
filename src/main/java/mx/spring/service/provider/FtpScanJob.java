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
import mx.spring.test.data.entity.LogResultEntity;
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
				
					LogResultEntity entitiy =new LogResultEntity();
					String row=rows[i];
					String cols[]=row.split("\t");
					
					String dataRow[]=new String[15];
					
					if(cols.length<6){
						
						//format		
						
						logger.error("文件头内容不正确,cols:"+cols.length);
						continue;
					}
					
					for(int ii=0;ii<cols.length;ii++){
						
						dataRow[ii]=cols[ii];
					}
					
					for(int iii=cols.length;iii<dataRow.length;iii++){
						
						dataRow[iii]="";
					}
					
					entitiy.setFileName(m1.getName());
					
					entitiy.setMtype(dataRow[0].trim());					
					entitiy.setBeginDateTime(dataRow[1].trim());
					entitiy.setEndDateTime(dataRow[2].trim());	
					
					entitiy.setKey1(dataRow[3].trim());
					entitiy.setKey2(dataRow[4].trim());
					entitiy.setKey3(dataRow[5].trim());
					entitiy.setKey4(dataRow[6].trim());
					entitiy.setKey5(dataRow[7].trim());
					
					entitiy.setKey6(dataRow[8].trim());
					entitiy.setKey7(dataRow[9].trim());
					entitiy.setKey8(dataRow[10].trim());
					entitiy.setKey9(dataRow[11].trim());
					entitiy.setKey10(dataRow[12].trim());					
					
					entitiy.setCreateDt(new Date());
					reportProvider.addResult2(entitiy );	
					
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
