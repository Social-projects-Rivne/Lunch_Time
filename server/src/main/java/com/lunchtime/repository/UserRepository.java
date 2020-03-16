package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lunchtime.models.Users;

public interface UserRepository extends JpaRepository<Users, Long>{
    Users findByUserName(String name);

}
