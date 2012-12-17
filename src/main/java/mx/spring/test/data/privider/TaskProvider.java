package mx.spring.test.data.privider;

import java.util.List;

import mx.spring.test.data.entity.BuildingEntity;
import mx.spring.test.data.entity.MobileEntity;
import mx.spring.test.data.entity.PostionEntity;
import mx.spring.test.data.entity.TPhoneEntity;
import mx.spring.test.data.entity.TaskEntity;
import mx.spring.test.data.mapper.TaskMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskProvider {
	@Autowired
	private TaskMapper mapper;
	
	public List<TaskEntity> getTasks(){
		
		return mapper.getTasks();
	}

	public void addTask(TaskEntity m){
		
		mapper.addTask(m);
	}
	
	public List<BuildingEntity>  getBuildingList(BuildingEntity m){		
		return mapper.getBuildingList(m);
	}	
	public void updateBuilding(BuildingEntity m){
		mapper.updateBuilding(m);
	}
	public void delBuilding(BuildingEntity m){
		mapper.delBuilding(m);
	}
	public void addBuilding(BuildingEntity m){
		mapper.addBuilding(m);		
	}
	
	
	public List<PostionEntity> getPostionBy(int bid){
		
		return mapper.getPostionBy(bid);
	}
	
	public void addPostion(PostionEntity m){
		
		mapper.addPostion(m);
	}
	
	public void updatePostion(PostionEntity m){
		mapper.updatePostion(m);
	}
	
	public void delPostion(int bid){
		mapper.delPostion(bid);
	}
	
	
	public List<MobileEntity> getMobileList(MobileEntity m){
		return mapper.getMobileList(m);
	}
	public void addMobile(MobileEntity m){
		mapper.addMobile(m);
	}
	public void updateMobile(MobileEntity m){
		mapper.updateMobile(m);
	}
	public void delMobile(String phoneNo){
		mapper.delMobile(phoneNo);
	}
	
	
	public List<BuildingEntity> getBuildingForTask(String m){
		
		return mapper.getBuildingForTask(m);
		
	}
	public List<PostionEntity>  getPostionForTask(String phoneNo,int bid){
		MobileEntity m=new MobileEntity();
		
		m.setMobileId(phoneNo);
		m.setStatus(bid);
		
		return mapper.getPostionForTask(m);
	}
	
	public void addTT_Phone(TPhoneEntity m){
		
		mapper.addTT_Phone(m);
	}
	
	public int checkExistTT_Phone(TPhoneEntity m){
		
		return mapper.checkExistTT_Phone(m);
	}
	
	public List<MobileEntity> getTestUserList(int bid){
		
		return mapper.getTestUserList(bid);
	}
}
