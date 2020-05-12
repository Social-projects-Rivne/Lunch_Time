package com.lunchtime.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.lunchtime.models.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findPersonById(Long id);

    Person findFirstByEmail(String email);

    Person findPersonByPhoneNumber(String email);

    @Query("select p.roleId from Person p "
        + "where p.id in :userId "
        + "and p.isDeleted = false")
    long findRoleIdByUserId(long userId);
}
