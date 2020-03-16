package com.lunchtime.controllers;

import java.util.List;
import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
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
