package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;

import com.lunchtime.service.CategoryFoodService;
import com.lunchtime.service.impl.CategoryFoodServiceImpl;
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

    private final CategoryFoodService categoryFoodService;

    public CategoryFoodController(CategoryFoodService categoryFoodService) {
        this.categoryFoodService = categoryFoodService;
    }

    @GetMapping
    public ResponseEntity<Page<CategoryFood>> getAll(Pageable pageable) {
        return ResponseEntity.ok()
            .body(categoryFoodService.findAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryFood> getCategory(@PathVariable Long id) {
        Optional<CategoryFood> category = categoryFoodService.findById(id);
        if (category.isPresent()) {
            return ResponseEntity.ok()
                .body(category.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @PostMapping
    public ResponseEntity<CategoryFood> newCategory(@Valid @RequestBody CategoryFood categoryFood)
               throws URISyntaxException {
        CategoryFood newCategory = categoryFoodService.save(categoryFood);
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
