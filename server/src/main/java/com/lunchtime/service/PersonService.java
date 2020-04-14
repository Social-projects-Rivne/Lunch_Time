package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    Person save(Person person);

    Optional<Person> findById(Long id);

    PersonDto update(PersonDto personDto);

    void updatePassword(PersonPassDto personPassDto, Person person) throws Exception;
}
