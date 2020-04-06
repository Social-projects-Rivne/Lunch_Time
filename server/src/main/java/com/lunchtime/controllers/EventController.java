package com.lunchtime.controllers;

import com.lunchtime.models.Event;
import com.lunchtime.service.EventService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAll() {
        List<Event> result = eventService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/categories/{category}")
    public ResponseEntity<List<Event>> getByCategory(@PathVariable String[] category) {
        List<Event> result = eventService.findByCategory(category);
        return ResponseEntity.ok(result);
    }

    @GetMapping("date/{date}")
    public ResponseEntity<List<Event>> getByDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<Event> result = eventService.findByDay(date);
        return ResponseEntity.ok(result);
    }

    @GetMapping("dates")
    public ResponseEntity<List<Event>> getByDateBetween(
        @RequestParam("from") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @RequestParam("to") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Event> result = eventService.findByDateBetween(startDate, endDate);
        return ResponseEntity.ok(result);
    }

    @GetMapping("month/{month}")
    public ResponseEntity<List<Event>> getByMonth(@PathVariable("month") String month) {
        try {
            List<Event> result = eventService.findByMonth(month);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id) {
        Optional<Event> result = eventService.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @PostMapping
    public ResponseEntity<Event> create(@Valid @RequestBody Event event) {
        try {
            eventService.save(event);
            return ResponseEntity.created(new URI("/api/events")).body(event);
        } catch (IllegalArgumentException | URISyntaxException e) {
            return  ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<Event> update(@Valid @RequestBody Event event) {
        Optional<Event> result = eventService.findById(event.getId());
        if (result.isPresent()) {
            try {
                eventService.save(event);
                return ResponseEntity.ok(result.get());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Event> delete(@PathVariable Long id) {
        Optional<Event> result = eventService.deleteById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
