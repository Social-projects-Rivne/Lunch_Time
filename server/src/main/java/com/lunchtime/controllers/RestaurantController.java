package com.lunchtime.controllers;

import com.lunchtime.models.Restaurant;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.lunchtime.service.RestaurantService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public ResponseEntity<Restaurant> create(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        if (restaurant.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        Restaurant result = restaurantService.save(restaurant);
        if (result == null) {
            return ResponseEntity.badRequest()
                .build();
        }

        return ResponseEntity.created(new URI("/api/restaurants"))
            .body(result);
    }

    @PutMapping
    public ResponseEntity<Restaurant> update(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        if (restaurant.getId() == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        Restaurant result = restaurantService.update(restaurant);
        if (result == null) {
            return ResponseEntity.notFound()
                .build();
        }
        return ResponseEntity.ok()
            .body(result);
    }

    @GetMapping()
    public ResponseEntity<Page<Restaurant>> getAll(Pageable pageable) {
        return ResponseEntity.ok()
            .body(restaurantService.findAll(pageable));
    }

    @GetMapping("{id}")
    //TODO incorrect method name getRestaurant would be better or getRestaurantById as you wish
    public ResponseEntity<Restaurant> getOne(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantService.findById(id);
        // TODO can be replaced with lambda
        if (restaurant.isPresent()) {
            return ResponseEntity.ok()
                .body(restaurant.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.delete(id);
        if (restaurant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
            .build();
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
