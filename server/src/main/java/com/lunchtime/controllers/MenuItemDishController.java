package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.lunchtime.service.impl.MenuItemDishServiceImplement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.lunchtime.models.MenuItemDish;

@RestController
@RequestMapping("/api/menuitemdish")
public class MenuItemDishController {

    private final MenuItemDishServiceImplement menuItemDishServiceImplement;

    public MenuItemDishController(MenuItemDishServiceImplement menuItemDishServiceImplement) {
        this.menuItemDishServiceImplement = menuItemDishServiceImplement;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDish>> getAll(Pageable pageable) {
        Page<MenuItemDish> page = menuItemDishServiceImplement.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<MenuItemDish> getOne(@PathVariable Long id) {
        Optional<MenuItemDish> menuItemDish = menuItemDishServiceImplement.findById(id);
        if (menuItemDish.isPresent()) {
            return ResponseEntity.ok()
                .body(menuItemDish.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping("/restaurantId")
    public ResponseEntity<List<MenuItemDish>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {

        List<MenuItemDish> menuItemDishList = menuItemDishServiceImplement.findByRestaurantId(id);
        if (menuItemDishList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(menuItemDishList);

    }

    @PostMapping
    public ResponseEntity<MenuItemDish> newMenuItemDish(@Valid @RequestBody MenuItemDish menuItemDish)
               throws URISyntaxException {

        MenuItemDish newMenuItemDish = menuItemDishServiceImplement.save(menuItemDish);

        return  ResponseEntity
               .created(new URI("/api/menuitemdish"))
               .body(newMenuItemDish);

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
