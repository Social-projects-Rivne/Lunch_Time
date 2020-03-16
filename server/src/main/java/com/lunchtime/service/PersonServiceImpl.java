package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
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

    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }
}
