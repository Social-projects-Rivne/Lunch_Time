package com.lunchtime.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
    @Size(min = 1, max = 30)
    @Column(name = "portion_size", length = 30)
    private String portionSize;

    @NotNull
    @DecimalMin(message = "Price is not valid",
                           value = "0")
    @Column(name = "portion_price", length = 20)
    private Long portionPrice;

    @Column(name = "portion_unit")
    private Long portionUnit;

    @Size(max = 255)
    @Column(name = "image_URL")
    private String imageUrl;

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    public MenuItemDish() {
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "dish_id", referencedColumnName = "id")
    private Dish dish;

}
