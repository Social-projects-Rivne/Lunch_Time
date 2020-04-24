package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private boolean isDeleted;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "categoryfood_id", referencedColumnName = "id")
    private CategoryFood categoryFood;

    public Dish() {
    }

}
