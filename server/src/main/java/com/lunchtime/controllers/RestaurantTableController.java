package com.lunchtime.controllers;

import com.lunchtime.models.RestaurantTable;
import com.lunchtime.service.RestaurantTableService;
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
@RequestMapping("/api/tables")
public class RestaurantTableController {

    private final RestaurantTableService restaurantTableService;

    public RestaurantTableController(RestaurantTableService restaurantTableService) {
        this.restaurantTableService = restaurantTableService;
    }

    @PostMapping
    public ResponseEntity<RestaurantTable> createRestaurantTable(
        @Valid @RequestBody RestaurantTable restaurantTable
    ) throws URISyntaxException {
        if (restaurantTable.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        RestaurantTable result = restaurantTableService.save(restaurantTable);
        if (result == null) {
            return ResponseEntity.badRequest()
                .build();
        }

        return ResponseEntity.created(new URI("/api/tables"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<List<RestaurantTable>> getAllRestaurantTables(Pageable pageable) {
        Page<RestaurantTable> page = restaurantTableService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<RestaurantTable>> getRestaurantTablesByRestaurantId(
        Pageable pageable, @RequestParam("restaurantId") Long id
    ) {
        Page<RestaurantTable> page = restaurantTableService.findAllByRestaurantId(pageable, id);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<RestaurantTable> getRestaurantTableById(@PathVariable Long id) {
        Optional<RestaurantTable> restaurantTable = restaurantTableService.findById(id);
        if (restaurantTable.isPresent()) {
            return ResponseEntity.ok()
                .body(restaurantTable.get());
        }
        return ResponseEntity.notFound()
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
