package com.lunchtime.stub;

import com.lunchtime.models.Person;
import com.lunchtime.service.dto.RegisterPerson;

public class PersonMapperStub {
    public Person fromRegisterToPerson(RegisterPerson registerPerson) {
        return Person.builder()
            .name(registerPerson.getName())
            .phoneNumber(registerPerson.getPhoneNumber())
            .email(registerPerson.getEmail())
            .password(registerPerson.getPassword())
            .build();
    }
}
