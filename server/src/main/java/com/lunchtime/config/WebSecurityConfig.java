package com.lunchtime.config;

import com.lunchtime.security.JwtAuthenticationTokenFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //TODO You can use such stuff for debug or local env, but it is not suitable for production
    // if you are not using token
    // authentication. I can suggest to move this setting to application.properties.
    // Link for help:
    // https://stackoverflow.com/questions/44824382/how-to-disable-csrf-in-spring-using-application-properties

    @Autowired
    private UserDetailsService myUserDetailsService;

    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);
    }

    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable().cors()
            .and().authorizeRequests()
            .antMatchers("/api/persons", "/api/feedback", "/api/restaurant-images/**").permitAll()
            .and().authorizeRequests()
            .antMatchers("/api/restaurants/**", "/api/events/**", "/api/dish/**",
                "/api/menuitemdish/**", "/api/category/**", "/api/images/**", "/api/image/**")
            .permitAll().and()
            .authorizeRequests().antMatchers("/api/authenticate").permitAll()
            .anyRequest().authenticated().and()
            .exceptionHandling().and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

    }
}






