package com.lunchtime.implementation;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonServiceImplement implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImplement(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person save(Person person) {
        return personRepository.save(person);
    }

    public Optional<Person> findById(Long id) {
        return personRepository.findById(id);
    }


}
