package com.lunchtime.controllers;

import com.lunchtime.models.Event;
import com.lunchtime.service.EventService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<?> getAll() {
        List<Event> result = eventService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/categories/{category}")
    public ResponseEntity<?> getByCategory(@PathVariable String[] category) {
        List<Event> result = eventService.findByCategory(category);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("date/{date}")
    public ResponseEntity<?> getByDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<Event> result = eventService.findByDay(date);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("dates/from={startDate}&to={endDate}")
    public ResponseEntity<?> getByDateBetween(
        @PathVariable("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Event> result = eventService.findByDateBetween(startDate, endDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("month/{month}")
    public ResponseEntity<?> getByMonth(@PathVariable("month") String month) {
        try {
            List<Event> result = eventService.findByMonth(month);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Event> result = eventService.findById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addEvent(@Valid @RequestBody Event event) {
        eventService.save(event);
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event) {
        Optional<Event> result = eventService.findById(event.getId());
        if (result.isPresent()) {
            eventService.save(event);
            return new ResponseEntity<>(event, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        Optional<Event> result = eventService.deleteById(id);
        if (result.isPresent()) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
