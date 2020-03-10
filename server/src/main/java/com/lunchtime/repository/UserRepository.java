package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lunchtime.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String name);
	

}
