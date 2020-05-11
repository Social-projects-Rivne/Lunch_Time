package com.lunchtime.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;

@Getter
@Setter
public class FeedbackDto {
    private Long id;

    @NotNull
    @Size(min = 10, max = 1000)
    private String description;

    @NotNull
    private Long restId;

    private boolean isActive;

    private Instant date;

    @NotNull
    private Long personId;

    private String personName;

    private Set<Long> likes;

    private Set<Long> dislikes;
}
