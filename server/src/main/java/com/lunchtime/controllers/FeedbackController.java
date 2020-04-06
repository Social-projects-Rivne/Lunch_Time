package com.lunchtime.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import com.lunchtime.service.dto.FeedbackDto;
import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDto> create(@RequestBody FeedbackDto feedbackDto) throws URISyntaxException {
        if(feedbackDto.getId() != 0) {
            return null;
        }
        FeedbackDto savedFeedbackDto = feedbackService.save(feedbackDto);
        if (savedFeedbackDto == null) {
            return ResponseEntity.badRequest()
                .build();
        }
        return ResponseEntity.created(new URI("/api/restaurants"))
            .body(savedFeedbackDto);
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<Feedback>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {

        List<Feedback> feedback = feedbackService.findByRestId_Id(id);
        if (feedback.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }
}
