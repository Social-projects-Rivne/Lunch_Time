package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PersonMapper {
    final PersonRepository personRepository;
    final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Person fromDtoToPerson(PersonDto personDto) {
        Person person = new Person();
        person.setName(personDto.getName());
        person.setPhoneNumber(personDto.getPhoneNumber());
        person.setEmail(personDto.getEmail());
        person.setPassword(bCryptPasswordEncoder.encode(personDto.getPassword()));
        return person;
    }

    public PersonDto fromPersonToDto(Person person) {
        PersonDto personDto = new PersonDto();
        personDto.setId(person.getId());
        personDto.setName(person.getName());
        personDto.setPhoneNumber(person.getPhoneNumber());
        personDto.setEmail(person.getEmail());
        return personDto;
    }
}
