package com.lunchtime.controllers;

import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.security.JwtUtil;
import com.lunchtime.security.TokenHistory;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.service.impl.PersonServiceImpl;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class RegisterPersonControllerTest {
    AuthController authController = new AuthController();
    TokenHistory tokenHistory = new TokenHistory();
    JwtUtil jwtUtil = new JwtUtil();

    @Mock
    PersonRepository personRepository;
    @Mock
    PersonMapper personMapper;
    BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();

    PersonService personService = new PersonServiceImpl(
        personRepository, personMapper, bcryptPasswordEncoder);

    @Mock
    private final PersonController personController = new PersonController(
        personService, jwtUtil, authController, tokenHistory);

    private RegisterPerson registerPerson = new RegisterPerson();

    @Before
    public void setUp() {
        initMocks(this);
        registerPerson.setName("Name");
        registerPerson.setPhoneNumber("+380501234567");
        registerPerson.setEmail("test@gmail.com");
        registerPerson.setPassword("123456Qwerty");
    }

    @After
    public void tearDown() {
        registerPerson = null;
    }

    @Test
    public void createPerson_with_existing_id_expected_false() throws Exception {
        registerPerson.setId(1L);
        ResponseEntity<?> personDto = personController.createPerson(registerPerson);
        Assert.assertNull(personDto);
        verify(personController, times(1)).createPerson(registerPerson);
        verifyNoMoreInteractions(personController);
    }

//    @Test
//    public void createPerson_with_existing_phone_number_expected_false() throws Exception {
//        String phoneNumber = registerPerson.getPhoneNumber();
//        Person existingPerson = personService.findByPhoneNumber(phoneNumber);
//        ResponseEntity<?> personDto = personController.createPerson(registerPerson);
//        if (existingPerson != null) {
//            Assert.assertNull(personDto);
//        } else {
//            Assert.assertNotNull(personDto);
//        }
//
//        verify(personController, times(1)).createPerson(registerPerson);
//        verifyNoMoreInteractions(personController);
//    }
//
//    @Test
//    public void createPerson_with_existing_email_expected_false() throws Exception {
//        String email = registerPerson.getEmail();
//        Person existingPerson = personService.findByEmail(email);
//        ResponseEntity<?> personDto = personController.createPerson(registerPerson);
//        if (existingPerson != null) {
//            Assert.assertNull(personDto);
//        } else {
//            Assert.assertNotNull(personDto);
//        }
//
//        verify(personController, times(1)).createPerson(registerPerson);
//        verifyNoMoreInteractions(personController);
//    }
//
//    @Test
//    public void create_not_null_person_expected_true() throws Exception {
//        PersonDto personDto = personService.saveRegisterPerson(registerPerson);
//        Assert.assertNotNull(personDto);
//    }
}
