package com.lunchtime.security;

import com.lunchtime.models.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtGenerator {


    public String generate(Person person) {

        Claims claims = Jwts.claims().setSubject(person.getUserName());

        claims.put("password", person.getPassword());

        return Jwts.builder()
            .setClaims(claims)
            .signWith(SignatureAlgorithm.HS512, "lunch")
            .compact();
    }
}
