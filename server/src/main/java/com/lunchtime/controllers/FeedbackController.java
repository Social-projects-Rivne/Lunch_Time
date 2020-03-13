package com.lunchtime.controllers;

import java.util.List;
import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/api/feedback/{id}")
    public ResponseEntity<List<Feedback>> getById(@PathVariable("id") Long id) {

        List<Feedback> page = feedbackService.findByRestIdOrderByDateDesc(id);
        return ResponseEntity.ok(page);
    }


}
