package com.lunchtime.controllers;

import com.lunchtime.models.PersonDto;
import com.lunchtime.service.PersonService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class PersonControllerTest {
    @Mock
    private PersonService mockPersonService;

    private PersonController personControllerUnderTest;

    @Before
    public void setUp() {
        initMocks(this);
        personControllerUnderTest = new PersonController(mockPersonService);
    }

    @Test
    public void testUpdate() throws Exception {
        PersonDto personDto = new PersonDto();
        personDto.setId(1);
        personDto.setName("NewName");
        personDto.setPhoneNumber("+380991112233");
        personDto.setEmail("name@gmail.com");

        final ResponseEntity<PersonDto> result = personControllerUnderTest.update(personDto);

        verify(mockPersonService).update(personDto);
        verifyNoMoreInteractions(mockPersonService);

        Assertions.assertNotNull(result);
    }

//    @Test
//    public void testUpdatePassword() throws Exception {
//        PersonPassDto personPassDto = new PersonPassDto();
//        personPassDto.setId(1);
//        personPassDto.setOldPassword("oldPass");
//        personPassDto.setPassword("oldPass");
//
//        personControllerUnderTest.updatePassword(personPassDto);
//
//        verify(mockPersonService).updatePassword(personPassDto);
//        verifyNoMoreInteractions(mockPersonService);
//
//    }


    @Test
    public void testGetPersonDto() throws Exception {
        PersonDto personDto = new PersonDto();
        personDto.setId(1);
        personDto.setName("NewName");
        personDto.setPhoneNumber("+380991112233");
        personDto.setEmail("name@gmail.com");

        when(mockPersonService.getPersonDtoById(0L)).thenReturn(personDto);
        personControllerUnderTest.getOne(0L);

        verify(mockPersonService, times(1)).getPersonDtoById(0L);
        verifyNoMoreInteractions(mockPersonService);
    }

}
