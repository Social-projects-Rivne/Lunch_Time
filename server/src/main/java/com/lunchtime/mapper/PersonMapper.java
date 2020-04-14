package com.lunchtime.mapper;

import com.lunchtime.models.Person;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PersonMapper {
    final PersonRepository personRepository;

    public Person fromDtoToPerson(PersonDto personDto) {
        Optional<Person> result = personRepository.findById(personDto.getId());
        if (result.isPresent()) {
            Person person = result.get();
            person.setName(personDto.getName());
            person.setPhoneNumber(personDto.getPhoneNumber());
            person.setEmail(personDto.getEmail());
            person.setPhotoUrl(personDto.getPhotoUrl());
            return person;
        }
        return null;
    }

    public PersonDto fromPersonToDto(Person person) {
        PersonDto personDto = new PersonDto();

        personDto.setId(person.getId());
        personDto.setName(person.getName());
        personDto.setPhoneNumber(person.getPhoneNumber());
        personDto.setEmail(person.getEmail());
        personDto.setPhotoUrl(person.getPhotoUrl());
        return personDto;
    }
}
