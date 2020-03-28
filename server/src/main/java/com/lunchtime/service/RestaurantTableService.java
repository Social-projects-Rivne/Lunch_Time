package com.lunchtime.service;

import com.lunchtime.models.RestaurantTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RestaurantTableService {

    RestaurantTable save(RestaurantTable restaurant);

    Page<RestaurantTable> findAll(Pageable pageable);

    Optional<RestaurantTable> findById(Long id);

    Page<RestaurantTable> findAllByRestaurantId(Pageable pageable, Long id);
}
