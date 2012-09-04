package mx.spring.test.model;

import java.util.List;

public class JsonData<T> {

	private int count;
	private List<T> rows;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
	
	public JsonData (int num,List<T> list){
		
		this.count=num;
		this.rows=list;
	}
	
	public JsonData(){
		
	}
}
