package com.lunchtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class LunchTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(LunchTimeApplication.class, args);

    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/api/**")
                    .allowedMethods("POST", "PUT", "GET", "DELETE")
                    //TODO it would be better to have this list of urls in some property file. In such case, you will be able to modify
                    // this list without creating new PR, for example for prod env, you will need only ssh
                    .allowedOrigins("http://localhost:3000");
            }
        };
    }

}
