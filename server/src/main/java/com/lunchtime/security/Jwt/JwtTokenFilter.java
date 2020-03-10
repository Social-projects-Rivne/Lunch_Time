package com.lunchtime.security.Jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtTokenFilter extends GenericFilterBean {
	private JwtTockenProvider jwtTockenProvider;
	public JwtTokenFilter(JwtTockenProvider jwtTockenProvider) {
		this.jwtTockenProvider = jwtTockenProvider;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String token = jwtTockenProvider.resolveToken((HttpServletRequest) request);
		if(token!=null && jwtTockenProvider.validateToken(token)) {
			Authentication authentication = jwtTockenProvider.getAuthentication(token);
			
			if(authentication!=null) {
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		chain.doFilter(request,response);
		
	}
	

}
