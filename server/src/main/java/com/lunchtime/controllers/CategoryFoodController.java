package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.lunchtime.service.impl.CategoryFoodServiceImplement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.lunchtime.models.CategoryFood;


@RestController
@RequestMapping("/api/category")
public class CategoryFoodController {

    private final CategoryFoodServiceImplement categoryFoodServiceImplement;

    public CategoryFoodController(CategoryFoodServiceImplement categoryFoodServiceImplement) {
        this.categoryFoodServiceImplement = categoryFoodServiceImplement;
    }

    @GetMapping
    public ResponseEntity<List<CategoryFood>> getAll(Pageable pageable) {
        Page<CategoryFood> page = categoryFoodServiceImplement.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryFood> getOne(@PathVariable Long id) {
        Optional<CategoryFood> dish = categoryFoodServiceImplement.findById(id);
        if (dish.isPresent()) {
            return ResponseEntity.ok()
                .body(dish.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping(params = ("dishId"))
    public ResponseEntity<List<CategoryFood>> getAllByDishId(@RequestParam("dishId") Long id) {

        List<CategoryFood> categoryFoodList = categoryFoodServiceImplement.findByDishesId(id);
        if (categoryFoodList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(categoryFoodList);

    }

    @PostMapping
    public ResponseEntity<CategoryFood> newCategory(@Valid @RequestBody CategoryFood categoryFood)
               throws URISyntaxException {

        CategoryFood newCategory = categoryFoodServiceImplement.save(categoryFood);

        return  ResponseEntity
               .created(new URI("/api/category"))
               .body(newCategory);

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
