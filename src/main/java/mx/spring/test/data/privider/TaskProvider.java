package mx.spring.test.data.privider;

import java.util.List;

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
}
