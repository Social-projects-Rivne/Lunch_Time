package com.lunchtime.service.impl;

import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    public PersonDto saveRegisterPerson(RegisterPerson registerPerson) {
        if (registerPerson.getEmail().equals(registerPerson.getPassword())
            || registerPerson.getPhoneNumber().equals(registerPerson.getPassword())) {
            return null;
        }

        boolean phoneExists = false;
        boolean emailExists = false;

        if (findByPhoneNumber(registerPerson.getPhoneNumber()) != null) {
            phoneExists = true;
        }
        if (findByEmail(registerPerson.getEmail()) != null) {
            emailExists = true;
        }

        if (phoneExists && emailExists) {
            throw new NonUniqueResultException("Phone number and email are not unique");
        } else if (phoneExists) {
            throw new NonUniqueResultException("Phone number isn't unique");
        } else if (emailExists) {
            throw new NonUniqueResultException("email isn't unique");
        }

        Person person = personMapper.fromRegisterToPerson(registerPerson);
        personRepository.save(person);
        return personMapper.fromPersonToDto(person);
    }

    public PersonDto updatePerson(PersonDto personDto) {
        Person person = personMapper.fromDtoToPerson(personDto);
        personRepository.save(person);
        return personDto;
    }

    public PersonPassDto updatePassword(PersonPassDto personPassDto) throws Exception {
        Optional<Person> result = personRepository.findById(personPassDto.getId());
        if (result.isPresent()) {
            Person person = result.get();
            if (person.getPhoneNumber().equals(personPassDto.getPassword())
                || person.getEmail().equals(personPassDto.getPassword())) {
                throw new Exception();
            }
            if (BCrypt.checkpw(personPassDto.getOldPassword(), person.getPassword())) {
                person.setPassword(bcryptPasswordEncoder.encode(personPassDto.getPassword()));
                person.setName(personPassDto.getName());
                person.setPhoneNumber(personPassDto.getPhoneNumber());
                personRepository.save(person);
                return personPassDto;
            }
            throw new Exception();
        }
        return null;
    }

    public PersonDto getPersonDtoById(Long id) {
        Optional<Person> result = personRepository.findById(id);
        return result.map(personMapper::fromPersonToDto).orElse(null);
    }

    public PersonDto getPersonDtoByEmail(String email) {
        Optional<Person> result = Optional.ofNullable(personRepository.findFirstByEmail(email));
        return result.map(personMapper::fromPersonToDto).orElse(null);
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    @Override
    public void updatePersonRoleId(Restaurant restaurant) {
        Optional<Person> res = personRepository.findById(restaurant.getPersonId());
        if (res.isPresent()) {
            Person person = res.get();
            if (person.getRoleId() != 2L) {
                person.setRoleId(2L);
                personRepository.save(person);
            }
        }
    }

    @Override
    public Person findByEmail(String email) {
        return personRepository.findFirstByEmail(email);
    }

    @Override
    public Person findByPhoneNumber(String phoneNumber) {
        return personRepository.findPersonByPhoneNumber(phoneNumber);
    }
}
