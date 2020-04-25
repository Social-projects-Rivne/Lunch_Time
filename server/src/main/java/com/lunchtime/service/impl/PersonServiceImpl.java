package com.lunchtime.service.impl;

import com.lunchtime.config.ResourcesPath;
import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NonUniqueResultException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    public PersonDto saveRegisterPerson(RegisterPerson registerPerson) {
        boolean phoneExists = false;
        boolean emailExists = false;
        String code = null;

        if (findByPhoneNumber(registerPerson.getPhoneNumber()) != null) {
            phoneExists = true;
        }
        if (findByEmail(registerPerson.getEmail()) != null) {
            emailExists = true;
        }

        if (phoneExists && emailExists) {
            code = "601";
        } else if (phoneExists) {
            code = "602";
        } else if (emailExists) {
            code = "603";
        }
        if (code != null) {
            throw new NonUniqueResultException(code);
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
    public Person findByEmail(String email) {
        return personRepository.findFirstByEmail(email);
    }

    @Override
    public Person findByPhoneNumber(String phoneNumber) {
        return personRepository.findPersonByPhoneNumber(phoneNumber);
    }

    public boolean saveAvatar(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            String filePath = ResourcesPath.getResourcePath() + "images/profile/";
            Path path = Paths.get(filePath + file.getOriginalFilename());
            Files.write(path, bytes);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
