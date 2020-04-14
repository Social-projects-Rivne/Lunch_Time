package com.lunchtime.service.impl;

import com.lunchtime.models.Person;
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

    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }
}
