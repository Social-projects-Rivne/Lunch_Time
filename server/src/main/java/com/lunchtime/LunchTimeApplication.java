package com.lunchtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// Disable Spring Security
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class, SecurityAutoConfiguration.class })
public class LunchTimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(LunchTimeApplication.class, args);
	}

}
