package mx.spring.test.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.spring.test.data.entity.LogResultEntity;
import mx.spring.test.data.entity.ResultEntity;
import mx.spring.test.data.privider.ReportProvider;
import mx.spring.test.data.privider.TaskProvider;
import mx.spring.test.model.JsonData;
import mx.spring.test.model.JsonMsg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ReportController {

	 @Autowired
	 private 	ReportProvider reportProvider;
	 
	 private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
	 
	 @ExceptionHandler
		public @ResponseBody JsonMsg handle(Exception e,HttpServletRequest request,HttpServletResponse resp) {
					
			logger.error("出现错误",e);
			
			return new JsonMsg(false,"出现错误");
		}
	 
	@RequestMapping(value = "/testResult")
	public @ResponseBody JsonData<ResultEntity> getReportList(@ModelAttribute ResultEntity m) {
		
		List<ResultEntity> list= reportProvider.getResultList(m);
		int rowNum=reportProvider.getResultListNum(m);
	
		return new JsonData<ResultEntity>(rowNum,list);
	}
	
	@RequestMapping(value = "/testV2Result")
	public @ResponseBody JsonData<LogResultEntity> getReportV2List(@ModelAttribute LogResultEntity m) {
		
		List<LogResultEntity> list= reportProvider.getResultV2List(m);
		int rowNum=reportProvider.getResultV2ListNum(m);
	
		return new JsonData<LogResultEntity>(rowNum,list);
	}
}
