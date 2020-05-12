package com.lunchtime.controllers;

import com.lunchtime.models.EventCategory;
import com.lunchtime.service.EventCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event-category")
public class EventCategoryController {

    private final EventCategoryService eventCategoryService;

    public EventCategoryController(EventCategoryService eventCategoryService) {
        this.eventCategoryService = eventCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<EventCategory>> getAll() {
        return ResponseEntity.ok()
            .body(eventCategoryService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<EventCategory> getCategory(@PathVariable Long id) {
        Optional<EventCategory> category = eventCategoryService.findById(id);
        return category.map(eventCategory -> ResponseEntity.ok().body(eventCategory)).orElseGet(
            () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EventCategory> newCategory(@Valid @RequestBody EventCategory eventCategory)
               throws URISyntaxException {
        EventCategory newCategory = eventCategoryService.save(eventCategory);
        return  ResponseEntity
               .created(new URI("/api/event-category"))
               .body(newCategory);
    }
}
