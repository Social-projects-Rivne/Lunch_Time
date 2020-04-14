package com.lunchtime.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class PersonDto {
    private long id;

    @NotBlank
    private String name;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    private String photoUrl;
}
