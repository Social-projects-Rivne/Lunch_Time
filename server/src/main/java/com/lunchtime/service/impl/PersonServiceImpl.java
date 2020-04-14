package com.lunchtime.service.impl;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person save(Person person) {
        return personRepository.save(person);
    }

    public PersonDto update(PersonDto personDto, Person person) {
        person.setName(personDto.getName());
        person.setPhoneNumber(personDto.getPhoneNumber());
        personRepository.save(person);
        return personDto;
    }

    public void updatePassword(PersonPassDto personPassDto, Person person) throws Exception {
        if (personPassDto.getOldPassword().equals(person.getPassword())) {
            person.setPassword(personPassDto.getPassword());
            personRepository.save(person);
            return;
        }
        throw new Exception();
    }

    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }
}
