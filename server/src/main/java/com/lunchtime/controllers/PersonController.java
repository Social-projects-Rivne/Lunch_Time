package com.lunchtime.controllers;


import com.lunchtime.repository.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/users")
public class PersonController {
    private PersonRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public PersonController(PersonRepository userRepository,
                            BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/all")
    public ResponseEntity all() {
        return ok(this.userRepository.findAll());
    }
//    @PostMapping("/sign-up")
//    public void signUp(@RequestBody Users user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//    }
}
