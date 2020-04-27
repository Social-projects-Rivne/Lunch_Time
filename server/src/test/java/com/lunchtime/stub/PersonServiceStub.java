package com.lunchtime.stub;

import com.lunchtime.models.Person;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;

import java.util.Optional;

public class PersonServiceStub implements PersonService {

    @Override
    public PersonDto saveRegisterPerson(RegisterPerson registerPerson) {
        if (registerPerson != null) {
            return PersonDto.builder()
                .name(registerPerson.getName())
                .phoneNumber(registerPerson.getPhoneNumber())
                .email(registerPerson.getEmail())
                .build();
        }
        return null;
    }

    @Override
    public Person findByEmail(String email) {
        if (email.equals("test@gmail.com")) {
            return new Person();
        }
        return null;
    }

    @Override
    public Person findByPhoneNumber(String phoneNumber) {
        if (phoneNumber.equals("+380501234567")) {
            return new Person();
        }
        return null;
    }

    @Override
    public PersonDto updatePerson(PersonDto personDto) {
        return null;
    }

    @Override
    public PersonPassDto updatePassword(PersonPassDto personPassDto) throws Exception {
        return null;
    }

    @Override
    public PersonDto getPersonDtoById(Long id) {
        return null;
    }

    @Override
    public PersonDto getPersonDtoByEmail(String email) {
        return null;
    }

    @Override
    public Optional<Person> getPersonById(Long id) {
        return Optional.empty();
    }
}
