package com.lunchtime.repository;

import com.lunchtime.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findFirstByEmail(String email);

    @Query("select p from Person p "
        + "where p.email = :email "
        + "and p.isDeleted = false")
    Optional<Person> findPersonByEmail(String email);

    Person findPersonByPhoneNumber(String email);

    @Query("select p.roleId from Person p "
        + "where p.id in :userId "
        + "and p.isDeleted = false")
    long findRoleIdByUserId(long userId);
}
