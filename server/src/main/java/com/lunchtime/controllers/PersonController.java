package com.lunchtime.controllers;

import com.lunchtime.security.JwtAuthenticationTokenFilter;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.PersonService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/persons")
public class PersonController {
    private final PersonService personService;
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    public JwtAuthenticationTokenFilter getJwtAuthenticationTokenFilter() {
        return jwtAuthenticationTokenFilter;
    }

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    public ResponseEntity<PersonDto> createPerson(
        @Valid @RequestBody RegisterPerson registerPerson) throws URISyntaxException {
        if (registerPerson.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        } else if (personService.findByEmail(registerPerson.getEmail()) != null) {
            return ResponseEntity.badRequest()
                .build();
        } else if (personService.findByPhoneNumber(registerPerson.getPhoneNumber()) != null) {
            return ResponseEntity.badRequest()
                .build();
        }
        personService.findByPhoneNumber(registerPerson.getPhoneNumber());

        PersonDto personDto = personService.saveRegisterPerson(registerPerson);

        if (personDto != null) {
            return ResponseEntity.created(new URI("/api/restaurants"))
                .body(personDto);
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<PersonDto> update(@Valid @RequestBody PersonDto personDto) {
        PersonDto result = personService.updatePerson(personDto);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody PersonPassDto personPassDto) {
        PersonPassDto result;
        try {
            result = personService.updatePassword(personPassDto);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
        if (result != null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/currentUser", produces = MediaType.TEXT_PLAIN_VALUE)

    public ResponseEntity<PersonDto> getPersonByEmail(@PathVariable ) {
        PersonDto personDto = personService.findByEmail();
        if (personDto != null) {
            return ResponseEntity.ok()
                .body(personDto);
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping("{id}")
    public ResponseEntity<PersonDto> getPersonById(@PathVariable Long id) {
        PersonDto personDto = personService.getPersonDtoById(id);
        if (personDto != null) {
            return ResponseEntity.ok()
                .body(personDto);
        }
        return ResponseEntity.notFound()
            .build();
    }
}
