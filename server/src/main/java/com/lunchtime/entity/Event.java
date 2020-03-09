package com.lunchtime.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.net.URI;
import java.sql.Date;

@ToString
@Setter
@Getter
@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long restaurantId;

    @NotNull
    private Date date;

    @NotNull
    private URI image;

    @NotBlank
    @Size(min=6, max=80)
    private String name;

    @NotBlank
    private String category;

    @NotBlank
    private String description;

    @NotNull
    private Boolean active;
}
