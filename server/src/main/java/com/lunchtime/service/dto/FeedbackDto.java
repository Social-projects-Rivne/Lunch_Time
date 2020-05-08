package com.lunchtime.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Getter
@Setter
public class FeedbackDto {
    private long id;

    @NotNull
    @Size(min = 10, max = 1000)
    private String description;

    @NotNull
    private Long restId;

    private boolean isActive = true;

    private Instant date;

    @NotNull
    private Integer personId;

    private int counterLike;

    private int counterDislike;
}
