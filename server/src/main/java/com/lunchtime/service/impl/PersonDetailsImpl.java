package com.lunchtime.service.impl;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class PersonDetailsImpl implements UserService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final Person person = personRepository.findFirstByEmail(email);

        return new User(email, person.getPassword(), new ArrayList<>());
    }
}
