package com.lunchtime.controllers;


import com.lunchtime.repository.PersonRepository;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/users")
public class PersonController {
    private PersonRepository userRepository;


    public PersonController(PersonRepository userRepository) {
        this.userRepository = userRepository;

    }

    @GetMapping("/all")
    public ResponseEntity all() {
        return ok(this.userRepository.findAll());
    }


}
