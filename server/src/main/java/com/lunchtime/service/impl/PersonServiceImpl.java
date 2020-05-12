package com.lunchtime.service.impl;

import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.repository.RoleRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.NonUniqueResultException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;
    private final RoleRepository roleRepository;
    private final PersonMapper personMapper;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;
    private final MailSender mailSender;

    String webPage = "http://localhost:3000";

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
        Long userRoleId = roleRepository.findByName("USER").getId();
        person.setActivationCode(UUID.randomUUID().toString());
        person.setRoleId(userRoleId);
        personRepository.save(person);

        if (!StringUtils.isEmpty(person.getEmail())) {
            String message = String.format(
                "Hello, %s! \n" +
                    "Welcome to LunchTime! To activate your account, confirm it" +
                    " moving to this link: " + webPage + "/confirm/%s",

                person.getName(),
                person.getActivationCode()
            );
            mailSender.send(person.getEmail(), "Activation code", message);
        }
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
    public boolean isActivated(String code) {
        Person person = personRepository.findByActivationCode(code);
        if (person != null) {
            person.setActivationCode(null);
            personRepository.save(person);
            return true;
        }
        return false;
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
