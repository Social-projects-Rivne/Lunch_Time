package com.lunchtime.service;

import com.lunchtime.models.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RestaurantService {
    Restaurant saveRestaurant(Restaurant restaurant);

    Page<Restaurant> getRestaurantPage(Pageable pageable);

    Optional<Restaurant> getRestaurantById(Long id);

    Restaurant updateRestaurant(Restaurant restaurant);

    Restaurant deleteRestaurantById(Long id);
}
