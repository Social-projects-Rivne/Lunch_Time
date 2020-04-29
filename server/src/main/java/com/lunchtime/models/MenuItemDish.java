package com.lunchtime.models;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Currency;

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
    @Digits(integer = 6, fraction = 2)
    @DecimalMin(message = "Price is not valid",
        value = "1.0")
    @Column(name = "portion_price")
    private Double portionPrice;

    @ColumnDefault("UAH")
    @Column(name = "currency")
    private String currency;

    @Column(name = "portion_unit")
    private Long portionUnit;

    @Size(max = 255)
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
