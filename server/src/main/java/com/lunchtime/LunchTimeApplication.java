package com.lunchtime;

import com.lunchtime.repo.UserRepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class LunchTimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(LunchTimeApplication.class, args);
	}

}
