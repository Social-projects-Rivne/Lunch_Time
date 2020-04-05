package com.lunchtime.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.sql.Date;

@Getter
@Setter
public class FeedbackDto {
    @Null
    private long id;

    @NotNull
    @Size(min = 10, max = 400) // Feedback also?
    private String description;

    @NotNull
    private long restId;

    private boolean isActive;

    private Date date;

    private long personId;

    private int counterLike;

    private int counterDislike;
}
