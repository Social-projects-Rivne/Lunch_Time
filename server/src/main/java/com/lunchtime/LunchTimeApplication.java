package com.lunchtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LunchTimeApplication {

    private Environment env;

    public LunchTimeApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) {
        SpringApplication.run(LunchTimeApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        String urls = env.getProperty("cors.urls");
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/api/**")
                    .allowedMethods("POST", "PUT", "GET", "DELETE")
                    .allowedOrigins(urls);
            }
        };
    }
}
