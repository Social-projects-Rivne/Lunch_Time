package com.lunchtime.security.Jwt;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.lunchtime.models.Role;
import org.springframework.security.authentication.jaas.AuthorityGranter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.lunchtime.models.Status;
import com.lunchtime.models.User;

import java.util.stream.Collectors;

public final class JwtUserFactory {

	public JwtUserFactory() {

	}
	public static JwtUser create(User user) {
		return new JwtUser(user.getId(),
				user.getUserName(),
				user.getPassword(),
				user.getEmail(),
				user.getPhotoURL(),
				user.getPhone(),
				user.getStatus().equals(Status.ACTIVE),
      (Date) user.getUpdated(),
				mapToGrantedAuthorities(new ArrayList<>(user.getRoles()))
				);
	}

	private static List<GrantedAuthority> mapToGrantedAuthorities(List<Role> userRoles){
		return userRoles.stream()
				.map(role ->
					new SimpleGrantedAuthority(role.getName())
			).collect(Collectors.toList());

	}
}
