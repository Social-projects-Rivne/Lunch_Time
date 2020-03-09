package com.lunchtime.controllers;

import com.lunchtime.models.Restaurant;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.lunchtime.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RestaurantResource {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody Restaurant restaurant) throws Exception {
        if (restaurant.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Restaurant result = restaurantService.save(restaurant);
        return ResponseEntity.created(new URI("/api/restaurants" + result.getId()))
            .body(result);
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(Pageable pageable) {
        Page<Restaurant> page = restaurantService.findAll(pageable);
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantService.findById(id);
        if (restaurant.isPresent()) {
            return new ResponseEntity<Restaurant>(restaurant.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
