package mx.spring.test.data.privider;

import java.util.List;

import mx.spring.test.data.entity.ResultEntity;
import mx.spring.test.data.mapper.ReportMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ReportProvider {
	
	@Autowired
	private ReportMapper mapper;
	
	public List<ResultEntity> getResultList(ResultEntity m){
		
		return mapper.getResultList(m);
	}
	public int  getResultListNum(ResultEntity m){
		
		return mapper.getResultListNum(m);
	}
	
	public void addResult(ResultEntity m){
		
		mapper.addResult(m);
	}
}