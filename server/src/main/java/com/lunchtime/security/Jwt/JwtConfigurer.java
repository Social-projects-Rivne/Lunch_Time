package com.lunchtime.security.Jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
	private JwtTockenProvider jwtTockenProvider;

	public JwtConfigurer(JwtTockenProvider jwtTockenProvider) {
		
		this.jwtTockenProvider = jwtTockenProvider;
	};
	@Override
	public void configure(HttpSecurity httpSecurity) throws Exception {
		JwtTokenFilter jwtTokenFilter = new JwtTokenFilter(jwtTockenProvider);
		httpSecurity.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
		
	}
	

}
