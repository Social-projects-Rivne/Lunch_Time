package com.lunchtime.models;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
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

    public Dish(@NotBlank String name, @NotBlank String ingredients) {

        this.name = name;
        this.ingredients = ingredients;
    }

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

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "dishes")
    private Set<CategoryFood> categoryFood;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "dish")
    private Set<MenuItemDish> menuItemDish;


}
