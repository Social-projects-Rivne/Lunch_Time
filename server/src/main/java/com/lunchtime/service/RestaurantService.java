package com.lunchtime.service;

import com.lunchtime.models.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RestaurantService {

    Restaurant save(Restaurant restaurant);

    Page<Restaurant> findAll(Pageable pageable);

    Optional<Restaurant> findById(Long id);

    Restaurant update(Restaurant restaurant);

    Restaurant delete(Long id);
}
