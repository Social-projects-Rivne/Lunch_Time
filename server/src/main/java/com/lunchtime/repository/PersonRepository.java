package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lunchtime.models.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findFirstByEmailAndPassword(String email, String password);

    Person findFirstByEmail(String email);
}
