package com.lunchtime.controllers;

import com.lunchtime.models.RestaurantTable;
import com.lunchtime.service.RestaurantTableService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("/api/tables")
public class RestaurantTableController {

    private final RestaurantTableService restaurantTableService;

    public RestaurantTableController(RestaurantTableService restaurantTableService) {
        this.restaurantTableService = restaurantTableService;
    }

    @PostMapping
    public ResponseEntity<RestaurantTable> createTable(
        @Valid @RequestBody RestaurantTable restaurantTable
    ) throws URISyntaxException {
        if (restaurantTable.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        RestaurantTable result = restaurantTableService.saveTable(restaurantTable);
        if (result == null) {
            return ResponseEntity.badRequest()
                .build();
        }

        return ResponseEntity.created(new URI("/api/tables"))
            .body(result);
    }

    @GetMapping
    public ResponseEntity<Page<RestaurantTable>> getAllTables(Pageable pageable) {
        Page<RestaurantTable> page = restaurantTableService.getAllTables(pageable);
        return ResponseEntity.ok()
            .body(page);
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<Page<RestaurantTable>> getTablesByRestaurantId(
        Pageable pageable, @RequestParam("restaurantId") Long id
    ) {
        Page<RestaurantTable> page = restaurantTableService.getAllTablesByRestaurantId(pageable, id);
        return ResponseEntity.ok()
            .body(page);
    }

    @GetMapping("available")
    public ResponseEntity<List<RestaurantTable>> getTablesByRestaurantIdInTime(
        @RequestParam("id") Long id,
        @RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd H:m") Date start,
        @RequestParam("finish") @DateTimeFormat(pattern = "yyyy-MM-dd H:m") Date finish
    ) {
        List<RestaurantTable> tables = restaurantTableService.getAllAvailableTablesByRestaurantId(id, start, finish);
        return ResponseEntity.ok()
            .body(tables);
    }

    @GetMapping("{id}")
    public ResponseEntity<RestaurantTable> getTableById(@PathVariable Long id) {
        Optional<RestaurantTable> restaurantTable = restaurantTableService.getTableById(id);
        if (restaurantTable.isPresent()) {
            return ResponseEntity.ok()
                .body(restaurantTable.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        RestaurantTable order = restaurantTableService.deleteTable(id);
        if (order == null) {
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
