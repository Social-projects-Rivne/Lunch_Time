package com.lunchtime.controllers;


import com.lunchtime.models.Person;
import com.lunchtime.security.JwtGenerator;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authorisation")

public class AuthController {

    private JwtGenerator jwtGenerator;

    public AuthController(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping//(produces = MediaType.APPLICATION_JSON_VALUE)
    public String generate(@RequestBody final Person person) {

        return jwtGenerator.generate(person);


    }
}
