package com.lunchtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(
    exclude = {SecurityAutoConfiguration.class, SecurityAutoConfiguration.class})
public class LunchTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(LunchTimeApplication.class, args);
    }

    /*Set the CORS configuration, more about CORS:
      https://www.tutorialspoint.com/spring_boot/spring_boot_cors_support.htm */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
