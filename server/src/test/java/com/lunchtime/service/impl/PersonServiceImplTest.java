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
    public void save_valid_person_and_return_not_null_dto() throws Exception {
        Person mappedPerson = personMapperStub.fromRegisterToPerson(registerPerson);
        personRepository.save(mappedPerson);
        when(personRepository.save(mappedPerson)).thenReturn(mappedPerson);
        Person savedPerson = personRepository.save(mappedPerson);
        Assert.assertNotNull(savedPerson);
    }
}
