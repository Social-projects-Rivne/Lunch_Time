package com.lunchtime;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/api/**")
            .allowedMethods("POST", "PUT", "GET", "DELETE")
            //TODO it would be better to have this list of urls in some property file. In such case,
            // you will be able to modify
            // this list without creating new PR, for example for prod env, you will need only ssh
            .allowedOrigins("http://localhost:3000");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/api/**")
            .addResourceLocations("classpath:/static/");
    }
}
