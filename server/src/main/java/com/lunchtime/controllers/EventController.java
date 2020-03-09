package com.lunchtime.controllers;

import com.lunchtime.entity.Event;
import com.lunchtime.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Event> result = eventService.findByActiveTrue();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addEvent(@RequestBody @Valid Event event) {
        eventService.save(event);
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateEvent(@RequestBody @Valid Event event) {
        eventService.save(event);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    
}
