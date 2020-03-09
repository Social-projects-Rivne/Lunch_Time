package com.lunchtime.service;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public Restaurant update(Restaurant newRestaurant) {
        return findById(newRestaurant.getId())
            .map(restaurant -> {
                return save(newRestaurant);
            })
            .orElseGet(() -> {
                return null;
            });
    }

    public Restaurant delete(Long id) {
        return findById(id)
            .map(restaurant -> {
                restaurant.setIsDeleted(true);
                return save(restaurant);
            })
            .orElseGet(() -> {
                return null;
            });
    }
}
