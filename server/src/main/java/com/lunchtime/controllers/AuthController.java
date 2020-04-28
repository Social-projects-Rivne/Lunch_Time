package com.lunchtime.controllers;

import com.lunchtime.models.JwtAuthenticationToken;
import com.lunchtime.models.JwtPersonDetails;
import com.lunchtime.security.JwtUtil;
import com.lunchtime.security.TokenHistory;
import com.lunchtime.service.impl.PersonDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private PersonDetailsImpl userDetailsService;

    @PostMapping("/api/authenticate")
    public ResponseEntity<?> createAuthenticationToken(
        @RequestBody JwtPersonDetails jwtPersonDetails) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtPersonDetails.getEmail(), jwtPersonDetails.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect email or password", e);
        }
        final UserDetails userDetails = userDetailsService
            .loadUserByUsername(jwtPersonDetails.getEmail());
        if (BCrypt.checkpw(jwtPersonDetails.getPassword(), userDetails.getPassword())) {
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            JwtAuthenticationToken token = new JwtAuthenticationToken(jwt);
            return ResponseEntity.ok(token.getJwt());
        }
        return null;
    }
}
