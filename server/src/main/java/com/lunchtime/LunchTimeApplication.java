package com.lunchtime;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import com.lunchtime.service.RestaurantService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
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
                    .allowedOrigins("http://localhost:3000");
            }
        };
    }



}
