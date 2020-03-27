package com.lunchtime.controllers;


import com.lunchtime.models.JwtAuthenticationToken;
import com.lunchtime.models.JwtPersonDetails;
import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.security.JwtUtil;
import com.lunchtime.service.MyUserDetailsService;
import com.sun.imageio.plugins.jpeg.JPEGImageReaderSpi;
import javassist.NotFoundException;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    private PersonRepository personRepository;
    private Person jwtPerson = null;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(
        @RequestBody JwtPersonDetails jwtPersonDetails) throws Exception {

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtPersonDetails.getEmail(), jwtPersonDetails.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect email or password", e);
        }

        jwtPerson = personRepository.findFirstByEmailAndPassword(
            jwtPersonDetails.getEmail(), jwtPersonDetails.getPassword());
        if (jwtPerson != null) {
            final UserDetails userDetails = userDetailsService
                .loadUserByUsername(jwtPersonDetails.getEmail());
        } else {
            System.out.println("User not found");
        }

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        JwtAuthenticationToken token = new JwtAuthenticationToken(jwt);

        return ResponseEntity.ok(token.getJwt());
    }


}
