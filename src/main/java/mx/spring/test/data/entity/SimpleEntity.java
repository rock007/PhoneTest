package mx.spring.test.data.entity;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "response")
public class SimpleEntity {

	private String root;

	public SimpleEntity(){
		
	}
	public SimpleEntity(String r){
		this.root=r;
	}
	public String getRoot() {
		return root;
	}
	@XmlElement
	public void setRoot(String root) {
		this.root = root;
	}
	
}
