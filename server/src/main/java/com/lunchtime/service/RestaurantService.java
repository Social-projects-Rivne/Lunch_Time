package com.lunchtime.service;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

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
                restaurant.setName(newRestaurant.getName());
                restaurant.setEmail(newRestaurant.getEmail());
                restaurant.setTextAddress(newRestaurant.getTextAddress());
                restaurant.setWebsite(newRestaurant.getWebsite());
                restaurant.setDescription(newRestaurant.getDescription());
                restaurant.setWorkingTime(newRestaurant.getWorkingTime());
                restaurant.setMenuId(newRestaurant.getMenuId());
                restaurant.setOwnerId(newRestaurant.getOwnerId());
                restaurant.setTables(newRestaurant.getTables());
                restaurant.setLongitude(newRestaurant.getLongitude());
                restaurant.setLatitude(newRestaurant.getLatitude());
                return save(restaurant);
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
