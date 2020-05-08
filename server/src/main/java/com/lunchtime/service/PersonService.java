package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface PersonService {
    PersonDto saveRegisterPerson(RegisterPerson registerPerson) throws Exception;

    Person findByEmail(String email);

    Person findByPhoneNumber(String phoneNumber);

    PersonDto updatePerson(PersonDto personDto);

    Person updatePassword(PersonPassDto personPassDto);

    PersonDto getPersonDtoById(Long id);

    PersonDto getPersonDtoByEmail(String email);

    Optional<Person> getPersonById(Long id);
}
