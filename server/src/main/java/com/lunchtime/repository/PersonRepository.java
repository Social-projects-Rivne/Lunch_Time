package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lunchtime.models.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByUserName(String name);

}
