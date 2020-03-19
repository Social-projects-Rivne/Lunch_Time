package com.lunchtime.security;


import com.lunchtime.models.JwtAuthenticationToken;
import com.lunchtime.models.JwtPesonDetails;
import com.lunchtime.models.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    @Autowired
    private JwtValidator validator;

    @Override
    protected void additionalAuthenticationChecks(
        UserDetails userDetails,
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

    }

    @Override
    protected UserDetails retrieveUser(
        String username,
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) usernamePasswordAuthenticationToken;
        String token = jwtAuthenticationToken.getToken();

        Person person = validator.validate(token);

        if (person == null) {
            throw new RuntimeException("JWT Token is incorrect");
        }

        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
            .commaSeparatedStringToAuthorityList(person.getRole());
        return new JwtPesonDetails(person.getUserName(), person.getId(),
            token,
            grantedAuthorities);
    }

    @Override
    public boolean supports(Class<?> newClass) {
        return (JwtAuthenticationToken.class.isAssignableFrom(newClass));
    }
}
