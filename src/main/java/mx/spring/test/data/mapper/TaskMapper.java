package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.TaskEntity;

public interface TaskMapper {

	public List<TaskEntity> getTasks();

	public void addTask(TaskEntity m);
}
