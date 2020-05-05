package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lunchtime.models.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findPersonById(Long id);

    Person findFirstByEmail(String email);

    Person findPersonByPhoneNumber(String email);
}
