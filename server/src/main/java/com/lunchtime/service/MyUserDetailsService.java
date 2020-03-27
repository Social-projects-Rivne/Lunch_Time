package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.method.P;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private final PersonRepository personRepository;
    public MyUserDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person getPersonRepository(String email, String password) {
        return personRepository.findFirstByEmailAndPassword(email, password);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User(, "kevin", new ArrayList<>());
    }
}
