package com.lunchtime.controllers;

import com.lunchtime.models.Dish;
import com.lunchtime.service.DishService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/dish")
public class DishController {

    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping
    public ResponseEntity<List<Dish>> getAll(Pageable pageable) {
        Page<Dish> page = dishService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<Dish> getDish(@PathVariable Long id) {
        Optional<Dish> dish = dishService.findById(id);
        if (dish.isPresent()) {
            return ResponseEntity.ok()
                .body(dish.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @PostMapping
    public ResponseEntity<Dish> newDish(@Valid @RequestBody Dish dish)
               throws URISyntaxException {

        Dish newDish = dishService.save(dish);

        return  ResponseEntity
               .created(new URI("/api/dish"))
               .body(newDish);

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
