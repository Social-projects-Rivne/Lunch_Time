package com.lunchtime.controllers;

import com.lunchtime.models.Restaurant;
import com.lunchtime.repository.RestaurantRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestaurantResource {

    private final RestaurantRepository repository;

    RestaurantResource(RestaurantRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) throws Exception {
        if (restaurant.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Restaurant result = repository.save(restaurant);
        return ResponseEntity.created(new URI("/api/restaurants" + result.getId()))
            .body(result);
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(Pageable pageable) {
        Page<Restaurant> page = repository.findAll(pageable);
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable Integer id) {
        Optional<Restaurant> restaurant = repository.findById(id);
        if (restaurant.isPresent()) {
            return new ResponseEntity<Restaurant>(restaurant.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
