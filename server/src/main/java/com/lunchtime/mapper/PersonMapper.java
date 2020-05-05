package com.lunchtime.mapper;

import com.lunchtime.models.Person;
import com.lunchtime.repository.RoleRepository;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PersonMapper {
    final PersonRepository personRepository;
    final RoleRepository roleRepository;
    final BCryptPasswordEncoder bcryptPasswordEncoder;

    public Person fromDtoToPerson(PersonDto personDto) {
        Optional<Person> result = personRepository.findById(personDto.getId());
        if (result.isPresent()) {
            Person person = result.get();
            person.setName(personDto.getName());
            person.setPhoneNumber(personDto.getPhoneNumber());
            person.setEmail(personDto.getEmail());
            person.setPhotoUrl(personDto.getPhotoUrl());
            person.setRoleId(personDto.getRoleId());
            return person;
        }
        return null;
    }

    public PersonDto fromPersonToDto(Person person) {
        return PersonDto.builder()
            .id(person.getId())
            .name(person.getName())
            .phoneNumber(person.getPhoneNumber())
            .email(person.getEmail())
            .photoUrl(person.getPhotoUrl())
            .roleId(person.getRoleId())
            .build();
    }

    public Person fromRegisterToPerson(RegisterPerson registerPerson) {
        long id = roleRepository.findByName("USER").getId();
        return Person.builder()
            .name(registerPerson.getName())
            .phoneNumber(registerPerson.getPhoneNumber())
            .email(registerPerson.getEmail())
            .password(bcryptPasswordEncoder.encode(registerPerson.getPassword()))
            .roleId(id)
            .build();
    }
}
