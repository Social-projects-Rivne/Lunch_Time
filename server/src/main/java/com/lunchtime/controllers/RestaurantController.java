package com.lunchtime.controllers;

import com.lunchtime.models.Restaurant;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.lunchtime.service.RestaurantService;
import org.springframework.data.domain.Page;
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

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAll(Pageable pageable) {
        Page<Restaurant> page = restaurantService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<Restaurant> getOne(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantService.findById(id);
        if (restaurant.isPresent()) {
            return ResponseEntity.ok()
                .body(restaurant.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> sortBy(Pageable pageable) {
        Page<Restaurant> page = restaurantService.sortBy(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping("/cities/{city}")
    public ResponseEntity<List<Restaurant>> chooseCity(Pageable pageable) {
        Page<Restaurant> page = restaurantService.chooseCity(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> chooseRating(Pageable pageable) {
        Page<Restaurant> page = restaurantService.chooseRating(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> chooseHours(Pageable pageable) {
        Page<Restaurant> page = restaurantService.chooseHours(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> yourPastVisits(Pageable pageable) {
        Page<Restaurant> page = restaurantService.yourPastVisits(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> chooseType(Pageable pageable) {
        Page<Restaurant> page = restaurantService.chooseType(pageable);
        return ResponseEntity.ok().body(page.getContent());
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
