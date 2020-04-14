package com.lunchtime.service;

import com.lunchtime.models.Person;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    PersonDto savePerson(PersonDto person);

    Person findByEmail(String email);

    Person findByPhoneNumber(String phoneNumber);

    Optional<Person> getPersonById(Long id);
}
