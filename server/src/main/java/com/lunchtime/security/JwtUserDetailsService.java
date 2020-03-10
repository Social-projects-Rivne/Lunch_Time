package com.lunchtime.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lunchtime.models.User;
import com.lunchtime.security.Jwt.JwtUser;
import com.lunchtime.security.Jwt.JwtUserFactory;
import com.lunchtime.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {
	private final UserService userService;

	@Autowired
	public JwtUserDetailsService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		User user = userService.fingByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("User with username: "+ username +" not found");
		}
		JwtUser jwtUser = JwtUserFactory.create(user);
		log.info("IN loadUserByName - name eith username : {} succesfully laodede ", username);
		return jwtUser;
	}

}
