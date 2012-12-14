package mx.spring.test.data.privider;

import java.util.List;

import mx.spring.test.data.entity.BuildingEntity;
import mx.spring.test.data.entity.MobileEntity;
import mx.spring.test.data.entity.PostionEntity;
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
	
	
}
