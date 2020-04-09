package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;

import com.lunchtime.service.MenuItemDishService;
import com.lunchtime.service.impl.MenuItemDishServiceImpl;
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

    private final MenuItemDishService menuItemDishService;

    public MenuItemDishController(MenuItemDishService menuItemDishService) {
        this.menuItemDishService = menuItemDishService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDish>> getAll(Pageable pageable) {
        Page<MenuItemDish> page = menuItemDishService.findAll(pageable);
        return ResponseEntity.ok()
            .body(page.getContent());
    }

    @GetMapping("{id}")
    public ResponseEntity<MenuItemDish> getOne(@PathVariable Long id) {
        Optional<MenuItemDish> menuItemDish = menuItemDishService.findById(id);
        if (menuItemDish.isPresent()) {
            return ResponseEntity.ok()
                .body(menuItemDish.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping("/restaurantId")
    public ResponseEntity<List<MenuItemDish>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {
        List<MenuItemDish> menuItemDishList = menuItemDishService.findByRestaurantId(id);
        if (menuItemDishList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(menuItemDishList);
    }

    @PostMapping
    public ResponseEntity<MenuItemDish> newMenuItemDish(@Valid @RequestBody MenuItemDish menuItemDish)
               throws URISyntaxException {
        MenuItemDish newMenuItemDish = menuItemDishService.save(menuItemDish);
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
