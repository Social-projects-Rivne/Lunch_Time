package com.lunchtime;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, SecurityAutoConfiguration.class})

public class LunchTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(LunchTimeApplication.class, args);
        System.out.println("HEjgfllo");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/api/**")
                    .allowedMethods("POST", "PUT", "GET", "DELETE")
                    .allowedOrigins("http://localhost:3000");
            }
        };
    }

    @Bean
    public BCryptPasswordEncoder cryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
