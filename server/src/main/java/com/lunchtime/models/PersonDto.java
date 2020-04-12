package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class PersonDto {
    private long id;

    @NotBlank
    private String name;

    @NotBlank
    private String phoneNumber;

    private String avatarUrl;
}
