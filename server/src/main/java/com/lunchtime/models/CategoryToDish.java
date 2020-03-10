package com.lunchtime.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CategoryToDish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dish_id")
    private Long dishId;

    @Column(name = "category_by_food_id")
    private Long categoryByFoodId;

    public CategoryToDish(Long dishId, Long categoryByFoodId) {

        this.dishId = dishId;
        this.categoryByFoodId = categoryByFoodId;
    }

    public CategoryToDish() {

    }

}
