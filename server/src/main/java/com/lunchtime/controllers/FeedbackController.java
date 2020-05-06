package com.lunchtime.controllers;

import com.lunchtime.models.Feedback;
import com.lunchtime.service.FeedbackService;
import com.lunchtime.service.dto.FeedbackDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
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
            return null;
        }
        FeedbackDto savedFeedbackDto = feedbackService.saveFeedback(feedbackDto);
        if (savedFeedbackDto != null) {
            return ResponseEntity.created(new URI("/api/restaurants"))
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
            ? ResponseEntity.ok().body(feedbackDto)
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
