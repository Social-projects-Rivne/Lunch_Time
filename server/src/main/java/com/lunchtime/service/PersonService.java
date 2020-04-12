package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;

import java.util.Optional;

public interface PersonService {
    Person save(Person person);

    Optional<Person> findById(Long id);

    Person update(PersonDto personDto, Person person);

    Person updatePassword(PersonPassDto personPassDto, Person person);
}
