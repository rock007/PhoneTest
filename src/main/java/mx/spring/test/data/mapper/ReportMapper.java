package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.LogResultEntity;
import mx.spring.test.data.entity.ResultEntity;



public interface ReportMapper {

	public List<ResultEntity> getResultList(ResultEntity m);
	public int  getResultListNum(ResultEntity m);
	
	public void addResult(ResultEntity m);
	
	public void addResult2(LogResultEntity m);
	
	public List<LogResultEntity> getResultV2List(LogResultEntity m);
	public int  getResultV2ListNum(LogResultEntity m);
}
