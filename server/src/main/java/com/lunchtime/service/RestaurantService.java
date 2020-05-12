package com.lunchtime.service;

import com.lunchtime.models.Restaurant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service

public interface RestaurantService {
    Restaurant saveRestaurant(Restaurant restaurant);

    Page<Restaurant> getRestaurantPage(Pageable pageable);

    Page<Restaurant> getRestaurantPageByUserId(Long userId, Pageable pageable);

    Optional<Restaurant> getRestaurantById(Long id);

    Restaurant updateRestaurant(Restaurant restaurant);

    Restaurant deleteRestaurantById(Long id);
}
