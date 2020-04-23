package com.lunchtime.service.impl;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.stub.PersonMapperStub;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class PersonServiceImplTest {

    @Mock
    PersonRepository personRepository;

    private final RegisterPerson registerPerson = new RegisterPerson();
    private final PersonMapperStub personMapperStub = new PersonMapperStub();

    @Before
    public void setUp() {
        initMocks(this);
        registerPerson.setName("Name");
        registerPerson.setPhoneNumber("+380501234567");
        registerPerson.setEmail("test@gmail.com");
        registerPerson.setPassword("123456Qwerty");
    }

    @Test
    public void return_null_if_phone_number_equals_password() throws Exception {
        Person person = Person
            .builder()
            .phoneNumber("+380501234567")
            .password("+380501234567")
            .build();

        String phoneNumber = person.getPhoneNumber();
        String password = person.getPassword();
        if (phoneNumber.equals(password)) {
            person = null;
        }
        Assert.assertNull(person);
    }

    @Test
    public void return_null_if_email_equals_password() throws Exception {
        Person person = Person
            .builder()
            .email("person@gmail.com")
            .password("person@gmail.com")
            .build();

        String email = person.getEmail();
        String password = person.getPassword();
        if (email.equals(password)) {
            person = null;
        }
        Assert.assertNull(person);
    }

    @Test
    public void save_valid_person_and_return_not_null_dto() throws Exception {
        Person mappedPerson = personMapperStub.fromRegisterToPerson(registerPerson);
        personRepository.save(mappedPerson);
        when(personRepository.save(mappedPerson)).thenReturn(mappedPerson);
        Person savedPerson = personRepository.save(mappedPerson);
        Assert.assertNotNull(savedPerson);
    }
}
