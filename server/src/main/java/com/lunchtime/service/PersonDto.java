package com.lunchtime.service;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class PersonDto {
    private Long id;

    @NotBlank
    @Size(min = 3, max = 16)
    private String name;

    @NotBlank
    @Email
    @Size(min = 5, max = 40)
    private String email;

    @NotBlank
    @Size(min = 8, max = 40)
    private String password;

    @NotBlank
    @Size(min = 13, max = 13)
    private String phoneNumber;
}

