package com.lunchtime.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lunchtime.dto.AutentificationRequestDto;
import com.lunchtime.models.User;
import com.lunchtime.security.Jwt.JwtTockenProvider;
import com.lunchtime.service.UserService;

import javassist.NotFoundException;

@RestController
@RequestMapping(value = "api/auth/")
public class AuthintificationRestControllerV1 {

private AuthenticationManager authenticationManager;

private JwtTockenProvider jwtTockenProvider;

private UserService userService;


public AuthintificationRestControllerV1(AuthenticationManager authenticationManager,
		JwtTockenProvider jwtTockenProvider, UserService userService) {

	this.authenticationManager = authenticationManager;
	this.jwtTockenProvider = jwtTockenProvider;
	this.userService = userService;
}
@PostMapping("login")
public ResponseEntity login(@RequestBody AutentificationRequestDto requestDto) throws NotFoundException {
	try {
		String username = requestDto.getUsername();
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
		User user = userService.fingByUsername(username);
		if (user==null) {
			throw new NotFoundException("User with username:" + username + " not found");
		}
		String token = jwtTockenProvider.createTocken(username, user.getRoles());

		Map<Object , Object> response = new HashMap<>();
		response.put("username", username);
		response.put("token", token);

		return ResponseEntity.ok(response);

	}catch (AuthenticationException e) {
		throw new BadCredentialsException("Invalid username or password");
	}
}




}
