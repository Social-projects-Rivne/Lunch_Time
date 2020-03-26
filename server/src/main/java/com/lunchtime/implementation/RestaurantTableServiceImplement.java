package com.lunchtime.implementation;

import com.lunchtime.models.RestaurantTable;
import com.lunchtime.repository.RestaurantTableRepository;
import com.lunchtime.service.RestaurantService;
import com.lunchtime.service.RestaurantTableService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantTableServiceImplement implements RestaurantTableService {

    private final RestaurantTableRepository restaurantTableRepository;
    private final RestaurantService restaurantService;

    public RestaurantTableServiceImplement(
        RestaurantTableRepository restaurantTableRepository,
        RestaurantService restaurantService
    ) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.restaurantService = restaurantService;
    }

    public RestaurantTable save(RestaurantTable restaurantTable) {
        return restaurantService.findById(restaurantTable.getRestaurant().getId())
            .map(restaurant -> {
                restaurantTable.setRestaurant(restaurant);
                return restaurantTableRepository.save(restaurantTable);
            })
            .orElseGet(() -> {
                return null;
            });
    }

    public Page<RestaurantTable> findAll(Pageable pageable) {
        return restaurantTableRepository.findAll(pageable);
    }

    public Optional<RestaurantTable> findById(Long id) {
        return restaurantTableRepository.findById(id);
    }
}
