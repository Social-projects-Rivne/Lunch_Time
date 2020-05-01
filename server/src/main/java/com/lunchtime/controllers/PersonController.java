package com.lunchtime.controllers;

import com.lunchtime.security.JwtUtil;
import com.lunchtime.service.PersonService;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.dto.RegisterPerson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/persons")
public class PersonController {

    private final PersonService personService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createPerson(
        @Valid @RequestBody RegisterPerson registerPerson) throws Exception {

        if (registerPerson.getId() != null) {
            return null;
        }

        PersonDto personDto = null;
        try {
            personDto = personService.saveRegisterPerson(registerPerson);
        } catch (NonUniqueResultException nue) {
            return ResponseEntity.status(409)
                .body(nue.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (personDto != null) {
            return ResponseEntity.ok(personDto);

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

    @PostMapping("/currentUser")
    public ResponseEntity<PersonDto> getPersonByEmail(@RequestBody String token) {
        String email = jwtUtil.extractEmail(token);
        PersonDto personDto = personService.getPersonDtoByEmail(email);
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
