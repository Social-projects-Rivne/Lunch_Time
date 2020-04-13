package com.lunchtime.service.impl;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonDto;
import com.lunchtime.service.PersonMapper;
import com.lunchtime.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public PersonDto save(PersonDto personDto) {
        Person person = personMapper.fromDtoToPerson(personDto);
        personRepository.save(person);
        return personMapper.fromPersonToDto(person);
    }

    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }
}
