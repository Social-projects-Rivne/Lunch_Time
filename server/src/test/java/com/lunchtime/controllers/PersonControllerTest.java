package com.lunchtime.controllers;

import com.lunchtime.security.JwtUtil;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
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
    private PersonDto personDto;
    private final JwtUtil jwtUtil = new JwtUtil();

    @Before
    public void setUp() {
        initMocks(this);
        personControllerUnderTest = new PersonController(
            mockPersonService, jwtUtil);
        personDto = PersonDto.builder()
            .id(1)
            .name("NewName")
            .phoneNumber("+380991112233")
            .email("name@gmail.com")
            .build();
    }

    @Test
    public void testUpdate() throws Exception {
        final ResponseEntity<PersonDto> result = personControllerUnderTest.update(personDto);
        verify(mockPersonService).updatePerson(personDto);
        verifyNoMoreInteractions(mockPersonService);
        Assertions.assertNotNull(result);
    }

    @Test
    public void testGetPersonDto() throws Exception {
        when(mockPersonService.getPersonDtoById(0L)).thenReturn(personDto);
        personControllerUnderTest.getPersonById(0L);
        verify(mockPersonService, times(1)).getPersonDtoById(0L);
        verifyNoMoreInteractions(mockPersonService);
    }
}
