package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @NotNull
    @DecimalMin(message = "Price is not valid",
                           value = "0")
    @Column(name = "portion_price")
    private Long portionPrice;

    @Column(name = "portion_unit")
    private Long portionUnit;

    @Column(name = "image_URL")
    private String imageUrl;

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "dish_id", referencedColumnName = "id")
    private Dish dish;

    public MenuItemDish() {
    }
}
