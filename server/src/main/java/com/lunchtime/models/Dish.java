package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(min = 1, max = 30)
    @Column(name = "name", length = 30)
    private String name;

    @NotBlank
    @Size(min = 1, max = 255)
    @Column(name = "ingredients")
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
