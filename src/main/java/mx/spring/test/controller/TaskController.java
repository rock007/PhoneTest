package mx.spring.test.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import mx.spring.test.data.entity.TaskEntity;
import mx.spring.test.data.privider.TaskProvider;
import mx.spring.test.model.JsonData;
import mx.spring.test.model.JsonMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TaskController {

	 @Autowired
	 private 	TaskProvider taskProvider;
	 
	 private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
	 
	 @RequestMapping(value="/submitTask",method=RequestMethod.POST)
		public @ResponseBody JsonMsg submitTask(@ModelAttribute TaskEntity model,HttpServletRequest request){
			
			String taskCode=model.getTask_code();
			int taskId=0;		
			
			if(taskCode==null ||"".equals(taskCode)){
				
				//taskId=taskProvider.getNextVal("task");
				taskCode=String.valueOf(taskId);
					
				//taskProvider.addTask(model);
							
			}else{
						
				//taskProvider.updateTask(model);
				
			}		
			taskProvider.addTask(model);
			
			return new JsonMsg(true,"保存测试任务成功！");
		}
	 
	 @RequestMapping(value="/getTasks" ,method=RequestMethod.GET)
		public @ResponseBody JsonData<TaskEntity> getTaskListBy(@ModelAttribute TaskEntity entity){
			
			List<TaskEntity>  list= taskProvider.getTasks();
			
			return new JsonData<TaskEntity>(list.size(),list);
		}
}
