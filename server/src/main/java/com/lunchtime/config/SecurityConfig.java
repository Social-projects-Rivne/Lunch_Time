package com.lunchtime.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


import com.lunchtime.security.Jwt.JwtConfigurer;
import com.lunchtime.security.Jwt.JwtTockenProvider;

public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final JwtTockenProvider jwtTockenProvider;
	private static final String ADMIN_ENDPOINT = "/api/admin/**";
    private static final String LOGIN_ENDPOINT = "/api/auth/login";
	@Autowired
	public SecurityConfig(JwtTockenProvider jwtTockenProvider) {
		this.jwtTockenProvider = jwtTockenProvider;

	}
	@Bean
	@Override
	public AuthenticationManager authenticationManager() throws Exception 
	{
		return super.authenticationManager();
	}
	
	protected void configure(HttpSecurity http) throws Exception {
		http
				.httpBasic().disable()
				.csrf()
				.disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeRequests()
				.antMatchers(LOGIN_ENDPOINT).permitAll()
                .antMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .apply(new JwtConfigurer(jwtTockenProvider));
	}
	
}
