package com.lunchtime.controllers;

import com.lunchtime.models.Person;
import com.lunchtime.models.Restaurant;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import com.lunchtime.repository.PersonRepository;
import com.lunchtime.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final PersonRepository personRepository;

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(
        @Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        if (restaurant.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }
        Optional<Person> res = personRepository.findById(restaurant.getPersonId());
        Person person = res.get();
        person.setRoleId((long)2);
        personRepository.save(person);

        Restaurant result = restaurantService.saveRestaurant(restaurant);
        if (result == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        return ResponseEntity.created(new URI("/api/restaurants"))
            .body(result);
    }

    @PutMapping
    public ResponseEntity<Restaurant> updateRestaurant(
        @Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        if (restaurant.getId() == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        Restaurant result = restaurantService.updateRestaurant(restaurant);
        if (result == null) {
            return ResponseEntity.notFound()
                .build();
        }
        return ResponseEntity.ok()
            .body(result);
    }

    @GetMapping()
    public ResponseEntity<Page<Restaurant>> getRestaurantPage(Pageable pageable) {
        return ResponseEntity.ok()
            .body(restaurantService.getRestaurantPage(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantService.getRestaurantById(id);
        return restaurant.map(value -> ResponseEntity.ok()
            .body(value)).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.deleteRestaurantById(id);
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
