package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.BuildingEntity;
import mx.spring.test.data.entity.MobileEntity;
import mx.spring.test.data.entity.PostionEntity;
import mx.spring.test.data.entity.TPhoneEntity;
import mx.spring.test.data.entity.TaskEntity;

public interface TaskMapper {

	public List<TaskEntity> getTasks();

	public void addTask(TaskEntity m);
	
	public List<BuildingEntity>  getBuildingList(BuildingEntity m);
	public void updateBuilding(BuildingEntity m);
	public void delBuilding(BuildingEntity m);
	public void addBuilding(BuildingEntity m);
	
	
	public List<PostionEntity> getPostionBy(int bid);	
	public void addPostion(PostionEntity m);	
	public void updatePostion(PostionEntity m);	
	public void delPostion(int bid);
	
	
	public List<MobileEntity> getMobileList(MobileEntity m);
	public void addMobile(MobileEntity m);
	public void updateMobile(MobileEntity m);
	public void delMobile(String phoneNo);
	
	
	public List<BuildingEntity> getBuildingForTask(String m);
	public List<PostionEntity>  getPostionForTask(MobileEntity m);
	
	public void addTT_Phone(TPhoneEntity m);	
	public int checkExistTT_Phone(TPhoneEntity m);
	
	public List<MobileEntity> getTestUserList(int bid);
}
