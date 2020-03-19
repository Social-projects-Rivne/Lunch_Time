package com.lunchtime.security;

import com.lunchtime.models.Person;
import com.lunchtime.models.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtValidator {


    private String secret = "lunch";

    public Person validate(String token) {

        Person person = null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            person = new Person();

            person.setUserName(body.getSubject());
//            person.setId(Long.parseLong((String) body.get("userId")));
            person.setRole((Role) body.get("role"));
        }
        catch (Exception e) {
            System.out.println(e);
        }

        return person;
    }
}
