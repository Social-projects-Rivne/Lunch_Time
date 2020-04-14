package com.lunchtime.controllers;

import com.lunchtime.mapper.PersonMapper;
import com.lunchtime.models.Person;
import com.lunchtime.models.PersonDto;
import com.lunchtime.models.PersonPassDto;
import com.lunchtime.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final PersonMapper personMapper;

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
        Optional<Person> result = personService.findById(personPassDto.getId());
        if (result.isPresent()) {
            try {
                personService.updatePassword(personPassDto, result.get());
            } catch (Exception e) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("{id}")
    //TODO create some better name for method. see other comments
    public ResponseEntity<PersonDto> getOne(@PathVariable Long id) {
        Optional<Person> person = personService.findById(id);
        if (person.isPresent()) {
            PersonDto personDto = personMapper.fromPersonToDto(person.get());
            return ResponseEntity.ok()
                .body(personDto);
        }
        return ResponseEntity.notFound()
            .build();
    }
}
