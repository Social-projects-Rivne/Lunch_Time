package com.lunchtime.controllers;

import com.lunchtime.enums.Category;
import com.lunchtime.enums.Months;
import com.lunchtime.models.Event;
import com.lunchtime.service.EventService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Event> result = eventService.findAll(new Date());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/sort")
    public ResponseEntity<?> getByCategory(@RequestParam(value = "category") String category) {
        try {
            String cat = Category.valueOf(category).toString();
            List<Event> result = eventService.findByCategory(new Date(), cat);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("400", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("date/{date}")
    public ResponseEntity<?> getByDay(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) throws ParseException {
        Date endDate = new Date(date.getTime() + TimeUnit.DAYS.toMillis(1));
        List<Event> result = eventService.findByDate(date, endDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("dates/from={startDate}&to={endDate}")
    public ResponseEntity<?> getByDateBetween(
        @PathVariable("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Event> result = eventService.findByDate(startDate, endDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("month/{month}")
    public ResponseEntity<?> getByMonth(@PathVariable("month") String month) {
        try {
            int month_ordinal = Months.valueOf(month).ordinal();
            int year = Calendar.getInstance().get(Calendar.YEAR);
            Calendar start = new GregorianCalendar(year, month_ordinal, 1);
            Calendar end = new GregorianCalendar(year, ++month_ordinal, 1);
            List<Event> result = eventService.findByDate(new Date(start.getTimeInMillis()),
                new Date(end.getTimeInMillis()));
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("400", HttpStatus.BAD_REQUEST);
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
        return new ResponseEntity<>("400", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        Optional<Event> result = eventService.findById(id);
        if (result.isPresent()) {
            Event event = result.get();
            event.setIsActive(false);
            eventService.save(event);
            return new ResponseEntity<>(event, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("404", HttpStatus.NOT_FOUND);
    }
}
