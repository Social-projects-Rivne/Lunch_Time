package com.lunchtime.controllers;

import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import com.lunchtime.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }


    @PostMapping
    public ResponseEntity<Person> create(@Valid @RequestBody Person person) throws URISyntaxException {
        if (person.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        Person result = personService.save(person);
        return ResponseEntity.created(new URI("/api/persons"))
            .body(result);
    }

    @PutMapping
    public ResponseEntity<PersonDto> update(@Valid @RequestBody PersonDto personDto) {
        PersonDto result = personService.update(personDto);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody PersonPassDto personPassDto) {
        PersonPassDto result = null;
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

    @GetMapping("{id}")
    //TODO create some better name for method. see other comments
    public ResponseEntity<PersonDto> getOne(@PathVariable Long id) {
        PersonDto personDto = personService.getPersonDtoById(id);
        if (personDto != null) {
            return ResponseEntity.ok()
                .body(personDto);
        }
        return ResponseEntity.notFound()
            .build();
    }
}
