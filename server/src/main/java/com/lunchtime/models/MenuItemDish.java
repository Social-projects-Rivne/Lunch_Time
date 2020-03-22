package com.lunchtime.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class MenuItemDish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "portion_size", length = 30)
    private String portionSize;

    @NotBlank
    @Column(name = "portion_price", length = 20)
    private String portionPrice;

    @Column(name = "portion_unit")
    private Long portionUnit;

    @Column(name = "image_URL")
    private String imageUrl;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    MenuItemDish() {
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
    @JoinTable(name = "menu",
              joinColumns = @JoinColumn(name = "menu_item_dish_id", referencedColumnName = "id"),
              inverseJoinColumns = @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    )
    private Set<Restaurant> restaurant;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "dish_id", nullable = false)
    private Dish dish;


}
