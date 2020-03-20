package com.lunchtime.controllers;

import com.lunchtime.models.Person;
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
    public ResponseEntity<Person> create(@Valid @RequestBody Person person) throws URISyntaxException {
        if (person.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        Person result = personService.save(person);
        return ResponseEntity.created(new URI("/api/persons"))
            .body(result);
    }

    @GetMapping("{id}")
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
