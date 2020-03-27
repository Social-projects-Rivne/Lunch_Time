package com.lunchtime;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //TODO You can use such stuff for debug or local env, but it is not suitable for production if you are not using token
    // authentication. I can suggest to move this setting to application.properties. Link for help: https://stackoverflow.com/questions/44824382/how-to-disable-csrf-in-spring-using-application-properties

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable();
    }
}
