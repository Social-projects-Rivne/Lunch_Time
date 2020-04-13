package com.lunchtime.controllers;

import com.lunchtime.models.Person;
import com.lunchtime.service.PersonDto;
import com.lunchtime.service.PersonService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<PersonDto> create(@Valid @RequestBody PersonDto personDto) throws URISyntaxException {
        if (personDto.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        PersonDto result = personService.save(personDto);
        return ResponseEntity.created(new URI("/api/persons"))
            .body(result);
    }

    @GetMapping("{id}")
    //TODO create some better name for method. see other comments
    public ResponseEntity<Person> getOne(@PathVariable Long id) {
        Optional<Person> person = personService.findById(id);
        if (person.isPresent()) {
            return ResponseEntity.ok()
                .body(person.get());
        }
        return ResponseEntity.notFound()
            .build();
    }
}
