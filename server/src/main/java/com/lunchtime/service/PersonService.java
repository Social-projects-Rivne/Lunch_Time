package com.lunchtime.service;

import com.lunchtime.models.Person;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    PersonDto savePerson(PersonDto person);

    Optional<Person> findById(Long id);
}
