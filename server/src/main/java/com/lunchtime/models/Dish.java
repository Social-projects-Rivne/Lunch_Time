package com.lunchtime.models;

import java.util.List;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Boolean isDeleted;

    public Dish() {
    }

    public Boolean isDeleted() {
        if (isDeleted == null) {
            return false;
        }
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @ManyToMany
    @JoinTable(name = "category_to_dish",
        joinColumns = @JoinColumn(name = "dish_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    @JsonIgnore
    private Set<CategoryFood> categoryFoods;

}
