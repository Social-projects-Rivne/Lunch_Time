package com.lunchtime.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MenuItemDish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dish_id")
    private Long dishId;

    @NotBlank
    @Column(name = "portion_size", length = 30)
    private String portionSize;

    @NotBlank
    @Column(name = "portion_price", length = 20)
    private String portionPrice;

    @Column(name = "portio_unit")
    private Long portionUnit;

    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "image_URL")
    private String imageUrl;

    public MenuItemDish(Long dishId, @NotBlank String portionSize, @NotBlank String portionPrice,
           Long portionUnit, Long menuId, String imageUrl) {

        this.dishId = dishId;
        this.portionSize = portionSize;
        this.portionPrice = portionPrice;
        this.portionUnit = portionUnit;
        this.menuId = menuId;
        this.imageUrl = imageUrl; 
    }

    public MenuItemDish() {
    }
}
