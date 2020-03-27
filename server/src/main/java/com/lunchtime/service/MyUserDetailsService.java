package com.lunchtime.service;

import com.lunchtime.models.Person;
import com.lunchtime.repository.PersonRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {


//    private final PersonRepository personRepository;
//    public MyUserDetailsService(PersonRepository personRepository) {
//        this.personRepository = personRepository;
//    }
//    public Person getPersonRepository(String email, String password) {
//        return personRepository.findFirstByEmailAndPassword(email, password);
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User("kevin.straik@gmail.com", "kevinkevin", new ArrayList<>());
    }
}
