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

import com.lunchtime.models.MenuItemDish;
import com.lunchtime.service.MenuItemDishService;

@RestController
@RequestMapping("/api/menuitemdish")
public class MenuItemDishController {

    private final MenuItemDishService menuItemDishService;

    public MenuItemDishController(MenuItemDishService menuItemDishService) {
        this.menuItemDishService = menuItemDishService;
    }
    
    @GetMapping("/all")
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
    
    
    @PostMapping("/add")
    public ResponseEntity<MenuItemDish> newMenuItemDish(@Valid @RequestBody MenuItemDish menuItemDish)
               throws URISyntaxException {
       
        MenuItemDish newMenuItemDish = menuItemDishService.save(menuItemDish);

        return  ResponseEntity
               .created(new URI("/api/menuitemdish/add"))
               .body(newMenuItemDish);

    }
    
    @PutMapping
    public ResponseEntity<MenuItemDish> update(@Valid @RequestBody MenuItemDish menuItemDish)
               throws URISyntaxException {
        if (menuItemDish.getId() == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        MenuItemDish result = menuItemDishService.update(menuItemDish);
        if (result == null) {
            return ResponseEntity.notFound()
                .build();
        }
        return ResponseEntity.ok()
            .body(result);
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        MenuItemDish menuItemDish = menuItemDishService.delete(id);
        if (menuItemDish == null) {
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
