package mx.spring.test.data.privider;

import java.util.List;

import mx.spring.test.data.entity.UserEntity;
import mx.spring.test.data.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserProvider {
	@Autowired
	private UserMapper mapper;
	

	public List<UserEntity> getUsers(String userName){
		
		return mapper.getUsers(userName);
	}
	
	public void addUser(UserEntity m){
		
		mapper.addUser(m);
	}
	
	public void updateUser(UserEntity m){
		mapper.updateUser(m);
	}
	
	public void removeUser(String userName){
		
		mapper.removeUser(userName);
	}
}
