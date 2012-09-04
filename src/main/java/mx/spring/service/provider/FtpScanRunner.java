package mx.spring.service.provider;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FtpScanRunner extends Thread{
	
	private  FtpScanJob  job;
	private int scanInterval;
	private int enable;
	
	private static Log logger = LogFactory.getLog("FtpScan");
	
	@Override
	public void run() {
		
		while (true) {
			try {
				
				if(enable==1)				
					job.doWork();
				
			} catch (Throwable e) {
				
				logger.error(e);				
			} finally {
				try {
					Thread.sleep(scanInterval * 60 * 1000);
					
				} catch (InterruptedException e) {
					logger.error(e);					
				}
			}
		}
		
	}
	
	public FtpScanJob getJob() {
		return job;
	}

	public void setJob(FtpScanJob job) {
		this.job = job;
	}


	public int getScanInterval() {
		return scanInterval;
	}

	public void setScanInterval(int scanInterval) {
		this.scanInterval = scanInterval;
	}

	public int getEnable() {
		return enable;
	}

	public void setEnable(int enable) {
		this.enable = enable;
	}
}
