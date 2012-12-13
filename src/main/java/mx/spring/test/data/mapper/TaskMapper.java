package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.BuildingEntity;
import mx.spring.test.data.entity.PostionEntity;
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
}
