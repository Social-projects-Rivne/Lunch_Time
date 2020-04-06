package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "name", length = 30)
    private String name;

    @NotBlank
    @Column(name = "ingredients", length = 255)
    private String ingredients;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    public Dish() {
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "categoryfood_id", referencedColumnName = "id")
    private CategoryFood categoryfood;

}
