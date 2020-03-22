package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lunchtime.models.CategoryFood;
import com.lunchtime.service.CategoryFoodService;


@RestController
@RequestMapping("/api/category")
public class CategoryFoodController {

    private final CategoryFoodService categoryFoodService;

    public CategoryFoodController(CategoryFoodService categoryFoodService) {
        this.categoryFoodService = categoryFoodService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryFood>> getAll(Pageable pageable) {
        Page<CategoryFood> page = categoryFoodService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryFood> getOne(@PathVariable Long id) {
        Optional<CategoryFood> dish = categoryFoodService.findById(id);
        if (dish.isPresent()) {
            return ResponseEntity.ok()
                .body(dish.get());
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
