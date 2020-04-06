package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class CategoryFood {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "name")
    private String name;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    public CategoryFood() {
    }
}
