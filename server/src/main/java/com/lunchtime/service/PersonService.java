package com.lunchtime.service;

import com.lunchtime.models.Person;

import java.util.Optional;

public interface PersonService {
    Person savePerson(Person person);

    Optional<Person> getPersonById(Long id);
}
