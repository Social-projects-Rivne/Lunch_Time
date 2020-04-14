package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    Person savePerson(Person person);

    PersonDto updatePerson(PersonDto personDto);

    PersonPassDto updatePassword(PersonPassDto personPassDto) throws Exception;

    PersonDto getPersonDtoById(Long id);

    Optional<Person> getPersonById(Long id);
}
