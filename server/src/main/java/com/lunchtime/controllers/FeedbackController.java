package com.lunchtime.controllers;

import java.util.List;
import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/restaurants")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("{id}/feedbacks")
    public ResponseEntity<List<Feedback>> getAll(@PathVariable("id") Long id) {

        List<Feedback> page = feedbackService.findByRestIdOrderByDateDesc(id);
        return ResponseEntity.ok(page);
    }


}
