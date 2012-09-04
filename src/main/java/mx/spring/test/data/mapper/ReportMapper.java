package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.ResultEntity;



public interface ReportMapper {

	public List<ResultEntity> getResultList(ResultEntity m);
	public int  getResultListNum(ResultEntity m);
	
	public void addResult(ResultEntity m);
}
