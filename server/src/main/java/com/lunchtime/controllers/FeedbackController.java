package com.lunchtime.controllers;

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
        if (feedbackDto.getId() != null) {
            ResponseEntity.badRequest().build();
        }
        FeedbackDto savedFeedbackDto = feedbackService.saveFeedback(feedbackDto);
        if (savedFeedbackDto != null) {
            return ResponseEntity.created(new URI("/api/feedback"))
                .body(savedFeedbackDto);
        }
        return ResponseEntity.badRequest()
            .build();
    }

    @PostMapping("/like")
    public ResponseEntity<FeedbackDto> likeFeedback(
        @RequestParam("feedbackId") Long feedbackId,
        @RequestParam("personId") Long personId) {
        FeedbackDto feedbackDto = null;
        if (feedbackId != null && personId != null) {
            feedbackDto = feedbackService.likeFeedback(feedbackId, personId);
        }
        return feedbackDto != null
            ? ResponseEntity.created(URI.create("api/feedback/like")).body(feedbackDto)
            : ResponseEntity.badRequest().build();
    }

    @PostMapping("/dislike")
    public ResponseEntity<FeedbackDto> dislikeFeedback(
        @RequestParam("feedbackId") Long feedbackId,
        @RequestParam("personId") Long personId) {
        FeedbackDto feedbackDto = null;
        if (feedbackId != null && personId != null) {
            feedbackDto = feedbackService.dislikeFeedback(feedbackId, personId);
        }
        return feedbackDto != null
            ? ResponseEntity.created(URI.create("api/feedback/dislike")).body(feedbackDto)
            : ResponseEntity.badRequest().build();
    }

    @GetMapping(params = ("restaurantId"))
    public ResponseEntity<List<FeedbackDto>> getAllByRestaurantId(@RequestParam("restaurantId") Long id) {
        List<FeedbackDto> feedbackDtos = feedbackService.getFeedbackListByRestaurantId(id);
        if (feedbackDtos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedbackDtos);
    }
}
