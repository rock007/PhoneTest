package mx.spring.test.data.entity;

import java.util.Date;

public class TaskEntity {

	private int id; 
	private String task_code; 
	private String task_type;
	private String params; 
	private String createUser; 
	private Date createDt; 
	private int  status; 
	private String  locationCode; 
	private int  testTimes; 
	private String  testUser; 
	private String  callType; 
	private String  callTel; 
	private int  callTime; 
	private int  timeout ;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTask_code() {
		return task_code;
	}
	public void setTask_code(String task_code) {
		this.task_code = task_code;
	}
	public String getTask_type() {
		return task_type;
	}
	public void setTask_type(String task_type) {
		this.task_type = task_type;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getCreateDt() {
		return createDt;
	}
	public void setCreateDt(Date createDt) {
		this.createDt = createDt;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getLocationCode() {
		return locationCode;
	}
	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}
	public int getTestTimes() {
		return testTimes;
	}
	public void setTestTimes(int testTimes) {
		this.testTimes = testTimes;
	}
	public String getTestUser() {
		return testUser;
	}
	public void setTestUser(String testUser) {
		this.testUser = testUser;
	}
	public String getCallType() {
		return callType;
	}
	public void setCallType(String callType) {
		this.callType = callType;
	}
	public String getCallTel() {
		return callTel;
	}
	public void setCallTel(String callTel) {
		this.callTel = callTel;
	}
	public int getCallTime() {
		return callTime;
	}
	public void setCallTime(int callTime) {
		this.callTime = callTime;
	}
	public int getTimeout() {
		return timeout;
	}
	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}
	
	

}
