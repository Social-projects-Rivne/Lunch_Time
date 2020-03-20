package com.lunchtime.service;

import com.lunchtime.models.Person;

import java.util.Optional;

public interface PersonService {
    Person save(Person person);

    Optional<Person> findById(Long id);

}
