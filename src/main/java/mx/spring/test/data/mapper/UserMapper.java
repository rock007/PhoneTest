package mx.spring.test.data.mapper;

import java.util.List;

import mx.spring.test.data.entity.UserEntity;

public interface UserMapper {
	
	public List<UserEntity> getUsers(String userName);
	
	public void addUser(UserEntity m);
	
	public void updateUser(UserEntity m);
	
	public void removeUser(String userName);
}
