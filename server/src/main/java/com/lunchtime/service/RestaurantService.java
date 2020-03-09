package com.lunchtime.service;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Restaurant save(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Page<Restaurant> findAll(Pageable pageable) {
        return restaurantRepository.findAll(pageable);
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurantRepository.findById(id);
    }
}
