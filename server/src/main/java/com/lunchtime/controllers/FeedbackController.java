package com.lunchtime.controllers;

import java.util.List;
import com.lunchtime.models.Feedback;
import com.lunchtime.implementation.FeedbackServiceImplement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackServiceImplement feedbackServiceimplementation;

    public FeedbackController(FeedbackServiceImplement feedbackServiceimplementation) {
        this.feedbackServiceimplementation = feedbackServiceimplementation;
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<Feedback>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {

        List<Feedback> feedback = feedbackServiceimplementation.findByRestId_Id(id);
        if (feedback.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(feedback);

    }


}
