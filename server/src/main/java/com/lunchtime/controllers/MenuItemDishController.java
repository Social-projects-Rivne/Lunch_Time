package com.lunchtime.controllers;

import com.lunchtime.models.MenuItemDish;
import com.lunchtime.service.MenuItemDishService;
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
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/menuitemdish")
public class MenuItemDishController {

    private final MenuItemDishService menuItemDishService;

    public MenuItemDishController(MenuItemDishService menuItemDishService) {
        this.menuItemDishService = menuItemDishService;
    }

    @GetMapping
    public ResponseEntity<Page<MenuItemDish>> getAll(Pageable pageable) {
        return ResponseEntity.ok()
            .body(menuItemDishService.findAll(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<MenuItemDish> getMenuItemDish(@PathVariable Long id) {
        Optional<MenuItemDish> menuItemDish = menuItemDishService.findById(id);
        if (menuItemDish.isPresent()) {
            return ResponseEntity.ok()
                .body(menuItemDish.get());
        }
        return ResponseEntity.notFound()
            .build();
    }

    @GetMapping("/restaurantId")
    public ResponseEntity<Page<MenuItemDish>> getAllByRestaurantId(@RequestParam("restaurantId") Long id,
                                                                   Pageable pageable) {
        Page<MenuItemDish> menuItemDishPage = menuItemDishService.findByRestaurantId(id, pageable);
        if (menuItemDishPage.isEmpty()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(menuItemDishPage);
    }

    @GetMapping("/category")
    public ResponseEntity<Page<MenuItemDish>> getAllByDishCategoryName(
        @RequestParam("name") String name,
        @RequestParam("restaurantId") Long id,
        Pageable pageable) {

        Page<MenuItemDish> menuItemDishPage = menuItemDishService
            .findDishesByRestaurantIdAndCategoryName(name, id, pageable);
        if (menuItemDishPage.isEmpty()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(menuItemDishPage);
    }

    @PostMapping
    public ResponseEntity<MenuItemDish> newMenuItemDish(@Valid @RequestBody MenuItemDish menuItemDish)
               throws URISyntaxException {
        MenuItemDish newMenuItemDish = menuItemDishService.save(menuItemDish);
        return  ResponseEntity
               .created(new URI("/api/menuitemdish"))
               .body(newMenuItemDish);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<MenuItemDish> deleteMenuItemDish(@PathVariable Long id) {
        Optional<MenuItemDish> result = menuItemDishService.deleteById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
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
