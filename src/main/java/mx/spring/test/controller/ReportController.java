package mx.spring.test.controller;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.spring.service.util.CSVView;
import mx.spring.test.comm.App;
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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
	
	@RequestMapping(value = "/export")
	public void Export2Csv(@ModelAttribute LogResultEntity m, 
			HttpServletResponse response, final HttpServletRequest request,
			HttpSession session) {
		
		String rowStr = "";
		
		m.setStart(0);
		int rowNum = reportProvider.getResultV2ListNum(m);

		String fileName = "report"+App.GetCurDT()+".csv";
		BufferedWriter writer = null;

		try {
			writer=new BufferedWriter( new OutputStreamWriter(response.getOutputStream(),"utf-8"));
			//writer = new BufferedWriter( response.getWriter());
			
			rowStr="开始时间,"+m.getBeginDateTime()+",结束时间,"+m.getEndDateTime();
		
			//writer.write(0xEF);
			//writer.write(0xBB);
			//writer.write(0xBF);
			writer.write('\ufeff');
			writer.write(rowStr);
			writer.newLine();
			
			if (rowNum > m.getLimit()) {

				m.setLimit(rowNum);
				List<LogResultEntity> list = reportProvider.getResultV2List(m);

				response.setContentType("application/csv;charset=utf-8"); 
				response.setHeader("Content-Disposition",
						"attachment; filename=\"" + fileName + "\"");
				
				String mtype=m.getMtype();
				writeHeader(mtype,writer);
				
				for (LogResultEntity entity : list) {
					rowStr="";

					rowStr+=entity.getBeginDateTime()+",";
					rowStr+=entity.getEndDateTime()+",";
					
					rowStr+=entity.getPhone()+",";
					if (mtype.equals("A")) {
						
						rowStr+=entity.getKey1()+",";
						rowStr+=entity.getKey2()+",";
						rowStr+=entity.getKey3()+",";					
						rowStr+=entity.getKey4()+"";
						
						
					}else if (mtype.equals("B")) {
						
						rowStr+=entity.getKey1()+",";
						rowStr+=entity.getKey2()+",";
						rowStr+=entity.getKey3()+"";					

					}else if (mtype.equals("C")) {
						rowStr+=entity.getKey1()+",";
						rowStr+=entity.getKey2()+",";
						rowStr+=entity.getKey3()+",";					
						rowStr+=entity.getKey4()+",";
						
						rowStr+=entity.getKey5()+",";
						
						rowStr+=entity.getKey6()+",";
						rowStr+=entity.getKey7()+",";
						rowStr+=entity.getKey8()+",";
						rowStr+=entity.getKey9()+"";
						
					}else if (mtype.equals("D")) {
						
						rowStr+=entity.getKey1()+",";
						rowStr+=entity.getKey2()+",";
						rowStr+=entity.getKey3()+",";					
						rowStr+=entity.getKey4()+",";						
						rowStr+=entity.getKey5()+",";						
						rowStr+=entity.getKey6()+"";
						
					}
					
					/**
					rowStr+=entity.getKey1()+",";
					rowStr+=entity.getKey2()+",";
					rowStr+=entity.getKey3()+",";					
					rowStr+=entity.getKey4()+",";
					
					rowStr+=entity.getKey5()+",";
					
					rowStr+=entity.getKey6()+",";
					rowStr+=entity.getKey7()+",";
					rowStr+=entity.getKey8()+",";
					rowStr+=entity.getKey9()+",";
					rowStr+=entity.getKey10();
					**/
					writer.write(rowStr);

					writer.newLine();
					writer.flush();
				}

				writer.close();

			}
		} catch (Exception e) {

			logger.error("导出文件出错", e);
		} 

	}
	
	private void writeHeader(String mtype,BufferedWriter writer){
		
		try {
			if (mtype.equals("A")) {

				writer.write("起始时间,结束时间,手机号,测试结果,点位序号,LAC-CI,RxLvl均值");

			} else if (mtype.equals("B")) {

				writer.write("起始时间,结束时间,手机号,业务拨测种类代码,测试结果,测试值");
				
			} else if (mtype.equals("C")) {
				writer.write("起始时间,结束时间,手机号,测试结果,点位序号（室内）,LAC-CI（室内）,RxLvl均值（室内）,点位序号（室外）,LAC-CI（室外）,RxLvl均值（室外）,CQT质量等级,呼叫结果");
			} else if (mtype.equals("D")) {
				writer.write("起始时间,结束时间,手机号,测试结果,点位序号,LAC-CI,RxLvl均值,CQT质量等级,呼叫结果");
			} else {

			}
			writer.newLine();
			
		} catch (Exception ex) {

		}
		
		
	}
	
}
