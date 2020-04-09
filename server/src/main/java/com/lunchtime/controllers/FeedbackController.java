package com.lunchtime.controllers;

import java.util.List;

import com.lunchtime.models.Feedback;
import com.lunchtime.service.implementation.FeedbackServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackServiceImpl feedbackServiceImpl;

    public FeedbackController(FeedbackServiceImpl feedbackServiceImpl) {
        this.feedbackServiceImpl = feedbackServiceImpl;
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<Feedback>> getFeedbackListByRestaurantId(@RequestParam("restaurantId") Long id) {
        List<Feedback> feedback = feedbackServiceImpl.getFeedbackListByRestaurantId(id);
        if (feedback.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }
}
