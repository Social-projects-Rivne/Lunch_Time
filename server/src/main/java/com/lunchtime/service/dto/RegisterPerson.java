package com.lunchtime.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class RegisterPerson {
    private Long id;

    @NotBlank
    @Pattern(regexp = "^([a-zA-Z]+){3,16}$")
    private String name;

    @NotBlank
    @Pattern(regexp = "^\\+[0-9]{7,16}$")
    private String phoneNumber;

    @NotBlank
    @Email
    @Pattern(regexp = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
    private String email;

    @NotBlank
    @Pattern(regexp = "^(.)\\1+$")
    private String password;
}

