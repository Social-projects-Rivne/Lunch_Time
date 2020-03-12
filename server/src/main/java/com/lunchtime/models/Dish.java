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

    public Dish(@NotBlank String name, @NotBlank String ingredients) {

        this.name = name;
        this.ingredients = ingredients;
    }

    public Dish() {
    }
    
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "dish")
    private Set<CategoryFood> categoryFood;
     
    public Set<CategoryFood> getCategory() {
        return categoryFood;
    }
     
    public void setUsers(Set<CategoryFood> categoryFood) {
        this.categoryFood = categoryFood;
    }
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "dishes")
    private Set<MenuItemDish> menuItemDish;
    
    public Set<MenuItemDish> getMenuItemDish() {
        return menuItemDish;
    }
    
    public void setMenuItemDish(Set<MenuItemDish> menuItemDish) {
        this.menuItemDish = menuItemDish;
    }
}
