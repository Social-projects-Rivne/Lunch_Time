package com.lunchtime.controllers;

import com.lunchtime.models.Person;
import com.lunchtime.service.PersonDto;
import com.lunchtime.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/persons")
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    public ResponseEntity<PersonDto> createPerson(@Valid @RequestBody PersonDto personDto) throws URISyntaxException {
        if (personDto.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        } else if (personService.findByEmail(personDto.getEmail()) != null) {
            return ResponseEntity.badRequest()
                .build();
        } else if (personService.findByPhoneNumber(personDto.getPhoneNumber()) != null) {
            return ResponseEntity.badRequest()
                .build();
        }
        personService.findByPhoneNumber(personDto.getPhoneNumber());

        PersonDto savedPersonDto = personService.savePerson(personDto);

        if (savedPersonDto != null) {
            return ResponseEntity.created(new URI("/api/restaurants"))
                .body(savedPersonDto);
        }
        return null;
    }

    @GetMapping("{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id) {
        Optional<Person> person = personService.getPersonById(id);
        return person.map(value -> ResponseEntity.ok()
            .body(value)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }
}
