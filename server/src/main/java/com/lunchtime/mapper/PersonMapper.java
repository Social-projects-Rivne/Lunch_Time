package com.lunchtime.mapper;

import com.lunchtime.models.Person;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.repository.PersonRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PersonMapper {
    final PersonRepository personRepository;
    final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Person fromDtoToPerson(PersonDto personDto) {
        return Person.builder()
            .name(personDto.getName())
            .phoneNumber(personDto.getPhoneNumber())
            .email(personDto.getEmail())
            .photoUrl(personDto.getPhotoUrl())
            .build();
    }

    public PersonDto fromPersonToDto(Person person) {
        return PersonDto.builder()
            .id(person.getId())
            .name(person.getName())
            .phoneNumber(person.getPhoneNumber())
            .email(person.getEmail())
            .photoUrl(person.getPhotoUrl())
            .build();
    }

    public Person fromRegisterToPerson(RegisterPerson registerPerson) {
        return Person.builder()
            .name(registerPerson.getName())
            .phoneNumber(registerPerson.getPhoneNumber())
            .email(registerPerson.getEmail())
            .password(bCryptPasswordEncoder.encode(registerPerson.getPassword()))
            .build();
    }
}
