package com.lunchtime.service;

import java.util.List;

import com.lunchtime.models.User;

public interface UserService {
	User register(User user);

	List<User> getAll();

	User findById(Long id);

	User fingByUsername(String username);
	
	void delete(Long id);

}
