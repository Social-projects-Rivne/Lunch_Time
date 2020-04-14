package com.lunchtime.service.impl;

import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public Person save(Person person) {
        return personRepository.save(person);
    }

    public PersonDto update(PersonDto personDto) {
        Person person = personMapper.fromDtoToPerson(personDto);
        personRepository.save(person);
        return personDto;
    }

    public PersonPassDto updatePassword(PersonPassDto personPassDto) throws Exception {
        Optional<Person> result = personRepository.findById(personPassDto.getId());
        if (result.isPresent()) {
            Person person = result.get();
            if (personPassDto.getOldPassword().equals(person.getPassword())) {
                person.setPassword(personPassDto.getPassword());
                personRepository.save(person);
                return personPassDto;
            }
            throw new Exception();
        }
        return null;
    }

    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }

    public PersonDto getPersonDtoById(Long id) {
        Optional<Person> result = personRepository.findById(id);
        return result.map(personMapper::fromPersonToDto).orElse(null);
    }
}
