package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import com.lunchtime.dto.FeedbackDto;
import com.lunchtime.models.Feedback;
import com.lunchtime.implementation.FeedbackServiceImplement;
import com.lunchtime.models.Restaurant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<FeedbackDto> create(@RequestBody FeedbackDto feedbackDto) throws URISyntaxException {
        FeedbackDto savedFeedbackDto = feedbackServiceimplementation.save(feedbackDto);
        if (savedFeedbackDto == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        return ResponseEntity.created(new URI("/api/restaurants"))
            .body(savedFeedbackDto);
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
