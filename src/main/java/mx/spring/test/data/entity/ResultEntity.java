package mx.spring.test.data.entity;

import java.util.Date;

public class ResultEntity extends PagerInfo{

	private int id;
	private String fileName;
	private String index;
	private String beginDateTime;
	private String endDateTime;
	private String testResult;
	private String pointIndex;
	private String lac;
	private String rxlvl;
	private String cqt;
	private String callResult;
	private Date createDt;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getBeginDateTime() {
		return beginDateTime;
	}

	public void setBeginDateTime(String beginDateTime) {
		this.beginDateTime = beginDateTime;
	}

	public String getEndDateTime() {
		return endDateTime;
	}

	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
	}

	public String getTestResult() {
		return testResult;
	}

	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	public String getPointIndex() {
		return pointIndex;
	}

	public void setPointIndex(String pointIndex) {
		this.pointIndex = pointIndex;
	}

	public String getLac() {
		return lac;
	}

	public void setLac(String lac) {
		this.lac = lac;
	}

	public String getRxlvl() {
		return rxlvl;
	}

	public void setRxlvl(String rxlvl) {
		this.rxlvl = rxlvl;
	}

	public String getCqt() {
		return cqt;
	}

	public void setCqt(String cqt) {
		this.cqt = cqt;
	}

	public String getCallResult() {
		return callResult;
	}

	public void setCallResult(String callResult) {
		this.callResult = callResult;
	}

	public Date getCreateDt() {
		return createDt;
	}

	public void setCreateDt(Date createDt) {
		this.createDt = createDt;
	}

}
