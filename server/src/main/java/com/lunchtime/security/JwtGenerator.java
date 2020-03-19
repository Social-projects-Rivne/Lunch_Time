package com.lunchtime.security;

import com.lunchtime.models.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

@Component
public class JwtGenerator {


    public String generate(Person person) {


        Claims claims = Jwts.claims().setSubject(person.getEmail());
        claims.put("userId", String.valueOf(person.getId()));
        claims.put("role", person.getRole());


        return Jwts.builder()
            .setClaims(claims)
            .signWith(SignatureAlgorithm.HS512, "lunch")
            .compact();
    }
}
