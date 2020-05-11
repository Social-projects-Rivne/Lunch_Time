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
    public ResponseEntity<List<Event>> getEventList() {
        List<Event> result = eventService.getEventList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/categories/{category}")
    public ResponseEntity<List<Event>> getEventListByCategory(@PathVariable String[] category) {
        List<Event> result = eventService.getEventListByCategory(category);
        return ResponseEntity.ok(result);
    }

    @GetMapping("date/{date}")
    public ResponseEntity<List<Event>> getEventListByDay(
        @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<Event> result = eventService.getEventListByDay(date);
        return ResponseEntity.ok(result);
    }

    @GetMapping("dates")
    public ResponseEntity<List<Event>> getEventListByDateBetween(
        @RequestParam("from") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @RequestParam("to") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Event> result = eventService.getEventListByDateBetween(startDate, endDate);
        return ResponseEntity.ok(result);
    }

    @GetMapping("month/{month}")
    public ResponseEntity<List<Event>> getEventListByMonth(@PathVariable("month") String month) {
        try {
            List<Event> result = eventService.getEventListByMonth(month);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> result = eventService.getEventById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound()
            .build());
    }

    @GetMapping("restaurant/{id}")
    public ResponseEntity<List<Event>> getEventByRestaurantId(@PathVariable Long id) {
        List<Event> restaurantEvents = eventService.getEventByRestaurantId(id);
        return restaurantEvents == null
            ? ResponseEntity.badRequest().build()
            : ResponseEntity.ok(restaurantEvents);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
        try {
            eventService.saveEvent(event);
            return ResponseEntity.created(new URI("/api/events")).body(event);
        } catch (IllegalArgumentException | URISyntaxException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<Event> updateEvent(@Valid @RequestBody Event event) {
        Optional<Event> result = eventService.getEventById(event.getId());
        if (result.isPresent()) {
            try {
                eventService.saveEvent(event);
                return ResponseEntity.ok(result.get());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Event> deleteEventById(@PathVariable Long id) {
        Optional<Event> result = eventService.deleteEventById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
