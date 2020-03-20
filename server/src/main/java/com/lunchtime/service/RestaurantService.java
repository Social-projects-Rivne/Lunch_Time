package com.lunchtime.service;

import com.lunchtime.models.Restaurant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service

public interface RestaurantService {

    Restaurant save(Restaurant restaurant);

    Page<Restaurant> findAll(Pageable pageable);

    Optional<Restaurant> findById(Long id);

    Restaurant update(Restaurant restaurant);

    Restaurant delete(Long id);

}
