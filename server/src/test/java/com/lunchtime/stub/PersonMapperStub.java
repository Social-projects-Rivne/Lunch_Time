package com.lunchtime.stub;

import com.lunchtime.models.Person;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.RegisterPerson;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PersonMapperStub {
    public Person fromRegisterToPerson(RegisterPerson registerPerson) {
        Person person = new Person();
        person.setName(registerPerson.getName());
        person.setPhoneNumber(registerPerson.getPhoneNumber());
        person.setEmail(registerPerson.getEmail());
        person.setPassword(registerPerson.getPassword());
        return person;
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
