package mx.spring.test.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import mx.spring.test.data.entity.BuildingEntity;
import mx.spring.test.data.entity.MobileEntity;
import mx.spring.test.data.entity.PostionEntity;
import mx.spring.test.data.entity.SimpleEntity;
import mx.spring.test.data.entity.TPhoneEntity;


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
import org.springframework.web.bind.annotation.RequestParam;
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
	 
	 @RequestMapping(value="/getBuildings" )
		public @ResponseBody JsonData<BuildingEntity> getBuildingListBy(@ModelAttribute BuildingEntity entity){
			
			List<BuildingEntity>  list= taskProvider.getBuildingList(entity);
			
			return new JsonData<BuildingEntity>(list.size(),list);
		}
	 
	 
	 	@RequestMapping(value = "/updateBuilding", method = RequestMethod.POST)
		public @ResponseBody JsonMsg   updateBuilding( @ModelAttribute BuildingEntity m){
		 
			JsonMsg msg=new JsonMsg();
			
			if(m.getBid()>0){		
				taskProvider.updateBuilding(m);
				msg= new JsonMsg(true, "更新楼宇信息成功！");
			}else{
				taskProvider.addBuilding(m);

				 msg= new JsonMsg(true, "添加楼宇信息成功！");
			}
			return  msg;
	 }
	 
	 
	@RequestMapping(value = "/getPostionBy", method = RequestMethod.GET)
	public @ResponseBody
	JsonData<PostionEntity> getPostionBy(@RequestParam  int bid) {

		List<PostionEntity> list = taskProvider.getPostionBy(bid);

		return new JsonData<PostionEntity>(list.size(), list);

	}

	@RequestMapping(value = "/updatePostion", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg updatePostion(@ModelAttribute  PostionEntity m) {
		
		JsonMsg msg=new JsonMsg();
		
		if(m.getPid()>0){		
			taskProvider.updatePostion(m);
			msg= new JsonMsg(true, "更新点位信息成功！");
		}else{
			taskProvider.addPostion(m);

			 msg= new JsonMsg(true, "添加点位信息成功！");
		}
		return  msg;
	}

	@RequestMapping(value = "/delPostion", method = RequestMethod.GET)
	public @ResponseBody
	JsonMsg delPostion(@RequestParam int bid) {
		taskProvider.delPostion(bid);

		return new JsonMsg(true, "删除点位信息成功！");
	}
		
	
	@RequestMapping(value = "/getMobileList", method = RequestMethod.GET)
	public @ResponseBody
	JsonData<MobileEntity> getMobileList(@ModelAttribute MobileEntity entity) {

		List<MobileEntity> list = taskProvider.getMobileList(entity);

		return new JsonData<MobileEntity>(list.size(), list);
	}

	@RequestMapping(value = "/updateMobile", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg updateMobile(@ModelAttribute MobileEntity m) {

		JsonMsg msg = new JsonMsg();
		List<MobileEntity> list=taskProvider.getMobileList(m);
		
		if (list!= null&&list.size()>0) {
			taskProvider.updateMobile(m);
			msg = new JsonMsg(true, "更新巡检人员信息成功！");
		} else {
			taskProvider.addMobile(m);

			msg = new JsonMsg(true, "添加巡检人员信息成功！");
		}
		return msg;
	}

	@RequestMapping(value = "/delMobile", method = RequestMethod.GET)
	public @ResponseBody
	JsonMsg delMobile(@RequestParam String mobileId) {
		taskProvider.delMobile(mobileId);

		return new JsonMsg(true, "删除巡检人员信息成功！");
	}
	
	/**
	 * 测试接口
	 * *
	 */
	@RequestMapping(value = "/TaskQuery.do", method = RequestMethod.GET)
	public @ResponseBody 	SimpleEntity taskQuery(@RequestParam("phone") String mobileId) {
		
		String msg="";
		
		String building_format="<Building BCode=\"%s\" BName=\"%s\" isNew=\"1\" Remarks=\"%s\">%s</Building>";

		String postion_format="<Position PCode=\"%s\" TestTask=\"%s\" />";
		
		List<BuildingEntity> blist= taskProvider.getBuildingForTask(mobileId);
		
		String m1="";
		for(BuildingEntity en:blist){
			
			List<PostionEntity> plist=taskProvider.getPostionForTask(mobileId, en.getBid());
			
			String m2="";
			for(PostionEntity p:plist){
				
				 m2+=String.format(postion_format, p.getPcode(),p.getTask());
				
			}
			
			m1+=String.format(building_format, en.getBcode(),en.getBname(),en.getRemarks(),m2);			
			
		}		
		
		return new SimpleEntity( msg+m1);
	}
	
	@RequestMapping(value = "/Login.do", method = RequestMethod.GET)
	public @ResponseBody 	String login(@RequestParam("phone") String mobileId,@RequestParam("code") String code) {
		
		return "Y";		
	}
	
	
	@RequestMapping(value = "/addTestUser", method = RequestMethod.POST)
	public @ResponseBody	JsonMsg addTestUser(@RequestParam String mobiles,@RequestParam int bid) {
		
		String list[]=mobiles.split(",");
		
		for(String m:list){
			
			TPhoneEntity entity=new TPhoneEntity();
			
			entity.setBid(bid);
			entity.setPhoneNo(m);
			
			if(taskProvider.checkExistTT_Phone(entity)>0)continue;
			
			taskProvider.addTT_Phone(entity);
			
		}

		return new JsonMsg(true, "添加测试人员成功！");
	}
	
	@RequestMapping(value = "/getTestUserList", method = RequestMethod.GET)
	public @ResponseBody	JsonData<MobileEntity> getTestUserList(@RequestParam int bid) {

		List<MobileEntity> list = taskProvider.getTestUserList(bid);

		return new JsonData<MobileEntity>(list.size(), list);
	}
	
	@RequestMapping(value = "/delTestUser", method = RequestMethod.POST)
	public @ResponseBody	JsonMsg delTestUser(@RequestParam String mobile,@RequestParam int bid) {
		
		
		if(mobile!=null&&bid>0){
			
			TPhoneEntity entity=new TPhoneEntity();
			
			entity.setBid(bid);
			entity.setPhoneNo(mobile);
			taskProvider.delTT_Phone(entity);			
		}

		return new JsonMsg(true, "删除测试人员成功！");
	}
}
