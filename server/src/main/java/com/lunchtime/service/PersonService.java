package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;

import java.util.Optional;

public interface PersonService {
    Person save(Person person);

    Optional<Person> findById(Long id);

    PersonDto update(PersonDto personDto, Person person);

    void updatePassword(PersonPassDto personPassDto, Person person);
}
