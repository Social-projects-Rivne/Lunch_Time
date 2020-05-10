package com.lunchtime.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Setter
@Getter
public class RestaurantImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "image")
    private String image;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @NotNull
    @Column(name = "restaurant_id")
    private Long restaurantId;

    public RestaurantImage() {

    }
}
