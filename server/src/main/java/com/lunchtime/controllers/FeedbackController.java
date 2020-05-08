package com.lunchtime.controllers;

import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import com.lunchtime.service.dto.FeedbackDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDto> saveFeedback(
        @Valid @RequestBody FeedbackDto feedbackDto) throws URISyntaxException {
        if (feedbackDto.getId() != 0) {
            return ResponseEntity.badRequest().build();
        }
        FeedbackDto savedFeedbackDto = feedbackService.saveFeedback(feedbackDto);
        if (savedFeedbackDto != null) {
            return ResponseEntity.created(new URI("/api/feedback"))
                .body(savedFeedbackDto);
        }
        return ResponseEntity.badRequest()
            .build();
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<Feedback>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {
        List<Feedback> feedback = feedbackService.getFeedbackListByRestaurantId(id);
        if (feedback.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }
}
