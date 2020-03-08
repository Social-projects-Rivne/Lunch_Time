package com.lunchtime.controllers;

import com.lunchtime.entity.Event;
import com.lunchtime.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Event> result = eventService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{category}")
    public ResponseEntity<?> getByCategory(@PathVariable("category") String category) {
        List<Event> result = eventService.findByCategory(category);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("date/{date}")
    public ResponseEntity<?> getByDate(@PathVariable("date") Date date) {
        List<Event> result = eventService.findByDate(date);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("date/{startDate}/{endDate}")
    public ResponseEntity<?> getByDateBetween(@PathVariable("startDate") Date startDate,
                                              @PathVariable("endDate") Date endDate) {
        List<Event> result = eventService.findByDateBetween(startDate, endDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addOrUpdateEvent(@RequestBody Event event) {
        eventService.saveOrUpdateEvent(event);
        return new ResponseEntity<>("Event added successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteEvent(@RequestParam("id") long id) {
        eventService.deleteEvent(id);
    }
}
