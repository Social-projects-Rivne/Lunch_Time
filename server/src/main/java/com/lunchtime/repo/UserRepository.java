package com.lunchtime.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lunchtime.models.User;

public interface UserRepository extends JpaRepository<User, Integer>{
Optional <User> findByUserName(String userName);
}
