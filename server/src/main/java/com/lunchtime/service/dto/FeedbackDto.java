package com.lunchtime.service.dto;

import com.lunchtime.models.Person;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;

@Getter
@Setter
public class FeedbackDto {
    private long id;

    @NotNull
    @Size(min = 10, max = 1000)
    private String description;

    @NotNull
    private long restId;

    private boolean isActive = true;

    private Instant date;

    @NotNull
    private int personId;

    private String personName;

    private Set<Person> likes;

    private int counterDislike;
}
