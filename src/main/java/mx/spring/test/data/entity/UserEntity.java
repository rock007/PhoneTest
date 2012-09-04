package mx.spring.test.data.entity;

import java.util.Date;

public class UserEntity {
	private String userName;
	private String passWord;
	private int role;
	private String remarks;
	private Date createDT;
	private String createIP;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getCreateDT() {
		return createDT;
	}

	public void setCreateDT(Date createDT) {
		this.createDT = createDT;
	}

	public String getCreateIP() {
		return createIP;
	}

	public void setCreateIP(String createIP) {
		this.createIP = createIP;
	}

}
