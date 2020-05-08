package com.lunchtime.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
public class PersonPassDto {
    @NotBlank
    @Size(min = 8)
    private String oldPassword;

    @NotBlank
    @Size(min = 8)
    @Pattern(regexp = "^(?!(.)\\1+$)(?!\\s)(?!.*\\s$).{8,40}$")
    private String newPassword;
}
