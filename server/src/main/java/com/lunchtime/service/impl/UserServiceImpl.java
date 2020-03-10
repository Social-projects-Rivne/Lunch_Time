package com.lunchtime.service.impl;


import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.lunchtime.models.Role;
import com.lunchtime.models.Status;
import com.lunchtime.models.User;
import com.lunchtime.repository.RoleRepository;
import com.lunchtime.repository.UserRepository;
import com.lunchtime.service.UserService;


@Service
@Slf4j
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private RoleRepository roleRepository;
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
			BCryptPasswordEncoder passwordEncoder) {

		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User register(User user) {
		Role roleUser = roleRepository.findByName("ROLE_USER");
		List<Role> userRoles = new ArrayList<>();
		userRoles.add(roleUser);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRoles(userRoles);
		user.setStatus(Status.ACTIVE);

		User registeredUser = userRepository.save(user);
		log.info("IN register - user: {} successfully registered", registeredUser);
		return registeredUser;
	}

	@Override
	public List<User> getAll() {
		List<User> result =userRepository.findAll();
		log.info("IN getAll - {} users found", result.size());
		return result;
	}

	@Override
	public User findById(Long id) {
		User result = userRepository.findById(id).get();
		log.info("IN findById - user: {} found by id: {}",result,id);
		return result;
	}

	@Override
	public User fingByUsername(String username) {
		User result = userRepository.findByUsername(username);
		log.info("IN findByName - user: {} found by username: {}",result,username);
		return result;
	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
		log.info("IN delete - user with id: {} succesfully deleted ");

	}

}
