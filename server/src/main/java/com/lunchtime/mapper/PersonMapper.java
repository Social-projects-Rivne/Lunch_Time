package com.lunchtime.mapper;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonMapper {
    final PersonRepository personRepository;

    public Person fromDtoToPerson(PersonDto feedbackDto) {
        Person person = new Person();
        return person;
    }
}
