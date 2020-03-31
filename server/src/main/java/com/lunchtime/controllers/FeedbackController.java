package com.lunchtime.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import com.lunchtime.models.Feedback;
import com.lunchtime.implementation.FeedbackServiceImplement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

//TODO remove redundant lines

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    //TODO rename variable name to normal CamelCase
    private final FeedbackServiceImplement feedbackServiceimplementation;

    public FeedbackController(FeedbackServiceImplement feedbackServiceimplementation) {
        this.feedbackServiceimplementation = feedbackServiceimplementation;
    }

    @PostMapping
    public ResponseEntity<Feedback> create(@Valid @RequestBody Feedback feedback, HttpServletRequest request) {
        if (feedback.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Feedback> result = Optional.ofNullable(feedbackServiceimplementation.save(feedback));
        return result.map(value -> ResponseEntity
            .created(URI.create("/api/restaurants/:id/feedback"))
            .body(value))
            .orElseGet(() -> ResponseEntity.notFound()
                .build());
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<Feedback>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {

        List<Feedback> feedback = feedbackServiceimplementation.findByRestId_Id(id);
        if (feedback.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }

    //TODO remove redundant lines
}
