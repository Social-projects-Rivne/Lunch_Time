package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private boolean isDeleted;

    public CategoryFood() {
    }
}
