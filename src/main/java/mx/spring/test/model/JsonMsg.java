package mx.spring.test.model;

public class JsonMsg {
	private boolean success;
	private String msg;
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public JsonMsg(boolean b,String m){
		
		this.success=b;
		this.msg=m;
	}
	
	public JsonMsg(){
		
	}
}
