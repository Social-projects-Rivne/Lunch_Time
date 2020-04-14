package com.lunchtime.service;

import com.lunchtime.models.Person;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    Person savePerson(Person person);

    Optional<Person> getPersonById(Long id);
}
